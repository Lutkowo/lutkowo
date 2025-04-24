import { defineStore } from 'pinia';
import { useAsyncState, useSessionStorage, useDebounceFn } from '@vueuse/core';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Timestamp,
  QueryDocumentSnapshot
} from 'firebase/firestore';

// Interface dla produktu
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  available: boolean;
  featured: boolean;
  created: Date;
  details?: string;
  attributes?: Record<string, string>;
}

// Interface dla filtrów
interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: 'price'|'name'|'created';
  sortDir?: 'asc'|'desc';
}

export const useProductsStore=defineStore('products', () => {
  // Używamy sessionStorage dla cachowania produktów (ważne w trakcie sesji, ale nie musi być zachowane na stałe)
  const products=useSessionStorage<Product[]>('lutkowo-products', []);
  const categories=useSessionStorage<string[]>('lutkowo-categories', []);
  const loading=ref(false);
  const error=ref<string|null>(null);
  const activeFilters=ref<ProductFilters>({});
  const lastDoc=ref<QueryDocumentSnapshot|null>(null);
  const hasMore=ref(true);

  // Konwersja dokumentu Firestore na obiekt Product
  function convertFirestoreDocToProduct (doc: QueryDocumentSnapshot): Product {
    const data=doc.data();
    return {
      id: doc.id,
      name: data.name||'',
      description: data.description||'',
      price: data.price||0,
      images: data.images||[],
      category: data.category||'',
      available: data.available??true,
      featured: data.featured??false,
      created: data.created instanceof Timestamp? data.created.toDate():new Date(),
      details: data.details||undefined,
      attributes: data.attributes||undefined
    };
  }

  // Pobieranie produktów z Firestore
  const fetchProducts=useDebounceFn(async (refresh=false) => {
    loading.value=true;
    error.value=null;

    try {
      // Jeśli to odświeżenie, resetujemy stan
      if(refresh) {
        products.value=[];
        lastDoc.value=null;
        hasMore.value=true;
      }

      const db=getFirestore();
      let q=query(collection(db, 'products'));

      // Zastosowanie filtrów
      if(activeFilters.value.category) {
        q=query(q, where('category', '==', activeFilters.value.category));
      }

      // Sortowanie
      if(activeFilters.value.sortBy) {
        const sortDirection=activeFilters.value.sortDir==='desc'? 'desc':'asc';
        q=query(q, orderBy(activeFilters.value.sortBy, sortDirection));
      } else {
        q=query(q, orderBy('created', 'desc'));
      }

      // Paginacja
      if(lastDoc.value) {
        q=query(q, startAfter(lastDoc.value));
      }

      // Limit dokumentów
      q=query(q, limit(20));

      const querySnapshot=await getDocs(q);

      // Sprawdzenie czy mamy więcej produktów
      hasMore.value=!querySnapshot.empty;

      if(!querySnapshot.empty) {
        lastDoc.value=querySnapshot.docs[querySnapshot.docs.length-1];

        // Konwersja dokumentów na obiekty Product
        const newProducts=querySnapshot.docs.map(convertFirestoreDocToProduct);

        // Dodanie nowych produktów do stanu
        if(refresh) {
          products.value=newProducts;
        } else {
          products.value=[...products.value, ...newProducts];
        }

        // Pobranie kategorii (tylko jeśli to odświeżenie)
        if(refresh) {
          await fetchCategories();
        }
      }

      // Filtrowanie według ceny można wykonać po pobraniu danych (Firestore ma ograniczenia w filtrach złożonych)
      if(activeFilters.value.minPrice!==undefined||activeFilters.value.maxPrice!==undefined) {
        products.value=products.value.filter(product => {
          if(activeFilters.value.minPrice!==undefined&&product.price<activeFilters.value.minPrice) {
            return false;
          }
          if(activeFilters.value.maxPrice!==undefined&&product.price>activeFilters.value.maxPrice) {
            return false;
          }
          return true;
        });
      }

      // Wyszukiwanie tekstowe również lepiej wykonać po stronie klienta
      if(activeFilters.value.search) {
        const searchText=activeFilters.value.search.toLowerCase();
        products.value=products.value.filter(product =>
          product.name.toLowerCase().includes(searchText)||
          product.description.toLowerCase().includes(searchText)
        );
      }

      return products.value;
    } catch(err: any) {
      error.value=err.message||'Błąd pobierania produktów';
      console.error('Error fetching products:', err);
      return [];
    } finally {
      loading.value=false;
    }
  }, 300); // Debounce 300ms aby zapobiec zbyt częstym zapytaniom przy szybkich zmianach filtrów

  // Pobieranie kategorii z Firestore
  async function fetchCategories () {
    try {
      const db=getFirestore();
      const categoriesSnapshot=await getDocs(collection(db, 'categories'));

      if(!categoriesSnapshot.empty) {
        categories.value=categoriesSnapshot.docs.map(doc => doc.data().name||'');
      }

      return categories.value;
    } catch(err: any) {
      console.error('Error fetching categories:', err);
      return [];
    }
  }

  // Pobranie pojedynczego produktu po ID
  async function fetchProductById (id: string) {
    loading.value=true;
    error.value=null;

    try {
      // Sprawdzamy najpierw cache
      const cachedProduct=products.value.find(p => p.id===id);
      if(cachedProduct) {
        loading.value=false;
        return cachedProduct;
      }

      // Jeśli nie ma w cache, pobieramy z Firestore
      const db=getFirestore();
      const docRef=doc(db, 'products', id);
      const docSnap=await getDoc(docRef);

      if(docSnap.exists()) {
        const productData=convertFirestoreDocToProduct(docSnap as QueryDocumentSnapshot);

        // Dodajemy produkt do lokalnej pamięci podręcznej
        if(!products.value.some(p => p.id===id)) {
          products.value=[...products.value, productData];
        }

        return productData;
      } else {
        throw new Error('Produkt nie został znaleziony');
      }
    } catch(err: any) {
      error.value=err.message||'Błąd pobierania produktu';
      console.error('Error fetching product:', err);
      return null;
    } finally {
      loading.value=false;
    }
  }

  // Filtrowanie produktów (na podstawie activeFilters)
  const filteredProducts=computed(() => {
    if(!products.value.length) return [];

    return products.value.filter(product => {
      // Filtrowanie według kategorii
      if(activeFilters.value.category&&product.category!==activeFilters.value.category) {
        return false;
      }

      // Filtrowanie według ceny minimalnej
      if(activeFilters.value.minPrice!==undefined&&product.price<activeFilters.value.minPrice) {
        return false;
      }

      // Filtrowanie według ceny maksymalnej
      if(activeFilters.value.maxPrice!==undefined&&product.price>activeFilters.value.maxPrice) {
        return false;
      }

      // Filtrowanie według wyszukiwania tekstowego
      if(activeFilters.value.search) {
        const searchText=activeFilters.value.search.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchText)||
          product.description.toLowerCase().includes(searchText)
        );
      }

      return true;
    }).sort((a, b) => {
      // Sortowanie
      if(!activeFilters.value.sortBy) return 0;

      const sortDir=activeFilters.value.sortDir==='desc'? -1:1;

      switch(activeFilters.value.sortBy) {
        case 'price':
          return (a.price-b.price)*sortDir;
        case 'name':
          return a.name.localeCompare(b.name)*sortDir;
        case 'created':
          return (a.created.getTime()-b.created.getTime())*sortDir;
        default:
          return 0;
      }
    });
  });

  // Ustawienie filtrów
  function setFilters (filters: ProductFilters) {
    // Resetujemy stan paginacji gdy zmieniają się filtry
    lastDoc.value=null;
    hasMore.value=true;
    activeFilters.value={ ...activeFilters.value, ...filters };
  }

  // Resetowanie filtrów
  function resetFilters () {
    lastDoc.value=null;
    hasMore.value=true;
    activeFilters.value={};
  }

  // Pobranie wyróżnionych produktów
  async function fetchFeaturedProducts (limit=4) {
    try {
      const db=getFirestore();
      const q=query(
        collection(db, 'products'),
        where('featured', '==', true),
        where('available', '==', true),
        limit(limit)
      );

      const querySnapshot=await getDocs(q);
      return querySnapshot.docs.map(convertFirestoreDocToProduct);
    } catch(err) {
      console.error('Error fetching featured products:', err);
      return [];
    }
  }

  // Getter dla wyróżnionych produktów z cache
  const featuredProducts=computed(() => {
    return products.value.filter(p => p.featured);
  });

  // Pobranie podobnych produktów (tej samej kategorii)
  async function getSimilarProducts (productId: string, limit=4) {
    try {
      const product=await fetchProductById(productId);
      if(!product) return [];

      const db=getFirestore();
      const q=query(
        collection(db, 'products'),
        where('category', '==', product.category),
        where('id', '!=', productId),
        limit(limit)
      );

      const querySnapshot=await getDocs(q);
      return querySnapshot.docs.map(convertFirestoreDocToProduct);
    } catch(err) {
      console.error('Error fetching similar products:', err);

      // Fallback do lokalnych danych
      const product=products.value.find(p => p.id===productId);
      if(!product) return [];

      return products.value
        .filter(p => p.id!==productId&&p.category===product.category)
        .slice(0, limit);
    }
  }

  // Funkcja do pobrania produktów po zmianie kategorii
  function fetchProductsByCategory (category: string) {
    setFilters({ category });
    return fetchProducts(true);
  }

  // Załadowanie kolejnej strony produktów
  function loadMoreProducts () {
    if(hasMore.value&&!loading.value) {
      return fetchProducts();
    }
    return Promise.resolve([]);
  }

  return {
    products,
    categories,
    loading,
    error,
    activeFilters,
    hasMore,
    filteredProducts,
    featuredProducts,
    fetchProducts,
    fetchProductById,
    fetchFeaturedProducts,
    setFilters,
    resetFilters,
    getSimilarProducts,
    fetchProductsByCategory,
    loadMoreProducts
  };
});
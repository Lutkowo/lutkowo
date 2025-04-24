import { ref, computed } from 'vue';
import { collection, getDocs, query, where, orderBy, limit, startAfter, doc, getDoc } from 'firebase/firestore';
import { db } from '~/plugins/firebase.client';
import type { Product } from '~/types/product';

// Referencje do stanu
const products=ref<Product[]>([]);
const selectedProduct=ref<Product|null>(null);
const loading=ref(false);
const error=ref<Error|null>(null);
const lastVisible=ref<any>(null);

export function useProducts () {
  // Pobierz produkty z opcjonalnym limitem i kategorią
  const fetchProducts=async (maxProducts?: number, categoryId?: string, resetPagination: boolean=false): Promise<Product[]> => {
    loading.value=true;
    error.value=null;

    try {
      // Resetuj paginację jeśli trzeba
      if(resetPagination) {
        lastVisible.value=null;
        // Wyczyść listę jeśli to nowe zapytanie
        products.value=[];
      }

      // Utwórz zapytanie do Firestore
      const productsRef=collection(db, 'products');

      // Buduj zapytanie
      let q=query(productsRef, orderBy('createdAt', 'desc'));

      if(categoryId) {
        q=query(q, where('categoryId', '==', categoryId));
      }

      if(maxProducts) {
        q=query(q, limit(maxProducts));
      }

      // Dodaj paginację jeśli to kolejne zapytanie
      if(lastVisible.value&&!resetPagination) {
        q=query(q, startAfter(lastVisible.value));
      }

      const querySnapshot=await getDocs(q);

      // Zapamietaj ostatni dokument dla paginacji
      if(!querySnapshot.empty) {
        lastVisible.value=querySnapshot.docs[querySnapshot.docs.length-1];
      } else {
        lastVisible.value=null;
      }

      // Przetwórz dane
      const fetchedProducts: Product[]=[];
      querySnapshot.forEach((doc) => {
        const data=doc.data() as Omit<Product, 'id'>;
        fetchedProducts.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate()||new Date(),
          updatedAt: data.updatedAt?.toDate()||new Date()
        });
      });

      // Zaktualizuj stan - dodaj do listy jeśli to paginacja, inaczej zastąp
      if(resetPagination) {
        products.value=fetchedProducts;
      } else {
        products.value=[...products.value, ...fetchedProducts];
      }

      return fetchedProducts;
    } catch(err) {
      console.error('Błąd podczas pobierania produktów:', err);
      error.value=err as Error;
      return [];
    } finally {
      loading.value=false;
    }
  };

  // Pobierz kolejne produkty (do paginacji)
  const fetchMoreProducts=async (maxProducts?: number, categoryId?: string): Promise<Product[]> => {
    return fetchProducts(maxProducts, categoryId, false);
  };

  // Pobierz pojedynczy produkt po ID
  const fetchProductById=async (productId: string): Promise<Product|null> => {
    loading.value=true;
    error.value=null;

    try {
      // Pobierz dokument produktu
      const productRef=doc(db, 'products', productId);
      const productSnap=await getDoc(productRef);

      if(productSnap.exists()) {
        const data=productSnap.data() as Omit<Product, 'id'>;
        const fetchedProduct: Product={
          id: productSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate()||new Date(),
          updatedAt: data.updatedAt?.toDate()||new Date()
        };

        // Zaktualizuj stan
        selectedProduct.value=fetchedProduct;
        return fetchedProduct;
      } else {
        selectedProduct.value=null;
        return null;
      }
    } catch(err) {
      console.error('Błąd podczas pobierania produktu:', err);
      error.value=err as Error;
      selectedProduct.value=null;
      return null;
    } finally {
      loading.value=false;
    }
  };

  // Wyszukaj produkty
  const searchProducts=async (searchTerm: string, maxResults: number=10): Promise<Product[]> => {
    loading.value=true;
    error.value=null;

    try {
      // Implementacja wyszukiwania na froncie (w rzeczywistej aplikacji lepiej użyć Algolia, Elastic Search itp.)
      const productsRef=collection(db, 'products');
      const q=query(productsRef, limit(50));  // Pobierz więcej produktów do przeszukania
      const querySnapshot=await getDocs(q);

      const allProducts: Product[]=[];
      querySnapshot.forEach((doc) => {
        const data=doc.data() as Omit<Product, 'id'>;
        allProducts.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate()||new Date(),
          updatedAt: data.updatedAt?.toDate()||new Date()
        });
      });

      // Filtruj produkty po frazie wyszukiwania
      const searchTermLower=searchTerm.toLowerCase();
      const filteredProducts=allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTermLower)||
        product.description.toLowerCase().includes(searchTermLower)||
        product.shortDescription?.toLowerCase().includes(searchTermLower)
      );

      // Ogranicz liczbę wyników
      return filteredProducts.slice(0, maxResults);
    } catch(err) {
      console.error('Błąd podczas wyszukiwania produktów:', err);
      error.value=err as Error;
      return [];
    } finally {
      loading.value=false;
    }
  };

  // Oblicz produkty w promocji
  const featuredProducts=computed(() => {
    return products.value.filter(product => product.featured);
  });

  return {
    products,
    selectedProduct,
    loading,
    error,
    featuredProducts,
    fetchProducts,
    fetchMoreProducts,
    fetchProductById,
    searchProducts
  };
}
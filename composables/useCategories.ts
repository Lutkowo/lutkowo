import { ref, computed } from 'vue';
import { collection, getDocs, query, where, orderBy, limit, startAfter, doc, getDoc } from 'firebase/firestore';
import { db } from '~/plugins/firebase.client';
import type { Category } from '~/types/category';

// Referencje do stanu
const categories=ref<Category[]>([]);
const selectedCategory=ref<Category|null>(null);
const loading=ref(false);
const error=ref<Error|null>(null);
const lastVisible=ref<any>(null);

export function useCategories () {
  // Pobierz wszystkie kategorie
  const fetchCategories=async (): Promise<Category[]> => {
    loading.value=true;
    error.value=null;

    try {
      // Pobierz kategorie z Firestore
      const categoriesRef=collection(db, 'categories');
      const q=query(categoriesRef, orderBy('name'));
      const querySnapshot=await getDocs(q);

      // Przetwórz dane
      const fetchedCategories: Category[]=[];
      querySnapshot.forEach((doc) => {
        const data=doc.data() as Omit<Category, 'id'>;
        fetchedCategories.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate()||new Date(),
          updatedAt: data.updatedAt?.toDate()||new Date()
        });
      });

      // Zaktualizuj stan
      categories.value=fetchedCategories;
      return fetchedCategories;
    } catch(err) {
      console.error('Błąd podczas pobierania kategorii:', err);
      error.value=err as Error;
      return [];
    } finally {
      loading.value=false;
    }
  };

  // Pobierz pojedynczą kategorię po ID
  const fetchCategoryById=async (categoryId: string): Promise<Category|null> => {
    loading.value=true;
    error.value=null;

    try {
      // Pobierz dokument kategorii
      const categoryRef=doc(db, 'categories', categoryId);
      const categorySnap=await getDoc(categoryRef);

      if(categorySnap.exists()) {
        const data=categorySnap.data() as Omit<Category, 'id'>;
        const fetchedCategory: Category={
          id: categorySnap.id,
          ...data,
          createdAt: data.createdAt?.toDate()||new Date(),
          updatedAt: data.updatedAt?.toDate()||new Date()
        };

        // Zaktualizuj stan
        selectedCategory.value=fetchedCategory;
        return fetchedCategory;
      } else {
        selectedCategory.value=null;
        return null;
      }
    } catch(err) {
      console.error('Błąd podczas pobierania kategorii:', err);
      error.value=err as Error;
      selectedCategory.value=null;
      return null;
    } finally {
      loading.value=false;
    }
  };

  // Pobierz kategorię po slug
  const fetchCategoryBySlug=async (slug: string): Promise<Category|null> => {
    loading.value=true;
    error.value=null;

    try {
      // Zapytanie do kolekcji kategorii, filtrując po slug
      const categoriesRef=collection(db, 'categories');
      const q=query(categoriesRef, where('slug', '==', slug));
      const querySnapshot=await getDocs(q);

      if(!querySnapshot.empty) {
        const doc=querySnapshot.docs[0];
        const data=doc.data() as Omit<Category, 'id'>;
        const fetchedCategory: Category={
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate()||new Date(),
          updatedAt: data.updatedAt?.toDate()||new Date()
        };

        // Zaktualizuj stan
        selectedCategory.value=fetchedCategory;
        return fetchedCategory;
      } else {
        selectedCategory.value=null;
        return null;
      }
    } catch(err) {
      console.error('Błąd podczas pobierania kategorii:', err);
      error.value=err as Error;
      selectedCategory.value=null;
      return null;
    } finally {
      loading.value=false;
    }
  };

  // Pobierz główne kategorie (bez rodzica)
  const fetchMainCategories=async (): Promise<Category[]> => {
    loading.value=true;
    error.value=null;

    try {
      // Zapytanie do kolekcji kategorii, filtrując po braku rodzica
      const categoriesRef=collection(db, 'categories');
      const q=query(categoriesRef, where('parentId', '==', null), orderBy('order'));
      const querySnapshot=await getDocs(q);

      // Przetwórz dane
      const fetchedCategories: Category[]=[];
      querySnapshot.forEach((doc) => {
        const data=doc.data() as Omit<Category, 'id'>;
        fetchedCategories.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate()||new Date(),
          updatedAt: data.updatedAt?.toDate()||new Date()
        });
      });

      return fetchedCategories;
    } catch(err) {
      console.error('Błąd podczas pobierania głównych kategorii:', err);
      error.value=err as Error;
      return [];
    } finally {
      loading.value=false;
    }
  };

  // Pobierz podkategorie dla danej kategorii
  const fetchSubcategories=async (parentId: string): Promise<Category[]> => {
    try {
      // Zapytanie do kolekcji kategorii, filtrując po ID rodzica
      const categoriesRef=collection(db, 'categories');
      const q=query(categoriesRef, where('parentId', '==', parentId), orderBy('order'));
      const querySnapshot=await getDocs(q);

      // Przetwórz dane
      const fetchedSubcategories: Category[]=[];
      querySnapshot.forEach((doc) => {
        const data=doc.data() as Omit<Category, 'id'>;
        fetchedSubcategories.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate()||new Date(),
          updatedAt: data.updatedAt?.toDate()||new Date()
        });
      });

      return fetchedSubcategories;
    } catch(err) {
      console.error('Błąd podczas pobierania podkategorii:', err);
      return [];
    }
  };

  // Główne kategorie (obliczane)
  const mainCategories=computed(() => {
    return categories.value.filter(cat => !cat.parentId);
  });

  return {
    categories,
    selectedCategory,
    loading,
    error,
    mainCategories,
    fetchCategories,
    fetchCategoryById,
    fetchCategoryBySlug,
    fetchMainCategories,
    fetchSubcategories
  };
}
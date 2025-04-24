import { collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Category } from '~/types/category';

/**
 * Serwis do zarządzania kategoriami w Firestore
 */
export class CategoryService {
  private db=getFirestore();
  private collectionName='categories';

  /**
   * Pobiera wszystkie kategorie
   * @param activeOnly Czy pobierać tylko aktywne kategorie
   * @returns Lista kategorii
   */
  async getCategories (activeOnly=true): Promise<Category[]> {
    try {
      let q;

      if(activeOnly) {
        q=query(
          collection(this.db, this.collectionName),
          where('isActive', '==', true),
          orderBy('order', 'asc')
        );
      } else {
        q=query(
          collection(this.db, this.collectionName),
          orderBy('order', 'asc')
        );
      }

      const querySnapshot=await getDocs(q);
      const categories: Category[]=[];

      querySnapshot.forEach((doc) => {
        const data=doc.data();
        // Konwersja Firestore Timestamp na JavaScript Date
        const createdAt=data.createdAt?.toDate? data.createdAt.toDate():new Date();
        const updatedAt=data.updatedAt?.toDate? data.updatedAt.toDate():new Date();

        categories.push({
          ...data,
          id: doc.id,
          createdAt,
          updatedAt
        } as Category);
      });

      return categories;
    } catch(error) {
      console.error('Błąd podczas pobierania kategorii:', error);
      throw error;
    }
  }

  /**
   * Pobiera kategorię po ID
   * @param categoryId ID kategorii
   * @returns Kategoria lub null jeśli nie znaleziono
   */
  async getCategoryById (categoryId: string): Promise<Category|null> {
    try {
      const docRef=doc(this.db, this.collectionName, categoryId);
      const docSnap=await getDoc(docRef);

      if(docSnap.exists()) {
        const data=docSnap.data();
        // Konwersja Firestore Timestamp na JavaScript Date
        const createdAt=data.createdAt?.toDate? data.createdAt.toDate():new Date();
        const updatedAt=data.updatedAt?.toDate? data.updatedAt.toDate():new Date();

        return {
          ...data,
          id: docSnap.id,
          createdAt,
          updatedAt
        } as Category;
      } else {
        return null;
      }
    } catch(error) {
      console.error('Błąd podczas pobierania kategorii:', error);
      throw error;
    }
  }

  /**
   * Pobiera kategorię po jej slug (URL-friendly nazwa)
   * @param slug Slug kategorii
   * @returns Kategoria lub null jeśli nie znaleziono
   */
  async getCategoryBySlug (slug: string): Promise<Category|null> {
    try {
      const q=query(
        collection(this.db, this.collectionName),
        where('slug', '==', slug),
        limit(1)
      );

      const querySnapshot=await getDocs(q);

      if(!querySnapshot.empty) {
        const doc=querySnapshot.docs[0];
        const data=doc.data();
        // Konwersja Firestore Timestamp na JavaScript Date
        const createdAt=data.createdAt?.toDate? data.createdAt.toDate():new Date();
        const updatedAt=data.updatedAt?.toDate? data.updatedAt.toDate():new Date();

        return {
          ...data,
          id: doc.id,
          createdAt,
          updatedAt
        } as Category;
      } else {
        return null;
      }
    } catch(error) {
      console.error('Błąd podczas pobierania kategorii przez slug:', error);
      throw error;
    }
  }

  /**
   * Dodaje nową kategorię
   * @param category Dane nowej kategorii
   * @returns ID nowej kategorii
   */
  async addCategory (category: Omit<Category, 'id'>): Promise<string> {
    try {
      const now=new Date();
      const categoryToAdd={
        ...category,
        createdAt: now,
        updatedAt: now,
        isActive: category.isActive??true
      };

      const docRef=await addDoc(collection(this.db, this.collectionName), categoryToAdd);
      return docRef.id;
    } catch(error) {
      console.error('Błąd podczas dodawania kategorii:', error);
      throw error;
    }
  }

  /**
   * Aktualizuje kategorię
   * @param categoryId ID kategorii do aktualizacji
   * @param categoryData Nowe dane kategorii
   */
  async updateCategory (categoryId: string, categoryData: Partial<Category>): Promise<void> {
    try {
      const docRef=doc(this.db, this.collectionName, categoryId);
      const updateData={
        ...categoryData,
        updatedAt: new Date()
      };

      await updateDoc(docRef, updateData);
    } catch(error) {
      console.error('Błąd podczas aktualizacji kategorii:', error);
      throw error;
    }
  }

  /**
   * Usuwa kategorię
   * @param categoryId ID kategorii do usunięcia
   */
  async deleteCategory (categoryId: string): Promise<void> {
    try {
      const docRef=doc(this.db, this.collectionName, categoryId);
      await deleteDoc(docRef);
    } catch(error) {
      console.error('Błąd podczas usuwania kategorii:', error);
      throw error;
    }
  }

  /**
   * Pobiera podkategorie dla danej kategorii
   * @param parentId ID kategorii nadrzędnej
   * @returns Lista podkategorii
   */
  async getSubcategories (parentId: string): Promise<Category[]> {
    try {
      const q=query(
        collection(this.db, this.collectionName),
        where('parentId', '==', parentId),
        where('isActive', '==', true),
        orderBy('order', 'asc')
      );

      const querySnapshot=await getDocs(q);
      const categories: Category[]=[];

      querySnapshot.forEach((doc) => {
        const data=doc.data();
        // Konwersja Firestore Timestamp na JavaScript Date
        const createdAt=data.createdAt?.toDate? data.createdAt.toDate():new Date();
        const updatedAt=data.updatedAt?.toDate? data.updatedAt.toDate():new Date();

        categories.push({
          ...data,
          id: doc.id,
          createdAt,
          updatedAt
        } as Category);
      });

      return categories;
    } catch(error) {
      console.error('Błąd podczas pobierania podkategorii:', error);
      throw error;
    }
  }
}
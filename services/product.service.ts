import { collection, doc, addDoc, updateDoc, deleteDoc, getDoc, getDocs, query, where, orderBy, limit, startAfter, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Product } from '~/types/product';

/**
 * Serwis do zarządzania produktami w Firestore
 */
export class ProductService {
  private db=getFirestore();
  private collectionName='products';

  /**
   * Pobiera wszystkie produkty
   * @param limitCount Limit produktów (domyślnie 20)
   * @param startAfterDoc Dokument, od którego zaczynamy pobieranie (dla paginacji)
   * @param categoryId Opcjonalny filtr po kategorii
   * @returns Lista produktów
   */
  async getProducts (limitCount=20, startAfterDoc?: QueryDocumentSnapshot<DocumentData>, categoryId?: string): Promise<{ products: Product[], lastDoc: QueryDocumentSnapshot<DocumentData>|null; }> {
    try {
      let q;

      if(categoryId) {
        // Filtrowanie po kategorii
        q=query(
          collection(this.db, this.collectionName),
          where('categoryId', '==', categoryId),
          where('isActive', '==', true),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );
      } else {
        // Wszystkie produkty
        q=query(
          collection(this.db, this.collectionName),
          where('isActive', '==', true),
          orderBy('createdAt', 'desc'),
          limit(limitCount)
        );
      }

      // Jeśli mamy dokument startowy dla paginacji
      if(startAfterDoc) {
        q=query(q, startAfter(startAfterDoc));
      }

      const querySnapshot=await getDocs(q);
      const products: Product[]=[];

      querySnapshot.forEach((doc) => {
        const data=doc.data();
        // Konwersja Firestore Timestamp na JavaScript Date
        const createdAt=data.createdAt?.toDate? data.createdAt.toDate():new Date();
        const updatedAt=data.updatedAt?.toDate? data.updatedAt.toDate():new Date();

        products.push({
          ...data,
          id: doc.id,
          createdAt,
          updatedAt
        } as Product);
      });

      // Ostatni dokument do paginacji
      const lastDoc=querySnapshot.docs.length>0? querySnapshot.docs[querySnapshot.docs.length-1]:null;

      return { products, lastDoc };
    } catch(error) {
      console.error('Błąd podczas pobierania produktów:', error);
      throw error;
    }
  }

  /**
   * Pobiera produkt po ID
   * @param productId ID produktu
   * @returns Produkt lub null jeśli nie znaleziono
   */
  async getProductById (productId: string): Promise<Product|null> {
    try {
      const docRef=doc(this.db, this.collectionName, productId);
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
        } as Product;
      } else {
        return null;
      }
    } catch(error) {
      console.error('Błąd podczas pobierania produktu:', error);
      throw error;
    }
  }

  /**
   * Dodaje nowy produkt
   * @param product Dane nowego produktu
   * @returns ID nowego produktu
   */
  async addProduct (product: Omit<Product, 'id'>): Promise<string> {
    try {
      const now=new Date();
      const productToAdd={
        ...product,
        createdAt: now,
        updatedAt: now,
        isActive: product.isActive??true
      };

      const docRef=await addDoc(collection(this.db, this.collectionName), productToAdd);
      return docRef.id;
    } catch(error) {
      console.error('Błąd podczas dodawania produktu:', error);
      throw error;
    }
  }

  /**
   * Aktualizuje produkt
   * @param productId ID produktu do aktualizacji
   * @param productData Nowe dane produktu
   */
  async updateProduct (productId: string, productData: Partial<Product>): Promise<void> {
    try {
      const docRef=doc(this.db, this.collectionName, productId);
      const updateData={
        ...productData,
        updatedAt: new Date()
      };

      await updateDoc(docRef, updateData);
    } catch(error) {
      console.error('Błąd podczas aktualizacji produktu:', error);
      throw error;
    }
  }

  /**
   * Usuwa produkt
   * @param productId ID produktu do usunięcia
   */
  async deleteProduct (productId: string): Promise<void> {
    try {
      const docRef=doc(this.db, this.collectionName, productId);
      await deleteDoc(docRef);
    } catch(error) {
      console.error('Błąd podczas usuwania produktu:', error);
      throw error;
    }
  }

  /**
   * Wyszukuje produkty po nazwie lub tagach
   * @param searchText Tekst do wyszukania
   * @param limitCount Limit wyników
   * @returns Lista pasujących produktów
   */
  async searchProducts (searchText: string, limitCount=10): Promise<Product[]> {
    try {
      // Firebase nie wspiera natywnie wyszukiwania tekstowego pełnotekstowego
      // Używamy prostego wyszukiwania po tagach (dla bardziej zaawansowanego wyszukiwania
      // należałoby użyć Algolia lub innego rozwiązania)
      const q=query(
        collection(this.db, this.collectionName),
        where('tags', 'array-contains', searchText.toLowerCase()),
        where('isActive', '==', true),
        limit(limitCount)
      );

      const querySnapshot=await getDocs(q);
      const products: Product[]=[];

      querySnapshot.forEach((doc) => {
        const data=doc.data();
        // Konwersja Firestore Timestamp na JavaScript Date
        const createdAt=data.createdAt?.toDate? data.createdAt.toDate():new Date();
        const updatedAt=data.updatedAt?.toDate? data.updatedAt.toDate():new Date();

        products.push({
          ...data,
          id: doc.id,
          createdAt,
          updatedAt
        } as Product);
      });

      return products;
    } catch(error) {
      console.error('Błąd podczas wyszukiwania produktów:', error);
      throw error;
    }
  }
}
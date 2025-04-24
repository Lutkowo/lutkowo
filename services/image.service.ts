import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

/**
 * Serwis do zarządzania zdjęciami produktów w Firebase Storage
 */
export class ImageService {
  private storage=getStorage();
  private basePath='products';

  /**
   * Wgrywa zdjęcie do Firebase Storage
   * @param file Plik do wgrania (Blob, File lub Uint8Array)
   * @param path Ścieżka w Storage (opcjonalna, domyślnie 'products/{timestamp}')
   * @returns URL do wgranego zdjęcia
   */
  async uploadImage (file: Blob|Uint8Array|ArrayBuffer, path?: string): Promise<string> {
    try {
      // Jeśli nie podano ścieżki, generuj unikalną na podstawie timestampu
      if(!path) {
        const timestamp=new Date().getTime();
        path=`${this.basePath}/${timestamp}_${Math.random().toString(36).substring(2, 15)}.jpg`;
      }

      // Referencja do lokalizacji w Storage
      const storageRef=ref(this.storage, path);

      // Wgraj plik
      const snapshot=await uploadBytes(storageRef, file);

      // Pobierz i zwróć URL do pliku
      const downloadURL=await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch(error) {
      console.error('Błąd podczas wgrywania zdjęcia:', error);
      throw error;
    }
  }

  /**
   * Usuwa zdjęcie z Firebase Storage
   * @param url URL zdjęcia do usunięcia
   */
  async deleteImage (url: string): Promise<void> {
    try {
      // Pobierz referencję do pliku na podstawie URL
      const fileRef=ref(this.storage, this.getPathFromURL(url));

      // Usuń plik
      await deleteObject(fileRef);
    } catch(error) {
      console.error('Błąd podczas usuwania zdjęcia:', error);
      throw error;
    }
  }

  /**
   * Wgrywa wiele zdjęć jednocześnie
   * @param files Tablica plików do wgrania
   * @param productId ID produktu (opcjonalne, do organizacji plików)
   * @returns Tablica URL-i do wgranych zdjęć
   */
  async uploadMultipleImages (files: (Blob|Uint8Array|ArrayBuffer)[], productId?: string): Promise<string[]> {
    try {
      const uploadPromises=files.map((file, index) => {
        let path;
        if(productId) {
          // Jeśli mamy ID produktu, użyj go w ścieżce
          path=`${this.basePath}/${productId}/${Date.now()}_${index}.jpg`;
        }
        return this.uploadImage(file, path);
      });

      return Promise.all(uploadPromises);
    } catch(error) {
      console.error('Błąd podczas wgrywania wielu zdjęć:', error);
      throw error;
    }
  }

  /**
   * Konwertuje URL Firebase Storage na ścieżkę
   * @param url URL Firebase Storage
   * @returns Ścieżka w Firebase Storage
   * @private
   */
  private getPathFromURL (url: string): string {
    // Przykład URL: https://firebasestorage.googleapis.com/v0/b/bucket-name/o/path%2Fto%2Ffile.jpg?alt=media&token=abc123
    try {
      const decodedUrl=decodeURIComponent(url);
      const path=decodedUrl.split('/o/')[1].split('?')[0];
      return path;
    } catch(error) {
      console.error('Błąd podczas parsowania URL:', error);
      throw new Error('Nieprawidłowy URL Firebase Storage');
    }
  }
}
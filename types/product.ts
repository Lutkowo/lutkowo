/**
 * Interfejs opisujący model produktu w sklepie Lutkowo
 */
export interface Product {
  id: string;               // Unikalny identyfikator produktu
  name: string;             // Nazwa produktu
  description: string;      // Szczegółowy opis produktu
  shortDescription: string; // Krótki opis produktu (do wyświetlania na listingach)
  price: number;            // Cena produktu
  currency: string;         // Waluta (domyślnie PLN)
  categoryId: string;       // Identyfikator kategorii
  images: string[];         // Lista URL-i do zdjęć produktu
  thumbnailUrl: string;     // URL do miniatury produktu
  availableQuantity: number;// Dostępna ilość produktu
  metadata: {               // Dodatkowe metadane produktu
    weight?: number;        // Waga produktu (w gramach)
    dimensions?: {          // Wymiary produktu
      width: number;        // Szerokość (w cm)
      height: number;       // Wysokość (w cm)
      depth: number;        // Głębokość (w cm)
    },
    materials?: string[];   // Lista materiałów
    handmade: boolean;      // Czy produkt jest ręcznie wykonany
    customizable?: boolean; // Czy produkt można dostosować
  };
  tags: string[];           // Tagi produktu (do wyszukiwania)
  isActive: boolean;        // Czy produkt jest aktywny/widoczny w sklepie
  createdAt: Date;          // Data utworzenia produktu
  updatedAt: Date;          // Data ostatniej aktualizacji produktu
}
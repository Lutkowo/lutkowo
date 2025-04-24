/**
 * Interfejs opisujący kategorię produktów
 */
export interface Category {
  id: string;               // Unikalny identyfikator kategorii
  name: string;             // Nazwa kategorii
  description: string;      // Opis kategorii
  slug: string;             // URL-friendly nazwa kategorii (np. "ceramika-recznie-malowana")
  imageUrl?: string;        // URL do obrazka kategorii (opcjonalny)
  parentId?: string;        // ID kategorii nadrzędnej (dla podkategorii, opcjonalne)
  order: number;            // Kolejność wyświetlania (do sortowania)
  isActive: boolean;        // Czy kategoria jest aktywna/widoczna
  createdAt: Date;          // Data utworzenia
  updatedAt: Date;          // Data ostatniej aktualizacji
}
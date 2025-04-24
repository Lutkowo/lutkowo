/**
 * Interfejs opisujący użytkownika w systemie
 */
export interface User {
  uid: string;              // UID użytkownika z Firebase Authentication
  email: string;            // Adres email
  displayName?: string;     // Imię i nazwisko użytkownika
  photoURL?: string;        // URL do zdjęcia profilowego
  phoneNumber?: string;     // Numer telefonu
  isAdmin: boolean;         // Czy użytkownik jest administratorem
  addresses?: Address[];    // Lista adresów użytkownika
  createdAt: Date;          // Data utworzenia konta
  lastLoginAt?: Date;       // Data ostatniego logowania
  metadata?: {              // Dodatkowe metadane użytkownika
    newsletter: boolean;    // Czy użytkownik zapisał się do newslettera
    marketing: boolean;     // Czy użytkownik wyraził zgodę na marketing
  };
}

/**
 * Interfejs opisujący adres (dostawy/rozliczeniowy)
 */
export interface Address {
  id: string;               // Unikalny identyfikator adresu
  type: 'shipping'|'billing'; // Typ adresu
  isDefault: boolean;       // Czy jest domyślnym adresem
  firstName: string;        // Imię
  lastName: string;         // Nazwisko
  company?: string;         // Nazwa firmy (opcjonalnie)
  streetAddress: string;    // Ulica i numer
  apartment?: string;       // Numer mieszkania/lokalu (opcjonalnie)
  city: string;             // Miasto
  postalCode: string;       // Kod pocztowy
  country: string;          // Kraj
  phone?: string;           // Telefon kontaktowy
  email?: string;           // Email kontaktowy
}
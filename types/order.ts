/**
 * Interfejs opisujący zamówienie w sklepie
 */
export interface Order {
  id: string;                 // Unikalny identyfikator zamówienia
  userId: string;             // ID użytkownika składającego zamówienie
  items: OrderItem[];         // Lista produktów w zamówieniu
  status: OrderStatus;        // Status zamówienia
  shippingAddress: Address;   // Adres dostawy
  billingAddress: Address;    // Adres rozliczeniowy
  shippingMethod: ShippingMethod; // Metoda dostawy
  paymentMethod: PaymentMethod;   // Metoda płatności
  paymentStatus: PaymentStatus;   // Status płatności

  // Podsumowanie finansowe
  subtotal: number;           // Suma cen produktów bez dostawy
  shippingCost: number;       // Koszt dostawy
  tax: number;                // Podatek
  discount?: number;          // Zniżka (opcjonalna)
  total: number;              // Całkowita wartość zamówienia

  // Dodatkowe informacje
  notes?: string;             // Notatki klienta do zamówienia
  giftMessage?: string;       // Wiadomość prezentowa (opcjonalna)

  // Daty
  createdAt: Date;            // Data utworzenia zamówienia
  updatedAt: Date;            // Data ostatniej aktualizacji
  paidAt?: Date;              // Data zapłaty
  shippedAt?: Date;           // Data wysyłki
  deliveredAt?: Date;         // Data dostarczenia

  // Śledzenie przesyłki
  trackingNumber?: string;    // Numer śledzenia przesyłki
  trackingUrl?: string;       // Link do śledzenia przesyłki
}

/**
 * Interfejs opisujący pojedynczy produkt w zamówieniu
 */
export interface OrderItem {
  productId: string;          // ID produktu
  name: string;               // Nazwa produktu (w momencie zamówienia)
  price: number;              // Cena jednostkowa produktu
  quantity: number;           // Ilość
  thumbnailUrl?: string;      // URL do miniatury produktu
  options?: {                 // Opcje produktu wybrane przez klienta
    [key: string]: string|number|boolean;
  };
  total: number;              // Suma (price * quantity)
}

/**
 * Możliwe statusy zamówienia
 */
export enum OrderStatus {
  PENDING='pending',           // Oczekujące na płatność
  PROCESSING='processing',     // Przetwarzane
  SHIPPED='shipped',           // Wysłane
  DELIVERED='delivered',       // Dostarczone
  COMPLETED='completed',       // Zakończone
  CANCELLED='cancelled',       // Anulowane
  REFUNDED='refunded'          // Zwrócone
}

/**
 * Możliwe metody dostawy
 */
export enum ShippingMethod {
  STANDARD='standard',        // Standardowa dostawa
  EXPRESS='express',          // Ekspresowa dostawa
  PICKUP='pickup'             // Odbiór osobisty
}

/**
 * Możliwe metody płatności
 */
export enum PaymentMethod {
  CREDIT_CARD='credit_card',  // Karta kredytowa
  BANK_TRANSFER='bank_transfer', // Przelew bankowy
  PAYPAL='paypal',            // PayPal
  STRIPE='stripe',            // Stripe
  CASH_ON_DELIVERY='cash_on_delivery' // Płatność przy odbiorze
}

/**
 * Możliwe statusy płatności
 */
export enum PaymentStatus {
  PENDING='pending',          // Oczekująca
  PAID='paid',                // Opłacona
  FAILED='failed',            // Nieudana
  REFUNDED='refunded'         // Zwrócona
}

// Importujemy typ Address
import { Address } from './user';
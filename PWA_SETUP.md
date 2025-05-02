# Lutkowo - Product Requirements Document

## Overview

Lutkowo to sklep internetowy specjalizujący się w sprzedaży ręcznie wykonanych produktów (ceramika, szkło, glina oraz makramy). Platforma umożliwia przeglądanie i filtrowanie unikalnych, rękodzielniczych produktów, zapewniając responsywny interfejs dostosowany zarówno do urządzeń stacjonarnych, jak i mobilnych. Projekt implementuje funkcję przeglądania produktów, z naciskiem na wielojęzyczność i dostępność.

## Problem Statement

Rynek rękodzieła w Polsce potrzebuje nowoczesnej platformy prezentacyjnej, która:

- Umożliwi eksponowanie detali i unikalności ręcznie wykonanych produktów
- Zapewni intuicyjną nawigację i wyszukiwanie według kategorii
- Będzie dostępna zarówno dla polsko jak i anglojęzycznych klientów
- Zapewni optymalne wyświetlanie na wszystkich typach urządzeń
- Zapewni dobrą widoczność w wyszukiwarkach poprzez optymalizację SEO

## Goals

- Stworzenie responsywnej, dwujęzycznej platformy prezentacyjnej
- Implementacja szczegółowych widoków produktów z galeriami zdjęć
- Wdrożenie systemu kategorii i filtrów dla łatwego wyszukiwania
- Integracja z Firebase do przechowywania danych i autoryzacji
- Implementacja PWA dla lepszego doświadczenia na urządzeniach mobilnych
- Wykorzystanie darmowej wersji komponentów Nuxt UI
- Przygotowanie architektury pod przyszłą integrację z systemem płatności Stripe

## Non-Goals

- Nie implementujemy systemu koszyka i płatności w pierwszej fazie (integracja ze Stripe planowana w przyszłości)
- Nie wdrażamy zaawansowanej analityki
- Nie tworzymy systemu programu lojalnościowego
- Nie integrujemy z zewnętrznymi platformami e-commerce
- Nie implementujemy zaawansowanych funkcji rekomendacji produktów
- Nie tworzymy natywnych aplikacji mobilnych (zamiast tego PWA)
- Nie wdrażamy systemu ERP do zarządzania magazynem i logistyką

## Technical Stack

### Frontend

- **Framework**: Vue.js 3.5+ z Nuxt.js 3.16+
- **Package Manager**: Bun
- **Zarządzanie stanem**: Pinia (domyślny system zarządzania stanem dla Nuxt 3)
- **UI Framework**: @nuxt/ui 3.0+ (wersja darmowa)
- **Typescript**: Dla statycznego typowania
- **Wielojęzyczność**: i18n (polski i angielski)
- **Routing**: Vue Router 4.5+
- **Image Management**: @nuxt/image 1.10.0+ (optymalizacja obrazów produktów)

### Backend

- **Firebase**: Firestore (baza danych)
- **Firebase Authentication**: System logowania i rejestracji
- **Firebase Storage**: Przechowywanie zdjęć produktów
- **Firebase Functions**: Do obsługi formularza kontaktowego

### Infrastruktura

- **Hosting**: Firebase Hosting
- **PWA**: Wsparcie dla Progressive Web App
  - Add to Home Screen (A2HS)
  - Powiadomienia push
  - Podstawowe wsparcie online (bez zaawansowanych funkcji offline)
- **CI/CD**: GitHub Actions
- **ESLint**: Linting kodu w wersji 9.0+

## Functional Requirements

### 1. Produkty i Kategorie

- Przeglądanie produktów z podziałem na kategorie (ceramika, szkło, glina oraz makramy)
- Filtrowanie produktów według ceny i kategorii
- Sortowanie produktów według ceny, daty i nazwy
- Szczegółowe strony produktów z galeriami zdjęć, opisami i parametrami
- Wyświetlanie powiązanych/podobnych produktów

### 2. Użytkownik i Konto

- Rejestracja i logowanie użytkowników przez Firebase Authentication
- Zarządzanie profilem użytkownika
- Obsługa zapomnianych haseł

### 3. Panel Administracyjny

- Zarządzanie produktami (dodawanie, edycja, usuwanie)
- Upload i zarządzanie zdjęciami produktów
- Zarządzanie kategoriami
- Podgląd podstawowych statystyk

### 4. Strona i Interfejs

- Responsywny design (mobile-first)
- Wielojęzyczność (polski i angielski)
- Dostępność (accessibility)
- Optymalizacja SEO
- Wsparcie dla PWA z opcją instalacji na ekranie głównym
- Szybkie ładowanie strony i optymalizacja obrazów z @nuxt/image

### 5. Inne Funkcjonalności

- Formularz kontaktowy z obsługą przez Firebase Functions
- Strona "O nas" z informacjami o sklepie
- Polityka prywatności i regulamin

## Timeline i Milestones

### Milestone 1: Strona Startowa (✅ Zrealizowane)

- Implementacja podstawowego layoutu strony głównej
- Stworzenie podstawowej struktury projektu w Nuxt.js
- Konfiguracja podstawowych ustawień PWA
- Podstawowa konfiguracja i18n (polski i angielski)
- Wdrożenie podstawowej wersji SEO
- Pierwsza wersja responsywnego designu
- Implementacja komponentu PWAInstallPrompt
- Konfiguracja Firebase i zasobów niezbędnych do przyszłej integracji

### Milestone 2: Katalog Produktów (przyszłe rozszerzenie)

- Implementacja systemu kategorii produktów
- Wyświetlanie listy produktów
- Filtrowanie i sortowanie produktów
- Integracja z Firebase dla przechowywania danych o produktach

### Milestone 3: Szczegółowe Strony Produktów (przyszłe rozszerzenie)

- Strony szczegółowe produktów z galeriami zdjęć
- System wyświetlania podobnych/powiązanych produktów
- Integracja z @nuxt/image dla optymalizacji obrazów
- Rozbudowa funkcji SEO specyficznych dla produktów

### Milestone 4: Panel Administratora (przyszłe rozszerzenie)

- System logowania dla administratora
- Zarządzanie produktami (dodawanie, edycja, usuwanie)
- Zarządzanie kategoriami
- Upload i zarządzanie zdjęciami produktów

### Milestone 5: Funkcje Użytkownika (przyszłe rozszerzenie)

- Rejestracja i logowanie użytkowników
- Zarządzanie profilem użytkownika
- System zapomnianych haseł

### Milestone 6: System Zamówień i Płatności (przyszłe rozszerzenie)

- Integracja ze Stripe dla płatności online
- Implementacja koszyka zakupowego
- System potwierdzania i śledzenia zamówień

### Milestone 7: Rozszerzone Funkcje UI/UX (przyszłe rozszerzenie)

- Implementacja trybu ciemnego (Dark Mode) z możliwością przełączania
- Rozszerzenie opcji dostępności (a11y)
- Zaawansowane animacje i przejścia między stronami
- Dodatkowe ulepszenia UX oparte na feedbacku użytkowników

## ToDo - Kwestie do zweryfikowania w przyszłości

### Ikony PWA

- Zastąpić placeholdery ikon PWA w folderze `public/icons` prawdziwymi plikami graficznymi:
  - icon-72x72.txt → icon-72x72.png
  - icon-192x192.txt → icon-192x192.png
  - icon-512x512.txt → icon-512x512.png
  - maskable-icon.txt → maskable-icon.png (z uwzględnieniem specyfikacji "maskable")
  - apple-touch-icon.txt → apple-touch-icon.png (180x180 px)
- Zweryfikować zgodność ikon z identyfikacją wizualną marki
- Zoptymalizować ikony pod kątem rozmiaru plików i jakości obrazu

### Obrazy produktów

- Zastąpić placeholdery obrazów w folderze `public/images` prawdziwymi zdjęciami produktów
- Zoptymalizować obrazy pod kątem wydajności ładowania (formaty WEBP, różne rozmiary)
- Zaimplementować lazy loading dla obrazów za pomocą Nuxt Image
- Rozważyć użycie CDN dla obrazów w przypadku większej liczby produktów

### Integracja Firebase

- Zaimplementować inicjalizację Firebase w middleware Nuxt
- Skonfigurować reguły bezpieczeństwa Firestore
- Skonfigurować reguły Storage dla przechowywania zdjęć produktów
- Utworzyć strukturę kolekcji w Firestore dla produktów, kategorii i użytkowników
- Zaimplementować funkcje Firebase dla formularza kontaktowego

## User Flow

### Faza Początkowa (Milestone 1)

1. **Odwiedzający strony startowej**:
   - Zapoznaje się z podstawowymi informacjami o Lutkowo
   - Przełącza między wersjami językowymi (PL/EN)
   - Może zobaczyć przykładowe zdjęcia produktów (bez funkcji sklepu)
   - Może przeczytać podstawowe informacje "O nas"
   - Może zapisać się do newslettera (formularz nie jest jeszcze podpięty do backendu)

### Przyszłe Fazy (Milestone 2-6)

1. **Odwiedzający**:

   - Przegląda produkty
   - Filtruje i sortuje według preferencji
   - Przegląda szczegóły produktów
   - Składa zamówienia (po implementacji Milestone 6)

2. **Rejestracja/Logowanie** (po implementacji Milestone 5):

   - Użytkownik może się zarejestrować lub zalogować przez Firebase Authentication
   - Zarządzanie profilem i historią zamówień

3. **Panel Administratora** (po implementacji Milestone 4):
   - Logowanie do panelu admin
   - Zarządzanie produktami i kategoriami
   - Przegląd statystyk
   - Zarządzanie zamówieniami (po implementacji Milestone 6)

## Nowe wnioski i spostrzeżenia z procesu implementacji

### Optymalizacja wielojęzyczności (i18n)

- Organizacja kluczy tłumaczeń według sekcji strony zwiększa czytelność i łatwość utrzymania
- Warto rozważyć dynamiczne ładowanie plików tłumaczeń dla większych aplikacji
- Zapisywanie preferencji językowych w localStorage zapewnia spójne doświadczenie między sesjami
- Warto rozważyć automatyczne wykrywanie języka przeglądarki przy pierwszej wizycie

### Komponenty Nuxt UI

- Biblioteka Nuxt UI dostarcza bogaty zestaw komponentów, które przyspieszają rozwój
- Warto dostosować style komponentów do identyfikacji wizualnej marki
- Dla zaawansowanych przypadków użycia, może być konieczne rozszerzenie lub nadpisanie funkcjonalności

### Optymalizacja SEO

- Dynamiczne generowanie metatagów na podstawie treści strony
- Wdrożenie strukturalnych danych Schema.org dla lepszej widoczności w wynikach wyszukiwania
- Konfiguracja sitemap.xml z dynamicznym generowaniem dla nowych produktów
- Implementacja strategii linkowania wewnętrznego między powiązanymi produktami

### Testowanie na różnych urządzeniach

- Warto rozważyć użycie narzędzi do testowania responsywności (np. Responsively App)
- Testowanie na prawdziwych urządzeniach daje lepsze wyniki niż symulatory
- Warto uwzględnić różne prędkości połączeń internetowych (szczególnie dla obrazów)
- Testowanie instalacji PWA na różnych systemach operacyjnych (iOS, Android)

### Wydajność aplikacji

- Rozważyć implementację strategii "code splitting" dla większych modułów
- Optymalizacja First Contentful Paint (FCP) i Time to Interactive (TTI)
- Implementacja pamięci podręcznej dla danych pobieranych z Firebase
- Monitorowanie wydajności za pomocą Lighthouse i WebPageTest

# Lutkowo - Product Requirements Document

## Overview

Lutkowo to sklep internetowy specjalizujący się w sprzedaży ręcznie wykonanych produktów (ceramika, szkło, makramy, tekstylia i drewno). Platforma umożliwia przeglądanie, filtrowanie i zakup unikalnych, rękodzielniczych produktów, zapewniając responsywny interfejs dostosowany zarówno do urządzeń stacjonarnych, jak i mobilnych. Projekt implementuje pełen cykl zakupowy, od przeglądania produktów po płatności, z naciskiem na wielojęzyczność i dostępność.

## Problem Statement

Rynek rękodzieła w Polsce potrzebuje nowoczesnej platformy sprzedażowej, która:

- Umożliwi eksponowanie detali i unikalności ręcznie wykonanych produktów
- Zapewni intuicyjną nawigację i wyszukiwanie według kategorii
- Będzie dostępna zarówno dla polsko jak i anglojęzycznych klientów
- Zagwarantuje bezpieczne płatności i łatwy proces zakupowy
- Dostarczy dedykowany panel administracyjny do zarządzania produktami
- Zapewni optymalne wyświetlanie na wszystkich typach urządzeń

## Goals

- Stworzenie responsywnej, dwujęzycznej platformy sprzedażowej
- Implementacja szczegółowych widoków produktów z galeriami zdjęć
- Wdrożenie systemu kategorii i filtrów dla łatwego wyszukiwania
- Integracja z Firebase do przechowywania danych i autoryzacji
- Implementacja funkcjonalności koszyka zakupowego i procesu zamówienia
- Integracja z systemem płatności Stripe
- Wdrożenie panelu administracyjnego do zarządzania produktami
- Implementacja PWA dla lepszego doświadczenia na urządzeniach mobilnych

## Non-Goals

- Nie wdrażamy zaawansowanej analityki sprzedażowej
- Nie tworzymy systemu programu lojalnościowego
- Nie integrujemy z zewnętrznymi platformami e-commerce
- Nie implementujemy zaawansowanych funkcji rekomendacji produktów
- Nie tworzymy natywnych aplikacji mobilnych (zamiast tego PWA)
- Nie wdrażamy systemu ERP do zarządzania magazynem i logistyką

## Technical Stack

### Frontend

- **Framework**: Vue.js 3.5+ z Nuxt.js 3.16+
- **Zarządzanie stanem**: Pinia (domyślny system zarządzania stanem dla Nuxt 3)
- **UI Framework**: @nuxt/ui 3.0+
- **Typescript**: Dla statycznego typowania
- **Wielojęzyczność**: i18n (polski i angielski)
- **Routing**: Vue Router 4.5+

### Backend

- **Firebase**: Firestore (baza danych)
- **Firebase Authentication**: System logowania i rejestracji
- **Firebase Storage**: Przechowywanie zdjęć produktów
- **Firebase Functions**: Do obsługi formularza kontaktowego

### Płatności

- **Stripe**: Do obsługi płatności online

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

- Przeglądanie produktów z podziałem na kategorie (ceramika, szkło, makramy, tekstylia, drewno)
- Filtrowanie produktów według ceny i kategorii
- Sortowanie produktów według ceny, daty i nazwy
- Szczegółowe strony produktów z galeriami zdjęć, opisami i parametrami
- Wyświetlanie powiązanych/podobnych produktów

### 2. Koszyk i Zakupy

- Dodawanie produktów do koszyka
- Modyfikacja ilości produktów w koszyku
- Usuwanie produktów z koszyka
- Przechowywanie stanu koszyka między sesjami (localStorage)
- Pełen proces checkout z podsumowaniem zamówienia
- Integracja płatności Stripe

### 3. Użytkownik i Konto

- Rejestracja i logowanie użytkowników przez Firebase Authentication
- Zarządzanie profilem użytkownika
- Historia zamówień
- Zapisywanie adresów dostawy
- Obsługa zapomnianych haseł

### 4. Panel Administracyjny

- Zarządzanie produktami (dodawanie, edycja, usuwanie)
- Upload i zarządzanie zdjęciami produktów
- Zarządzanie kategoriami
- Przeglądanie i zarządzanie zamówieniami
- Podgląd podstawowych statystyk sprzedaży

### 5. Strona i Interfejs

- Responsywny design (mobile-first)
- Wielojęzyczność (polski i angielski)
- Dostępność (accessibility)
- Optymalizacja SEO
- Wsparcie dla PWA z opcją instalacji na ekranie głównym
- Szybkie ładowanie strony i optymalizacja obrazów z @nuxt/image

### 6. Inne Funkcjonalności

- Formularz kontaktowy z obsługą przez Firebase Functions
- Strona "O nas" z informacjami o sklepie
- Polityka prywatności i regulamin

## User Flow

1. **Odwiedzający**:

   - Przegląda produkty
   - Filtruje i sortuje według preferencji
   - Przegląda szczegóły produktów
   - Dodaje produkty do koszyka
   - Przechodzi do procesu zakupowego

2. **Rejestracja/Logowanie**:

   - Użytkownik może się zarejestrować lub zalogować przez Firebase Authentication
   - Opcjonalne dla zakończenia zakupu

3. **Proces zakupowy**:

   - Przegląd koszyka
   - Wprowadzenie danych dostawy
   - Wybór metody płatności
   - Potwierdzenie zamówienia
   - Płatność przez Stripe
   - Potwierdzenie zakupu

4. **Panel Administratora**:
   - Logowanie do panelu admin
   - Zarządzanie produktami i kategoriami
   - Zarządzanie zamówieniami
   - Przegląd statystyk

## Technical Requirements

### 1. Performance

- Czas ładowania pierwszej strony poniżej 2s
- Wykorzystanie lazy loading dla obrazów
- Implementacja code-splitting dla optymalizacji rozmiaru paczki
- Optymalizacja obrazów produktów z @nuxt/image

### 2. Security

- Bezpieczna autoryzacja z Firebase Authentication
- Reguły bezpieczeństwa Firestore i Storage
- Bezpieczne przetwarzanie płatności przez Stripe
- Implementacja CSRF protection
- Prawidłowa walidacja inputów

### 3. Scalability

- Strukturyzacja kodu dla łatwego rozszerzania
- Modularna architektura z możliwością dodawania funkcji
- Efektywne wykorzystanie Firebase dla skalowania bazy danych

### 4. Maintenance

- Spójne nazewnictwo i style kodowania
- Organizacja kodu zgodna z najlepszymi praktykami Nuxt.js
- CI/CD do automatyzacji testów i wdrożeń
- Konfiguracja ESLint dla utrzymania jakości kodu

### 5. Compatibility

- Wsparcie dla najnowszych wersji przeglądarek (Chrome, Firefox, Safari, Edge)
- Responsywny design dla różnych rozmiarów ekranów
- Wsparcie PWA dla instalacji na ekranie głównym (A2HS)

## Project Structure

```
lutkowo/
├── components/           # Komponenty Vue
│   ├── AppHeader.vue     # Header strony
│   └── AppFooter.vue     # Footer strony
├── layouts/              # Layouty aplikacji
│   └── default.vue       # Domyślny layout
├── locales/              # Pliki tłumaczeń
│   ├── en.json           # Angielskie tłumaczenia
│   └── pl.json           # Polskie tłumaczenia
├── pages/                # Strony aplikacji (routing)
│   ├── index.vue         # Strona główna
│   ├── about.vue         # O nas
│   ├── contact.vue       # Kontakt
│   ├── cart.vue          # Koszyk
│   ├── login.vue         # Logowanie
│   ├── product/          # Strony produktów
│   │   └── [id].vue      # Dynamiczny widok produktu
│   └── shop/             # Sklep
│       ├── index.vue     # Lista produktów
│       └── [category].vue # Kategorie produktów
├── plugins/              # Pluginy
│   ├── firebase.client.ts # Konfiguracja Firebase
│   ├── init.client.ts    # Inicjalizacja na kliencie
│   └── vuetify.ts        # Konfiguracja UI (do aktualizacji na @nuxt/ui)
├── public/               # Statyczne zasoby
│   ├── icons/            # Ikony PWA
│   └── images/           # Obrazy statyczne
├── server/               # Server-side kod (SSR)
├── stores/               # Pinia stores
│   ├── auth.ts           # Store autoryzacji
│   ├── cart.ts           # Store koszyka
│   └── products.ts       # Store produktów
├── app.vue               # Główny komponent aplikacji
├── nuxt.config.ts        # Konfiguracja Nuxt
├── firebase.json         # Konfiguracja Firebase
├── firestore.rules       # Reguły Firestore
└── storage.rules         # Reguły Storage
```

## Integration Points

1. **Firebase**:

   - Integracja Firestore do przechowywania produktów i zamówień
   - Firebase Authentication do zarządzania użytkownikami
   - Firebase Storage do przechowywania zdjęć produktów
   - Firebase Functions do obsługi formularza kontaktowego

2. **Stripe**:

   - Integracja płatności dla procesu checkout
   - Obsługa różnych metod płatności

3. **Nuxt Modules**:
   - i18n do wielojęzyczności
   - Pinia do zarządzania stanem
   - @nuxt/image do optymalizacji obrazów
   - @nuxt/ui do interfejsu użytkownika

## Timeline & Milestones

1. **Faza 1: Podstawy** (4 tygodnie) ✅

   - ✅ Konfiguracja projektu i środowiska
   - ✅ Implementacja layoutu i podstawowych komponentów
   - ✅ Konfiguracja Firebase i @nuxt/ui
   - ✅ Konfiguracja wielojęzyczności

2. **Faza 2: Funkcje Podstawowe** (6 tygodni) ✅

   - ✅ Implementacja logiki przeglądania produktów
   - ✅ Funkcjonalność koszyka z Pinia
   - ✅ Strony statyczne (O nas, Kontakt)
   - ✅ Integracja z Firestore

3. **Faza 3: Autoryzacja i Użytkownicy** (w trakcie) 🔄

   1. **System logowania i rejestracji**:

      - [x] Dokończenie widoku logowania (login.vue)
      - [x] Implementacja formularza rejestracji
      - [x] Integracja Firebase Authentication
      - [ ] Dodanie logowania przez Google/Facebook (opcjonalnie)
      - [🔄] Implementacja resetowania hasła
      - [🔄] Weryfikacja adresu email
      - [🔄] Zabezpieczenie chronionych tras w aplikacji

   2. **Profile użytkowników**:

      - [🔄] Utworzenie widoku profilu użytkownika
      - [🔄] Implementacja edycji danych użytkownika
      - [ ] Dodanie historii zamówień
      - [ ] Zarządzanie adresami dostawy
      - [ ] Implementacja ustawień powiadomień

   3. **Podstawy panelu administracyjnego**:
      - [ ] Utworzenie osobnego layoutu dla panelu admina
      - [ ] Implementacja uwierzytelniania i autoryzacji dla administratorów
      - [ ] Dodanie podstawowego dashboardu
      - [ ] Przygotowanie struktury do zarządzania produktami

4. **Faza 4: Płatności i Zamówienia** (6 tygodni) ❌

   - ❌ Integracja Stripe
   - ❌ Proces checkout
   - ❌ System zamówień

5. **Faza 5: Panel Administratora** (4 tygodnie) ❌

   - ❌ Zarządzanie produktami
   - ❌ Zarządzanie zamówieniami
   - ❌ Konfiguracja uprawnień

6. **Faza 6: Optymalizacja i PWA** (4 tygodnie) ❌
   - ❌ Optymalizacja wydajności
   - ❌ Implementacja PWA
   - ❌ Testy i bugfixy

Legenda:

- ✅ Zrealizowane
- 🔄 W trakcie realizacji
- ❌ Do zrealizowania

## Szczegółowy Plan Implementacji

### Faza 2: Funkcje Podstawowe (zakończone) ✅

1. **Implementacja logiki przeglądania produktów**:

   - [x] Utworzenie modelu danych dla produktów w Firestore
   - [x] Implementacja listingu wszystkich produktów na stronie shop/index.vue
   - [x] Dodanie filtrowania produktów według kategorii
   - [x] Implementacja sortowania produktów według ceny, daty i nazwy
   - [x] Dodanie paginacji dla wyników wyszukiwania
   - [x] Implementacja widoku szczegółowego produktu (product/[id].vue)
   - [x] Dodanie galerii zdjęć produktu
   - [x] Implementacja sekcji "Podobne produkty"

2. **Integracja z Firestore**:
   - [x] Konfiguracja reguł bezpieczeństwa Firestore
   - [x] Implementacja serwisów do pobierania danych z Firestore
   - [x] Opracowanie struktury kolekcji w bazie danych
   - [x] Implementacja mechanizmów cache'owania dla częstych zapytań
   - [x] Testy wydajności zapytań do Firestore

### Faza 3: Autoryzacja i Użytkownicy

1. **System logowania i rejestracji**:

   - [x] Dokończenie widoku logowania (login.vue)
   - [x] Implementacja formularza rejestracji
   - [x] Integracja Firebase Authentication
   - [ ] Dodanie logowania przez Google/Facebook (opcjonalnie)
   - [🔄] Implementacja resetowania hasła
   - [🔄] Weryfikacja adresu email
   - [🔄] Zabezpieczenie chronionych tras w aplikacji

2. **Profile użytkowników**:

   - [🔄] Utworzenie widoku profilu użytkownika
   - [🔄] Implementacja edycji danych użytkownika
   - [ ] Dodanie historii zamówień
   - [ ] Zarządzanie adresami dostawy
   - [ ] Implementacja ustawień powiadomień

3. **Podstawy panelu administracyjnego**:
   - [ ] Utworzenie osobnego layoutu dla panelu admina
   - [ ] Implementacja uwierzytelniania i autoryzacji dla administratorów
   - [ ] Dodanie podstawowego dashboardu
   - [ ] Przygotowanie struktury do zarządzania produktami

### Kolejne kroki (Faza 4)

Po ukończeniu Fazy 2 i 3, przejdziemy do implementacji:

1. Integracji Stripe
2. Procesu checkout
3. Systemu zamówień

### Zalecany porządek prac

1. Najpierw dokończ Fazę 2 - funkcje produktowe, które są sercem sklepu
2. Następnie przejdź do systemu logowania i rejestracji z Fazy 3
3. W dalszej kolejności zajmij się profilami użytkowników
4. Na końcu przygotuj podstawy panelu administracyjnego

Każdy punkt z powyższej listy może być traktowany jako osobne zadanie, które można śledzić i realizować krok po kroku.

## Future Considerations

1. **System rekomendacji** - Implementacja algorytmu rekomendacji produktów na podstawie historii przeglądania i zakupów.

2. **Rozszerzona wielojęzyczność** - Dodanie kolejnych języków (np. niemiecki, francuski).

3. **Integracja z mediami społecznościowymi** - Udostępnianie produktów w mediach społecznościowych.

4. **Program lojalnościowy** - System punktów i rabatów dla stałych klientów.

5. **Zaawansowana analityka** - Implementacja zaawansowanych narzędzi analitycznych do śledzenia zachowań użytkowników.

6. **System recenzji** - Możliwość wystawiania opinii i ocen produktom przez klientów.

7. **Funkcje PWA do przyszłego rozwoju**:
   - Zaawansowane wsparcie offline
   - Automatyczne aktualizacje aplikacji w tle
   - Zaawansowane strategie cache'owania (network-first vs cache-first)

## Success Metrics

1. **Konwersja** - Wskaźnik konwersji odwiedzających na klientów.

2. **Średnia wartość koszyka** - Średnia wartość zamówienia.

3. **Czas spędzany na stronie** - Pomiar zaangażowania użytkowników.

4. **Liczba powracających klientów** - Miernik zadowolenia klientów.

5. **Wydajność** - Czas ładowania strony i innych wskaźników wydajnościowych.

6. **Ruch mobilny vs desktop** - Proporcja odwiedzin z urządzeń mobilnych i stacjonarnych.

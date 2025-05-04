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

- **Framework**: Vue.js 3.5.13+ z Nuxt.js 3.17.1+ (tryb hybrydowy: SSG dla stron statycznych, SSR dla dynamicznych)
- **Package Manager**: pnpm 10.10.0+ (optymalny balans między szybkością a stabilnością)
- **Zarządzanie stanem**: Pinia (domyślny system zarządzania stanem dla Nuxt 3)
- **UI Framework**: @nuxt/ui 3.0+ (wersja darmowa)
- **Typescript**: Dla statycznego typowania
- **Wielojęzyczność**: i18n (polski i angielski)
- **API Style**: Composition API (lepsza organizacja kodu i reużywalność logiki)
- **Routing**: Vue Router 4.5+
- **Image Management**: @nuxt/image 1.10.0+ z Firebase Storage (z opcją migracji do Cloudinary/Cloudflare Images w przyszłości)

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

## Layout strony głównej MVP

### Sekcje strony głównej MVP

1. **Header**

   - Logo Lutkowo (placeholder do czasu dostarczenia finalnego logo)
   - Minimalny navbar (tylko przełącznik języka)
   - Przyciemniany przy scrollowaniu

2. **Hero Section**

   - Duży, przyciągający uwagę obraz wysokiej jakości (rękodzieło)
   - Hasło główne: "Lutkowo - Rękodzieło z pasją" (+ wersja angielska)
   - Krótki slogan opisujący charakter produktów
   - Subtelna animacja wejścia

3. **Sekcja "O nas"**

   - Krótka historia marki Lutkowo i filozofia tworzenia
   - Mały wizerunek twórców lub pracowni (opcjonalnie)
   - Call-to-action kierujący do przyszłych sekcji produktów

4. **Galeria przykładowych produktów**

   - Grid z 6-8 przykładowymi produktami w różnych kategoriach
   - Każdy produkt: zdjęcie, nazwa, krótki opis (bez ceny w MVP)
   - Subtelny hover effect dla interaktywności
   - Lazy loading obrazów dla optymalizacji wydajności

5. **Sekcja "Nasze kategorie"**

   - Podział na główne kategorie produktów (ceramika, szkło, glina, makramy)
   - Wizualne reprezentacje kategorii z charakterystyczną ikonografią
   - Przygotowanie pod przyszłe linkowanie do stron kategorii

6. **Footer**
   - Logo (mniejsza wersja)
   - Linki placeholder do przyszłych stron (O nas, Kontakt, itd.)
   - Informacje kontaktowe podstawowe
   - Ikony social media (placeholdery)
   - Copyright i podstawowe linki prawne

### Elementy UI w MVP

- **Przycisk CTA (Call to Action)** - przygotowany pod przyszłe funkcje
- **Karty produktów** - z subtelnym efektem hover i cieniem
- **Ikony kategorii** - minimalistyczne, spójne z identyfikacją wizualną
- **Animacje przewijania** - subtelne animacje elementów podczas scrollowania
- **Responsywne siatki** - dostosowujące się do różnych rozmiarów ekranu
- **Nawigacja** - minimalistyczna w MVP, przygotowana pod rozbudowę

## Harmonogram Projektu (Timeline)

### Milestone 1: MVP - Strona Główna (Planowany)

- Implementacja podstawowego layoutu strony głównej
- Stworzenie podstawowej struktury projektu w Nuxt.js
- Konfiguracja podstawowych ustawień PWA
- Podstawowa konfiguracja i18n (polski i angielski)
- Wdrożenie podstawowej wersji SEO
- Pierwsza wersja responsywnego designu
- Wdrożenie MVP na GitHub Pages

### Przyszłe Milestones (Propozycje)

**Milestone 2: Katalog Produktów**

- Implementacja systemu kategorii produktów
- Wyświetlanie listy produktów
- Filtrowanie i sortowanie produktów
- Integracja z Firebase dla przechowywania danych o produktach

**Milestone 3: Szczegółowe Strony Produktów**

- Strony szczegółowe produktów z galeriami zdjęć
- System wyświetlania podobnych/powiązanych produktów
- Integracja z @nuxt/image dla optymalizacji obrazów
- Rozbudowa funkcji SEO specyficznych dla produktów

**Milestone 4+: Panel Administracyjny i Rozbudowa Funkcji**

- Panel administracyjny
- System użytkowników
- Funkcje koszyka i zamówień
- Integracja płatności

_Uwaga: Milestone 2+ są wstępnymi propozycjami i będą doprecyzowane po realizacji Milestone 1._

## Todo List - Lista Zadań Do Zrobienia

### Priorytet 1 (MVP)

- Konfiguracja projektu Nuxt 3 z TypeScript
- Implementacja podstawowego layoutu strony głównej z sekcjami:
  - Header z placeholderem logo
  - Hero section z głównym hasłem i zdjęciem
  - Sekcja "O nas"
  - Galeria przykładowych produktów
  - Sekcja "Nasze kategorie"
  - Footer z podstawowymi informacjami
- Implementacja podstawowych metatagów SEO
- Konfiguracja podstawowego PWA (manifest i prosty service worker)
- Konfiguracja wielojęzyczności (polski/angielski)
- Implementacja responsywnego designu
- Wdrożenie MVP na GitHub Pages

### Priorytet 2 (Przyszłe zadania)

- Integracja z Firebase (Firestore, Authentication, Storage)
- Implementacja katalogu produktów z filtrowaniem i sortowaniem
- Rozwój szczegółowych stron produktów
- Rozbudowa funkcjonalności PWA (tryb offline, powiadomienia, geolokalizacja)
- Automatyczne wykrywanie języka użytkownika
- Implementacja testów jednostkowych z Vitest
- Panel administracyjny
- System użytkowników i autoryzacji
- Koszyk i system zamówień
- Integracja płatności

_Uwaga: Zadania z Priorytetu 2 będą doprecyzowane i zaplanowane po zakończeniu MVP._

## Rekomendowana struktura projektu

### Struktura katalogów (Nuxt 3)

```
lutkowo/
├── .github/                  # Konfiguracja GitHub Actions
├── .nuxt/                    # Katalog build (generowany automatycznie)
├── assets/                   # Zasoby wymagające przetwarzania (SCSS, nieskompresowane obrazy)
│   ├── css/                  # Globalne style CSS
│   │   ├── variables.css     # Zmienne CSS (kolory, typografia, spacing)
│   │   └── main.css          # Główny plik CSS
│   └── images/               # Obrazy wymagające przetworzenia (logo, ikony)
├── components/               # Komponenty Vue
│   ├── global/               # Komponenty globalne (dostępne automatycznie)
│   ├── layout/               # Komponenty używane w layoutach (header, footer, sidebar)
│   ├── product/              # Komponenty związane z produktami
│   ├── ui/                   # Komponenty UI (przyciski, inputy, modals)
│   └── home/                 # Komponenty specyficzne dla strony głównej
├── composables/              # Reużywalne funkcje composition API
│   ├── useProduct.ts         # Logika związana z produktami
│   ├── useAuth.ts            # Logika związana z autoryzacją
│   └── useSEO.ts             # Logika związana z SEO
├── content/                  # Treści markdown i JSON dla Nuxt Content
│   ├── en/                   # Treści w języku angielskim
│   └── pl/                   # Treści w języku polskim
├── layouts/                  # Layouty aplikacji
│   ├── default.vue           # Domyślny layout
│   └── admin.vue             # Layout dla panelu administratora
├── locales/                  # Pliki tłumaczeń
│   ├── en.json               # Tłumaczenia angielskie
│   └── pl.json               # Tłumaczenia polskie
├── middleware/               # Middleware Nuxt
│   └── auth.ts               # Middleware autoryzacji
├── pages/                    # Strony aplikacji
│   ├── index.vue             # Strona główna
│   ├── product/              # Strony produktów
│   └── admin/                # Strony administracyjne
├── plugins/                  # Pluginy Nuxt
│   ├── firebase.client.ts    # Konfiguracja Firebase (client-side)
│   └── i18n.ts               # Konfiguracja i18n
├── public/                   # Statyczne pliki dostępne publicznie
│   ├── favicon.ico           # Favicon
│   ├── robots.txt            # Plik robots.txt
│   ├── icons/                # Ikony PWA
│   └── images/               # Statyczne obrazy
├── server/                   # API i server middleware
│   ├── api/                  # API endpoints
│   └── middleware/           # Server middleware
├── stores/                   # Pinia stores
│   ├── product.ts            # Store produktów
│   └── user.ts               # Store użytkownika
├── types/                    # Definicje TypeScript
├── utils/                    # Funkcje pomocnicze
├── .gitignore                # Pliki ignorowane przez Git
├── app.vue                   # Główny komponent aplikacji
├── nuxt.config.ts            # Konfiguracja Nuxt
├── package.json              # Zależności projektu
├── tsconfig.json             # Konfiguracja TypeScript
└── README.md                 # Dokumentacja projektu
```

### Konwencje nazewnictwa

- **Komponenty**: PascalCase (np. `ProductCard.vue`)
- **Composables**: camelCase z przedrostkiem `use` (np. `useProduct.ts`)
- **Pliki stron**: kebab-case (np. `product-details.vue`)
- **Zmienne CSS**: kebab-case (np. `--primary-color`)
- **ID CSS**: camelCase (np. `#mainHeader`)
- **Klasy CSS**: kebab-case (np. `product-card`)

### Strategie optymalizacji frontendu

- Code splitting automatyczny przez Nuxt
- Lazy loading dla komponentów niebędących w widoku początkowym
- Preloading krytycznych zasobów
- Automatyczny tree-shaking przez Vite/Rollup
- Strategiczne używanie `defineAsyncComponent` dla cięższych komponentów

## Identyfikacja wizualna

### Paleta kolorów

Proponowana paleta dla przyjaznego, "bajkowego" charakteru, ale z zachowaniem profesjonalizmu:

- **Podstawowy**: #5E9CB2 (spokojny niebieski z pastelowym odcieniem)
- **Dodatkowy**: #F0C987 (ciepły, jasny żółty)
- **Akcent**: #E88C6A (łagodny koralowy)
- **Neutralny jasny**: #F5F5F5 (prawie biały)
- **Neutralny ciemny**: #4A5568 (ciemny szary z niebieskim odcieniem)

### Typografia

- **Nagłówki**: "Quicksand" (zaokrąglony, przyjazny font z charakterem)
- **Tekst podstawowy**: "Nunito" (czytelny, lekki, z zaokrąglonymi krawędziami)
- **Akcenty tekstowe**: "Caveat" (odręczny styl dla akcentów, np. w hasłach)

### Design System

Główne założenia:

- Zaokrąglone kształty (border-radius: 12px dla kart, 8px dla przycisków)
- Subtelne cienie (box-shadow z niskim rozproszeniem)
- Przestrzenność (wystarczająca ilość białej przestrzeni między elementami)
- Delikatne animacje przejść (opóźnienia 0.3-0.5s, łagodne krzywe przejścia)
- Ilustracyjne akcenty (subtelne elementy graficzne wzmacniające "bajkowy" charakter)

## Timeline i Milestones

_Ten rozdział został przeniesiony do sekcji "Harmonogram Projektu (Timeline)" powyżej._

## ToDo - Kwestie do zweryfikowania w przyszłości

### Podstawowa konfiguracja PWA do wdrożenia w MVP

- Utworzenie kompletnego manifestu PWA (`manifest.json` lub `manifest.webmanifest`)
- Konfiguracja podstawowego service workera (cache'owanie strategiczne kluczowych zasobów)
- Implementacja komponentu instalacji PWA (Add to Home Screen)
- Przygotowanie wszystkich wymaganych ikon PWA w odpowiednich rozmiarach

### Zaawansowane funkcje PWA (przyszłe rozszerzenia)

- Implementacja trybu offline z cache'owaniem dynamicznych treści
- Wdrożenie powiadomień push (Firebase Cloud Messaging)
- Implementacja funkcji geolokalizacji dla potencjalnego wyszukiwania lokalnych produktów
- Zaawansowane strategie cache'owania dla optymalizacji ruchu sieciowego

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

### Schemat kolekcji Firestore do zaplanowania przed implementacją

- Produkty:

  - id (auto-generated)
  - nazwa: string
  - cena: number
  - kategoria: string/ref
  - opis: string
  - obrazy: array<string> (URLe do Firebase Storage)
  - dostępność: boolean
  - utworzono: timestamp
  - zaktualizowano: timestamp

- Kategorie:

  - id (auto-generated)
  - nazwa: string
  - slug: string
  - obrazek: string (URL)
  - produktyCount: number

- Użytkownicy:
  - id (z Firebase Auth)
  - email: string
  - imię: string
  - nazwisko: string
  - adres: object
  - preferencje: object

### Podstawowe SEO do implementacji w MVP

- Konfiguracja właściwych metatagów dla każdej strony (title, description, og:\*)
- Implementacja struktury nagłówków (h1, h2, h3) zgodnie z hierarchią treści
- Zapewnienie przyjaznych URL-i (clean URLs)
- Konfiguracja robots.txt i podstawowego sitemap.xml
- Wdrożenie podstawowych znaczników Schema.org (dla strony głównej)

### Zaawansowane SEO (przyszłe rozszerzenia)

- Dynamicznie generowane sitemaps dla produktów i kategorii
- Rozszerzone wdrożenie Schema.org dla produktów
- Implementacja kanonicznych URL-i
- Optymalizacja szybkości ładowania strony (Core Web Vitals)
- Wdrożenie strukturalnych danych dla Rich Snippets

### Strategie testowania

- Wstępne testowanie manualne dla MVP
- Implementacja podstawowych testów jednostkowych z Vitest dla kluczowych komponentów
- Przyszłe wdrożenie testów komponentów z Vue Test Utils
- Testy end-to-end z Cypress lub Playwright w późniejszych etapach
- Testy wydajności z Lighthouse CI

### Design System i stylowanie

- Bazowanie na darmowej wersji Nuxt UI z minimalnymi modyfikacjami dla MVP
- Utworzenie pliku z podstawowymi zmiennymi CSS dla spójności wizualnej:
  - Paleta kolorów marki
  - Typografia (fonty, rozmiary, line-height)
  - Spacing system
  - Breakpointy dla RWD
- W przyszłości rozważenie stworzenia dedykowanych komponentów dla powtarzalnych elementów interfejsu

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

### Core Web Vitals i wydajność

- Optymalizacja Largest Contentful Paint (LCP) - czas ładowania największego elementu treści poniżej 2.5s
- Poprawa First Input Delay (FID) / Interaction to Next Paint (INP) - responsywność interakcji poniżej 200ms
- Minimalizacja Cumulative Layout Shift (CLS) - stabilność wizualna poniżej 0.1
- Implementacja strategii lazy loading dla obrazów poza widokiem
- Optymalizacja formatu i rozmiaru obrazów (AVIF/WebP z fallbackiem)
- Wdrożenie efektywnego cachowania zasobów statycznych
- Użycie nowoczesnych formatów obrazów z @nuxt/image

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

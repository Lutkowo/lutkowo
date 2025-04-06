# Lutkowo - Sklep z rękodziełem

Projekt sklepu internetowego z rękodziełem, wykonany przy użyciu Vue.js, Nuxt 3, Firebase oraz Vuetify.

## Funkcjonalności

- Przeglądanie produktów z podziałem na kategorie
- Filtrowanie i sortowanie produktów
- Koszyk zakupowy
- System autoryzacji (logowanie, rejestracja)
- Panel administracyjny do zarządzania produktami
- Wielojęzyczność (polski i angielski)
- PWA (Progressive Web App)
- Integracja z płatnościami Stripe
- Formularz kontaktowy z obsługą przez Firebase Functions

## Technologie

- **Frontend**: Vue.js, Nuxt.js, TypeScript
- **UI Framework**: Vuetify
- **Zarządzanie stanem**: Pinia
- **Backend/Baza danych**: Firebase (Firestore, Authentication, Storage, Functions)
- **Płatności**: Stripe
- **Wielojęzyczność**: i18n
- **PWA**: @vite-pwa/nuxt
- **Narzędzia developerskie**: ESLint, Prettier, Vite
- **Testy**: Vitest
- **CI/CD**: GitHub Actions

## Instalacja i uruchomienie

### Wymagania

- Node.js (v16+)
- npm lub yarn

### Konfiguracja

1. Sklonuj repozytorium:
   ```
   git clone https://github.com/twoj-username/lutkowo.git
   cd lutkowo
   ```

2. Zainstaluj zależności:
   ```
   npm install
   ```

3. Skopiuj plik `.env.example` do `.env` i uzupełnij zmienne środowiskowe:
   ```
   cp .env.example .env
   ```

4. Uruchom serwer deweloperski:
   ```
   npm run dev
   ```

Aplikacja będzie dostępna pod adresem: http://localhost:3000

## Deployment

Projekt jest skonfigurowany do deploymentu na Firebase Hosting poprzez GitHub Actions.

1. Zaloguj się do Firebase i utwórz nowy projekt
2. Aktywuj usługi Firestore, Authentication i Storage
3. Dodaj sekret `FIREBASE_TOKEN` w ustawieniach repozytorium na GitHubie
4. Wypchnij zmiany do gałęzi `main`

CI/CD automatycznie zbuduje i zdeployuje aplikację.

## Struktura projektu

- `/components` - Komponenty Vue
- `/layouts` - Layouty aplikacji
- `/pages` - Strony aplikacji (routing)
- `/plugins` - Pluginy (Firebase, Vuetify)
- `/stores` - Store'y Pinia
- `/public` - Statyczne zasoby
- `/locales` - Pliki tłumaczeń
- `/middleware` - Middleware dla routingu

## Licencja

[MIT](LICENSE)

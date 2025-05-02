# Lutkowo

Sklep internetowy specjalizujący się w sprzedaży ręcznie wykonanych produktów (ceramika, szkło, glina oraz makramy).

## Opis projektu

Lutkowo to aplikacja PWA zbudowana na frameworku Nuxt 3, oferująca responsywny interfejs do przeglądania i zakupu unikalnych, rękodzielniczych produktów. Aplikacja wykorzystuje Firebase jako backend i hosting oraz wspiera wielojęzyczność (polski i angielski).

## Funkcje

- Przeglądanie produktów z podziałem na kategorie
- Responsywny design dostosowany do urządzeń mobilnych i stacjonarnych
- Wsparcie dla PWA (możliwość instalacji na urządzeniach)
- Wielojęzyczność (polski i angielski)
- Optymalizacja SEO
- Integracja z Firebase (uwierzytelnianie, baza danych, hosting)

## Technologie

- Nuxt 3
- Vue 3
- TypeScript
- Firebase
- Pinia (zarządzanie stanem)
- i18n (wielojęzyczność)
- PWA

## Uruchamianie projektu

### Wymagania

- Node.js 18+
- Bun 1.0+

### Instalacja zależności

```bash
bun install
```

### Uruchamianie w trybie deweloperskim

```bash
bun run dev
```

### Budowanie wersji produkcyjnej

```bash
bun run build
```

### Wdrażanie na Firebase

```bash
bun run deploy
```

## Struktura projektu

- `assets/` - Pliki statyczne (CSS, obrazy)
- `components/` - Komponenty Vue
- `layouts/` - Layouty stron
- `pages/` - Strony aplikacji
- `public/` - Publiczne zasoby dostępne bezpośrednio (favicon, ikony)
- `server/` - Funkcje serwerowe

## Dokumentacja

Szczegółowy opis projektu, wymagań i funkcjonalności znajduje się w pliku [PWA_SETUP.md](./PWA_SETUP.md).

# Lutkowo - Sklep z rękodziełem

Platforma e-commerce dla ręcznie wykonanych produktów (ceramika, szkło, makramy, tekstylia i drewno).

## Wymagania systemowe

- Node.js 18+ (zalecane 20+)
- [Bun](https://bun.sh/) 1.0.0+
- Git

## Technologie

- Vue.js 3.5+
- Nuxt.js 3.16+
- TypeScript 5.6+
- @nuxt/ui 3.0+
- Firebase (planowane)
- Pinia (planowane)
- Stripe (planowane)

## Instalacja

Upewnij się, że masz zainstalowany Bun:

```bash
# Instalacja Bun (jeśli jeszcze nie masz)
curl -fsSL https://bun.sh/install | bash

# Lub za pomocą npm
npm install -g bun
```

Następnie zainstaluj zależności:

```bash
# Zalecane
bun install
```

## Serwer developerski

Uruchom serwer developerski na `http://localhost:3000`:

```bash
bun run dev
```

## Produkcja

Zbuduj aplikację do wdrożenia produkcyjnego:

```bash
bun run build
```

Podgląd wersji produkcyjnej lokalnie:

```bash
bun run preview
```

## Lintowanie i formatowanie kodu

```bash
# Sprawdzanie kodu
bun run lint

# Automatyczna naprawa problemów
bun run lint:fix
```

## Struktura projektu

Projekt jest zorganizowany zgodnie z konwencjami Nuxt 3:

- `components/`: Komponenty Vue
- `layouts/`: Układy aplikacji
- `pages/`: Strony aplikacji (routing automatyczny)
- `plugins/`: Pluginy Vue.js
- `public/`: Zasoby publiczne
- `stores/`: Pinia stores
- `locales/`: Pliki tłumaczeń (i18n)

Szczegółowa dokumentacja architektury i wymagań znajduje się w pliku [PWA_SETUP.md](./PWA_SETUP.md).

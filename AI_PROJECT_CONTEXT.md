# Lutkowo - Kontekst Projektu dla AI

## Aktualny Status

- **Faza projektu**: MVP w trakcie realizacji
- **Data**: 4 maja 2025
- **Bieżące zadanie**: Zakończono implementację layoutu strony głównej z rzeczywistymi obrazami
- **Postęp**: Ukończono około 60% zadań MVP

## Stack Technologiczny

- **Frontend**: Vue.js 3.5.13+, Nuxt.js 3.17.1+ (tryb hybrydowy: SSG/SSR)
- **Package Manager**: pnpm 10.10.0+
- **Zarządzanie stanem**: Pinia
- **UI Framework**: @nuxt/ui 3.0+ (wersja darmowa)
- **Języki**: TypeScript, CSS
- **Multilanguage**: i18n (polski i angielski) - zaimplementowane
- **API Style**: Composition API
- **Image Management**: @nuxt/image 1.10.0+

## Priorytetowe Zadania (MVP)

1. ✅ Konfiguracja projektu Nuxt 3 z TypeScript
2. ✅ Implementacja podstawowego layoutu strony głównej:
   - ✅ Header z placeholder logo
   - ✅ Hero section
   - ✅ Sekcja "O nas"
   - ✅ Galeria przykładowych produktów (dodano example_product.png)
   - ✅ Sekcja "Nasze kategorie" (dodano rzeczywiste obrazy trzech kategorii)
   - ✅ Footer
3. 🔄 Podstawowe SEO (metatagi) - częściowo zaimplementowane
4. ⬜ Podstawowa konfiguracja PWA
5. ✅ Wielojęzyczność (polski/angielski)
6. ✅ Responsywny design
7. ⬜ Wdrożenie na GitHub Pages

## Kluczowe Decyzje Architektury

- Tryb hybrydowy Nuxt (SSG dla stron statycznych, SSR dla dynamicznych)
- Minimalistyczny design z "bajkowym charakterem" - zaimplementowany
- Firebase planowany w późniejszych fazach (nie w MVP)
- Paleta kolorów: pastele (#5E9CB2, #F0C987, #E88C6A, #F5F5F5, #4A5568)
- Typografia: "Quicksand" (nagłówki), "Nunito" (tekst), "Caveat" (akcenty)
- Spójne wsparcie dla trzech kategorii produktów: ceramika, szkło, makrama

## Podjęte Decyzje

- Połączenie kategorii "ceramika" i "glina" w jedną kategorię "ceramika" dla lepszej spójności i klarowności oferty
- Implementacja karuzeli produktów na stronie głównej z użyciem prawdziwych zdjęć zamiast placeholderów
- Przyjęcie 3-kolumnowego układu dla sekcji kategorii

## Harmonogram

- MVP: 40h pracy (4 tygodnie po 2h dziennie)
- Hosting MVP: GitHub Pages
- Hosting docelowy: Firebase Hosting (w przyszłości)

## Następne Zadania (Priorytetowe)

1. Dokończenie konfiguracji SEO (metatagi, opisy, Open Graph)
2. Implementacja podstawowej konfiguracji PWA
3. Wdrożenie na GitHub Pages
4. Przygotowanie do Milestone 2 (Katalog Produktów)

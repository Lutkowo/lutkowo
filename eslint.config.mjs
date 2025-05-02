// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default withNuxt([
  // Podstawowa konfiguracja ESLint
  eslint.configs.recommended,

  // Konfiguracja TypeScript
  ...tseslint.configs.recommended,

  // Reguły stylistyczne (formatowanie kodu)
  {
    plugins: {
      stylistic,
    },
    rules: {
      "stylistic/semi": "error",
      "stylistic/indent": ["error", 2],
      "stylistic/max-len": ["error", { code: 100 }],
      "stylistic/quotes": ["error", "single"],
    },
  },

  // Reguły dostępności (accessibility)
  {
    rules: {
      "vue/no-v-html": "warn", // Pozwala wykryć potencjalne zagrożenia XSS
      "vue/require-default-prop": "error", // Wymusza domyślne wartości dla props
      "vue/component-name-in-template-casing": ["error", "PascalCase"], // Spójne nazewnictwo komponentów
      "vue/component-api-style": ["error", ["script-setup"]], // Preferuj script setup w komponentach
      "vue/multi-word-component-names": "error", // Nazwy komponentów powinny mieć wiele słów
    },
  },

  // Dodatkowa konfiguracja dla PWA i SEO
  {
    rules: {
      "vue/attribute-hyphenation": ["error", "always"], // aria-* i data-* atrybuty
      "vue/no-unused-components": "error", // Unikaj nieużywanych komponentów
      "vue/no-undef-components": "error", // Wszystkie komponenty muszą być zdefiniowane
      "vue/no-unused-vars": "error", // Unikaj nieużywanych zmiennych
      "vue/no-setup-props-destructure": "error", // Unikaj destrukturyzacji props w setup
    },
  },
]);

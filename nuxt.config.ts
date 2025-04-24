// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  // Konfiguracja zmiennych środowiskowych
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      firebaseMeasurementId: process.env.FIREBASE_MEASUREMENT_ID,
    }
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  // Konfiguracja UI
  ui: {
    global: true,
    icons: ['mdi', 'heroicons', 'twemoji'],
    safelistColors: ['primary', 'secondary', 'error', 'warning', 'success', 'info'],
    // Preferowane kolory marki Lutkowo - naturalne, ziemiste odcienie
    colors: {
      primary: {
        50: '#f7f3f1',
        100: '#e9e1dc',
        200: '#d6c6bb',
        300: '#c3ab9a',
        400: '#b09079',
        500: '#9D7559', // Główny kolor marki - ciepły brąz
        600: '#8a6348',
        700: '#775236',
        800: '#634125',
        900: '#503013'
      },
      secondary: {
        50: '#f1f6f4',
        100: '#d9e9e3',
        200: '#b3d3c7',
        300: '#8dbdab',
        400: '#67a78f',
        500: '#419173', // Akcentowy kolor - stonowana zieleń
        600: '#347d5f',
        700: '#28694c',
        800: '#1b5538',
        900: '#0e4124'
      }
    }
  },

  // Konfiguracja i18n
  i18n: {
    defaultLocale: 'pl',
    locales: [
      {
        code: 'pl',
        name: 'Polski',
        file: 'pl.json'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json'
      }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lutkowo_locale',
      redirectOn: 'root'
    },
    bundle: {
      optimizeTranslationDirective: false
    }
  },

  // Konfiguracja obrazów
  image: {
    quality: 80,
    format: ['webp', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  // Konfiguracja ikon
  icon: {
    size: '1.5rem'  // Domyślny rozmiar ikon
  },

  // Konfiguracja fontów
  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [400, 500, 600, 700]
      }
    ]
  }
});
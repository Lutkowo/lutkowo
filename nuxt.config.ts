import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@nuxtjs/seo' // Nowy moduł SEO zgodny z najnowszą dokumentacją
  ],

  css: [
    '~/assets/css/main.css'
  ],

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

  // Konfiguracja fontów
  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [400, 500, 600, 700]
      }
    ]
  },

  // Konfiguracja PWA zgodnie z PWA_SETUP.md
  pwa: {
    manifest: {
      name: 'Lutkowo',
      short_name: 'Lutkowo',
      description: 'Sklep internetowy z ręcznie wykonanymi produktami',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icons/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png'
        },
        {
          src: 'icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}']
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },

  // Nowa konfiguracja SEO zgodna z najnowszą dokumentacją
  site: {
    url: 'https://lutkowo.pl',
    name: 'Lutkowo - Ręcznie wykonane produkty',
    description: 'Sklep internetowy specjalizujący się w sprzedaży ręcznie wykonanych produktów ceramicznych, szklanych i makram',
    defaultLocale: 'pl',
  },

  // Konfiguracja Firebase
  runtimeConfig: {
    public: {
      firebase: {
        apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID
      }
    }
  }
});
// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    strict: true
  },

  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
    // Temporarily remove PWA module
  ],

  // Pinia configuration
  pinia: {
    autoImports: [
      'defineStore',
      ['defineStore', 'definePiniaStore'],
    ],
  },

  // i18n configuration
  i18n: {
    locales: [
      {
        code: 'pl',
        file: 'pl.json',
        name: 'Polski'
      },
      {
        code: 'en',
        file: 'en.json',
        name: 'English'
      }
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'pl',
    strategy: 'prefix_except_default',
  },

  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY
    },
    private: {
      stripeSecretKey: process.env.STRIPE_SECRET_KEY
    }
  },

  // Dodajmy też konfigurację app.vue dla poprawnego działania układu
  app: {
    head: {
      title: 'Lutkowo',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { key: 'description', name: 'description', content: 'Ręcznie robione rękodzieło z miłością' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  compatibilityDate: '2025-04-06'
})
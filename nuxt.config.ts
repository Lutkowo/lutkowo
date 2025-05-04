// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/i18n'
  ],

  // Globalne style CSS
  css: ['~/assets/css/main.css'],

  // Konfiguracja SEO
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Lutkowo - Rękodzieło z pasją',
      meta: [
        { name: 'description', content: 'Lutkowo - sklep z unikalnym rękodziełem. Odkryj wyjątkowe produkty ceramiczne, szklane oraz makramy tworzone z pasją i dbałością o każdy detal.' },
        { name: 'keywords', content: 'rękodzieło, ceramika, szkło, glina, makramy, handmade, Lutkowo, produkty ręczne' },
        { name: 'author', content: 'Lutkowo' },
        { property: 'og:title', content: 'Lutkowo - Rękodzieło z pasją' },
        { property: 'og:description', content: 'Odkryj wyjątkowe produkty ceramiczne, szklane oraz makramy tworzone z pasją i dbałością o każdy detal.' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  // Konfiguracja czcionek
  fonts: {
    families: [
      {
        name: 'Quicksand',
        weights: [400, 500, 600, 700]
      },
      {
        name: 'Nunito',
        weights: [400, 500, 600, 700]
      },
      {
        name: 'Caveat',
        weights: [400, 600]
      }
    ]
  },

  // Podstawowa konfiguracja PWA
  ssr: true,

  // Konfiguracja obrazów
  image: {
    format: ['webp', 'avif', 'jpg', 'png'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  // Konfiguracja i18n zgodnie z dokumentacją
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
    lazy: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lutkowo_locale',
      redirectOn: 'root'
    }
  }
});
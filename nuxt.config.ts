// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    '@nuxtjs/sitemap'
  ],

  // Konfiguracja site URL dla całej aplikacji
  site: {
    url: 'https://lutkowo.com'
  },

  // Konfiguracja sitemap
  sitemap: {
    siteUrl: 'https://lutkowo.com', // poprawna opcja zamiast 'hostname'
    gzip: true,
    exclude: [
      '/404'
    ],
    xmlNs: 'xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    i18n: true,
    defaults: {
      lastmod: new Date(),
      changefreq: 'weekly',
      priority: 0.8
    }
  },

  // Globalne style CSS
  css: ['~/assets/css/main.css'],

  // Konfiguracja SEO
  app: {
    baseURL: '/', // Wymusza generowanie strony pod https://lutkowo.github.io/
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
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/icons/og-image.png' },
        { property: 'og:url', content: 'https://lutkowo.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Lutkowo - Rękodzieło z pasją' },
        { name: 'twitter:description', content: 'Odkryj wyjątkowe produkty ceramiczne, szklane oraz makramy tworzone z pasją i dbałością o każdy detal.' },
        { name: 'twitter:image', content: '/icons/og-image.png' },
        { name: 'theme-color', content: '#5E9CB2' },
        // Dodatkowe tagi dla poprawy SEO
        { name: 'robots', content: 'index, follow' },
        { property: 'og:site_name', content: 'Lutkowo' },
        { property: 'og:locale', content: 'pl_PL' },
        { property: 'og:locale:alternate', content: 'en_US' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-touch-icon-180x180.png' },
        { rel: 'manifest', href: '/manifest.json' },
        // Kanoniczny link
        { rel: 'canonical', href: 'https://lutkowo.com' },
        // Alternatywne wersje językowe
        { rel: 'alternate', hreflang: 'pl', href: 'https://lutkowo.com' },
        { rel: 'alternate', hreflang: 'en', href: 'https://lutkowo.com/en' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://lutkowo.com' }
      ],
      // Przygotowanie dla strukturyzowanych danych (JSON-LD)
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'Lutkowo',
            'url': 'https://lutkowo.com',
            'logo': 'https://lutkowo.com/icons/og-image.png',
            'description': 'Sklep z unikalnym rękodziełem. Ceramika, szkło, makramy i inne rękodzieło tworzone z pasją.',
            'contactPoint': {
              '@type': 'ContactPoint',
              'telephone': '',  // Możesz dodać numer telefonu w przyszłości
              'contactType': 'customer service',
              'availableLanguage': ['Polish', 'English']
            },
            'sameAs': [
              // Tu możesz dodać linki do mediów społecznościowych w przyszłości
            ]
          })
        }
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
  pwa: {
    registerType: 'autoUpdate',
    manifest: false, // Używamy już istniejącego pliku manifest.json
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60*60*24*30 // 30 dni
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'gstatic-fonts-cache',
            expiration: {
              maxEntries: 10,
              maxAgeSeconds: 60*60*24*30 // 30 dni
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        {
          urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'images-cache',
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60*60*24*30 // 30 dni
            }
          }
        }
      ],
      cleanupOutdatedCaches: true,
      skipWaiting: true,
      clientsClaim: true
    },
    registerWebManifestInRouteRules: true,
    includeAssets: ['favicon.ico', 'icons/*.png']
  },

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
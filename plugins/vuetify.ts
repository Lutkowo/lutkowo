import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    blueprint: md3,
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#795548',   // Brown color for natural, craft-like look
            secondary: '#A1887F', // Lighter brown for accents
            accent: '#8D6E63',    // Another brown shade
            error: '#FF5252',
            warning: '#FB8C00',
            info: '#2196F3',
            success: '#4CAF50'
          }
        }
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
})

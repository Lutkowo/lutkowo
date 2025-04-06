# PWA Setup Instructions

To re-enable PWA functionality later, follow these steps:

1. Install the PWA module with a specific version that is compatible with Nuxt 3:
   ```bash
   npm install @vite-pwa/nuxt@0.0.10 -D
   ```

2. Update the nuxt.config.ts file to include the module again:
   ```typescript
   modules: [
     // ... other modules
     '@vite-pwa/nuxt'
   ],
   pwa: {
     registerType: 'autoUpdate',
     manifest: {
       name: 'Lutkowo',
       short_name: 'Lutkowo',
       description: 'Handmade crafts shop',
       theme_color: '#ffffff',
       icons: [
         {
           src: 'icons/icon-64x64.png',
           sizes: '64x64',
           type: 'image/png'
         },
         // ... other icons
       ]
     },
     workbox: {
       navigateFallback: '/',
       globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
     },
     client: {
       installPrompt: true,
     }
   }
   ```

3. Create the PWA icons with the correct dimensions and add them to the `public/icons` directory.

Note: The PWA functionality has been temporarily disabled to resolve build errors. We'll add it back once the project is stable.

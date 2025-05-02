<template>
  <UApp>
    <!-- Komponent PWA powiadomienia o instalacji -->
    <ClientOnly>
      <PWAInstallPrompt v-if="canInstall" />
    </ClientOnly>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
// Korzystamy z UApp jako głównego wrappera zgodnie z dokumentacją Nuxt UI
// UApp zapewnia globalne konfiguracje i jest wymagany dla komponentów
// takich jak Toast i Tooltip oraz dla programowego wyświetlania nakładek

import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useSeoMeta } from "@unhead/vue";

// Pobieramy tłumaczenia
const { t, locale } = useI18n();

// Definicja podstawowych metadanych SEO
useSeoMeta({
  title: () => t("site.title"),
  description: () => t("site.description"),
  ogTitle: () => t("site.title"),
  ogDescription: () => t("site.description"),
  ogImage: "/images/og-image.jpg",
  twitterCard: "summary_large_image",
  robots: "index, follow",
});

// Obsługa PWA
const canInstall = ref(false);
const deferredPrompt = ref<any>(null);

// Sprawdzamy czy przeglądarka wspiera instalację PWA
onMounted(() => {
  window.addEventListener("beforeinstallprompt", (e) => {
    // Zapobiegaj pokazaniu automatycznego powiadomienia o instalacji
    e.preventDefault();
    // Zapisz zdarzenie, aby użyć go później
    deferredPrompt.value = e;
    // Aktualizuj UI, aby pokazać przycisk instalacji
    canInstall.value = true;
  });
});
</script>

<style>
/* Globalne style dostępności */
:focus {
  outline: 2px solid #4f46e5;
  outline-offset: 2px;
}

/* Dodatkowe globalne style */
html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
}
</style>

import { useAuthStore } from '~/stores/auth';
import { useCartStore } from '~/stores/cart';
import { useProductsStore } from '~/stores/products';
import { useIntervalFn, usePageLeave } from '@vueuse/core';

export default defineNuxtPlugin((nuxtApp) => {
  // Plugin uruchamiany tylko po stronie klienta
  nuxtApp.hook('app:mounted', () => {
    console.log('🚀 Aplikacja Lutkowo została uruchomiona!');

    // Inicjalizacja store'a autoryzacji
    const authStore=useAuthStore();
    authStore.init();

    // Inicjalizacja store'a koszyka
    const cartStore=useCartStore();
    cartStore.initCart();

    // Pobieranie produktów
    const productsStore=useProductsStore();
    setTimeout(() => {
      productsStore.fetchProducts();
    }, 100); // Małe opóźnienie aby nie blokować hydratacji

    // Uruchamiamy okresowe odświeżanie listy produktów co 5 minut
    // aby utrzymać aktualne dane (dostępność, ceny)
    const { pause, resume }=useIntervalFn(() => {
      // Odświeżamy produkty tylko jeśli strona jest aktywna
      if(document.visibilityState==='visible') {
        productsStore.fetchProducts();
      }
    }, 5*60*1000); // 5 minut

    // Automatycznie zatrzymujemy odświeżanie, gdy użytkownik opuszcza stronę
    usePageLeave(() => {
      pause();
    });

    // Nasłuchujemy na zmiany widoczności strony
    window.addEventListener('visibilitychange', () => {
      if(document.visibilityState==='visible') {
        resume();
      } else {
        pause();
      }
    });

    // Zatrzymujemy interval gdy aplikacja jest niszczona
    nuxtApp.hook('app:beforeUnmount', () => {
      pause();
    });
  });
});
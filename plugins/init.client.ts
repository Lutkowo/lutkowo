import { defineNuxtPlugin } from 'nuxt/app'
import { useAuthStore } from '~/stores/auth'
import { useCartStore } from '~/stores/cart'


export default defineNuxtPlugin(async () => {
  // Initialize stores
  const authStore = useAuthStore()
  const cartStore = useCartStore()
  
  // Initialize auth state
  await authStore.init()
  
  // Initialize cart
  cartStore.initCart()
})

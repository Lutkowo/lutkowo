import { defineStore } from 'pinia'

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    loading: false,
    error: null as string | null
  }),
  
  getters: {
    cartTotal: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
    
    cartCount: (state) => {
      return state.items.reduce((count, item) => count + item.quantity, 0)
    },
    
    getItemById: (state) => (productId: string) => {
      return state.items.find(item => item.productId === productId)
    }
  },
  
  actions: {
    addItem(product: any, quantity = 1) {
      const existing = this.items.find(item => item.productId === product.id)
      
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({
          id: `cart-${Date.now()}`,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          quantity
        })
      }
      
      // Save to local storage
      this.saveToLocalStorage()
    },
    
    removeItem(productId: string) {
      this.items = this.items.filter(item => item.productId !== productId)
      this.saveToLocalStorage()
    },
    
    updateQuantity(productId: string, quantity: number) {
      const item = this.items.find(item => item.productId === productId)
      if (item) {
        item.quantity = quantity
        this.saveToLocalStorage()
      }
    },
    
    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },
    
    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items))
    },
    
    loadFromLocalStorage() {
      const stored = localStorage.getItem('cart')
      if (stored) {
        this.items = JSON.parse(stored)
      }
    },
    
    initCart() {
      // Only load from localStorage on client-side
      if (process.client) {
        this.loadFromLocalStorage()
      }
    }
  }
})

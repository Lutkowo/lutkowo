import { useNuxtApp } from 'nuxt/app';
import { defineStore } from 'pinia'
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  Firestore
} from 'firebase/firestore'

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  available: boolean;
  featured: boolean;
  created: Date;
}

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    loading: false,
    error: null as string | null
  }),
  
  getters: {
    featuredProducts: (state) => state.products.filter(product => product.featured),
    getProductById: (state) => (id: string) => state.products.find(product => product.id === id),
    getProductsByCategory: (state) => (category: string) => 
      state.products.filter(product => product.category === category && product.available),
  },
  
  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      
      try {
        const nuxtApp = useNuxtApp()
        const firestore = nuxtApp.$firestore as Firestore
        const productsCollection = collection(firestore, 'products')
        const productsSnapshot = await getDocs(productsCollection)
        
        this.products = productsSnapshot.docs.map(doc => {
          const data = doc.data()
          return {
            id: doc.id,
            ...data,
            price: Number(data.price),
            created: data.created?.toDate() || new Date()
          } as Product
        })
      } catch (error: any) {
        this.error = error.message || 'Błąd pobierania produktów'
        console.error('Error fetching products:', error)
      } finally {
        this.loading = false
      }
    },
    
    async fetchProductById(id: string) {
      try {
        const nuxtApp = useNuxtApp()
        const firestore = nuxtApp.$firestore as Firestore
        const productDoc = doc(firestore, 'products', id)
        const productSnapshot = await getDoc(productDoc)
        
        if (productSnapshot.exists()) {
          const data = productSnapshot.data()
          return {
            id: productSnapshot.id,
            ...data,
            price: Number(data.price),
            created: data.created?.toDate() || new Date()
          } as Product
        } else {
          return null
        }
      } catch (error: any) {
        console.error('Error fetching product:', error)
        return null
      }
    },
    
    async addProduct(product: Omit<Product, 'id'>) {
      try {
        const nuxtApp = useNuxtApp()
        const firestore = nuxtApp.$firestore as Firestore
        const productsCollection = collection(firestore, 'products')
        const docRef = await addDoc(productsCollection, {
          ...product,
          created: new Date()
        })
        
        const newProduct = {
          ...product,
          id: docRef.id
        }
        
        this.products.push(newProduct)
        return newProduct
      } catch (error: any) {
        console.error('Error adding product:', error)
        throw error
      }
    },
    
    async updateProduct(id: string, updates: Partial<Product>) {
      try {
        const nuxtApp = useNuxtApp()
        const firestore = nuxtApp.$firestore as Firestore
        const productRef = doc(firestore, 'products', id)
        await updateDoc(productRef, updates)
        
        const index = this.products.findIndex(p => p.id === id)
        if (index !== -1) {
          this.products[index] = { ...this.products[index], ...updates }
        }
        
        return true
      } catch (error: any) {
        console.error('Error updating product:', error)
        throw error
      }
    },
    
    async deleteProduct(id: string) {
      try {
        const nuxtApp = useNuxtApp()
        const firestore = nuxtApp.$firestore as Firestore
        const productRef = doc(firestore, 'products', id)
        await deleteDoc(productRef)
        
        this.products = this.products.filter(p => p.id !== id)
        return true
      } catch (error: any) {
        console.error('Error deleting product:', error)
        throw error
      }
    }
  }
})

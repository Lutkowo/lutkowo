import { defineStore } from 'pinia'
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  type User
} from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    loading: false,
    error: null as string | null
  }),
  
  getters: {
    isLoggedIn: (state) => !!state.user,
    isAdmin: (state) => !!state.user && state.user.email === 'admin@lutkowo.pl' // Prosta logika na potrzeby demonstracji
  },
  
  actions: {
    async login(email: string, password: string) {
      this.loading = true
      this.error = null
      
      try {
        const auth = getAuth()
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
      } catch (error: any) {
        this.error = error.message || 'Wystąpił błąd podczas logowania'
        console.error('Login error:', error)
      } finally {
        this.loading = false
      }
    },
    
    async register(email: string, password: string) {
      this.loading = true
      this.error = null
      
      try {
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        this.user = userCredential.user
      } catch (error: any) {
        this.error = error.message || 'Wystąpił błąd podczas rejestracji'
        console.error('Register error:', error)
      } finally {
        this.loading = false
      }
    },
    
    async logout() {
      this.loading = true
      
      try {
        const auth = getAuth()
        await signOut(auth)
        this.user = null
      } catch (error: any) {
        this.error = error.message || 'Wystąpił błąd podczas wylogowywania'
        console.error('Logout error:', error)
      } finally {
        this.loading = false
      }
    },
    
    init() {
      // Alias do initAuth dla zachowania spójności API
      this.initAuth()
    },
    
    initAuth() {
      const auth = getAuth()
      
      onAuthStateChanged(auth, (user) => {
        this.user = user
      })
    }
  }
})

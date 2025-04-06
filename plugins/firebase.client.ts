import { defineNuxtPlugin, useRuntimeConfig } from 'nuxt/app'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey as string,
    authDomain: config.public.firebaseAuthDomain as string,
    projectId: config.public.firebaseProjectId as string,
    storageBucket: config.public.firebaseStorageBucket as string,
    messagingSenderId: config.public.firebaseMessagingSenderId as string,
    appId: config.public.firebaseAppId as string
  }
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const firestore = getFirestore(app)
  const auth = getAuth(app)
  const storage = getStorage(app)
  
  nuxtApp.provide('firebase', app)
  nuxtApp.provide('firestore', firestore)
  nuxtApp.provide('auth', auth)
  nuxtApp.provide('storage', storage)
})

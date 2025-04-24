import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig, useEmulators, emulatorConfig } from '~/firebase.config';

export default defineNuxtPlugin((nuxtApp) => {
  // Dostęp do zmiennych konfiguracyjnych z nuxt.config.ts
  const runtimeConfig = useRuntimeConfig();
  
  // Zastosowanie zmiennych środowiskowych z nuxt.config.ts
  const config = {
    apiKey: runtimeConfig.public.firebaseApiKey,
    authDomain: runtimeConfig.public.firebaseAuthDomain,
    projectId: runtimeConfig.public.firebaseProjectId,
    storageBucket: runtimeConfig.public.firebaseStorageBucket,
    messagingSenderId: runtimeConfig.public.firebaseMessagingSenderId,
    appId: runtimeConfig.public.firebaseAppId,
    measurementId: runtimeConfig.public.firebaseMeasurementId
  };

  // Plugin uruchamiany tylko po stronie klienta

  // Inicjalizacja aplikacji Firebase
  const firebaseApp = initializeApp(config);

  // Inicjalizacja usług Firebase
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const functions = getFunctions(firebaseApp);

  // Inicjalizacja Analytics tylko w środowisku produkcyjnym i po stronie klienta
  let analytics = null;
  if (process.client && process.env.NODE_ENV === 'production') {
    analytics = getAnalytics(firebaseApp);
  }

  // Podłączenie do emulatorów w środowisku deweloperskim
  if (process.env.NODE_ENV === 'development') {
    // Dla lokalnego testowania z emulatorami Firebase uncomment poniższe linie
    // connectAuthEmulator(auth, 'http://localhost:9099')
    // connectFirestoreEmulator(firestore, 'localhost', 8080)
    // connectStorageEmulator(storage, 'localhost', 9199)
    // connectFunctionsEmulator(functions, 'localhost', 5001)

    console.log('🔥 Firebase zainicjalizowany w trybie deweloperskim');
  } else {
    console.log('🔥 Firebase zainicjalizowany w trybie produkcyjnym');
  }

  // Udostępnienie usług Firebase w kontekście aplikacji
  nuxtApp.provide('firebase', {
    app: firebaseApp,
    auth,
    firestore,
    storage,
    functions,
    analytics
  });

  // Udostępnienie auth jako osobnej właściwości dla wygody
  nuxtApp.provide('auth', auth);
});
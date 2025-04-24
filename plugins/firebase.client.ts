import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig, useEmulators, emulatorConfig } from '~/firebase.config';

export default defineNuxtPlugin((nuxtApp) => {
  // Dostęp do zmiennych konfiguracyjnych z nuxt.config.ts
  const runtimeConfig=useRuntimeConfig();

  // Zastosowanie zmiennych środowiskowych z nuxt.config.ts
  const config={
    apiKey: runtimeConfig.public.firebaseApiKey,
    authDomain: runtimeConfig.public.firebaseAuthDomain,
    projectId: runtimeConfig.public.firebaseProjectId,
    storageBucket: runtimeConfig.public.firebaseStorageBucket,
    messagingSenderId: runtimeConfig.public.firebaseMessagingSenderId,
    appId: runtimeConfig.public.firebaseAppId,
    measurementId: runtimeConfig.public.firebaseMeasurementId
  };

  // Sprawdzenie, czy wszystkie wymagane zmienne środowiskowe są zdefiniowane
  const requiredFields=['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingFields=requiredFields.filter(field => !config[field]);

  if(missingFields.length>0) {
    console.error(`❌ Brakujące zmienne środowiskowe Firebase: ${missingFields.join(', ')}`);
    console.error('❌ Upewnij się, że plik .env istnieje i zawiera wszystkie wymagane zmienne.');

    // W trybie deweloperskim wyświetl szczegółowy komunikat pomocniczy
    if(process.env.NODE_ENV==='development') {
      console.error('📝 Przykładowa struktura pliku .env:');
      console.error(`
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project_id.firebasestorage.app
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id
      `);
      console.error('❗ Aby rozwiązać problem:');
      console.error('1. Sprawdź, czy plik .env istnieje w głównym katalogu projektu');
      console.error('2. Upewnij się, że plik .env zawiera wszystkie wymagane zmienne');
      console.error('3. Zrestartuj serwer deweloperski po dokonaniu zmian w pliku .env');
    }

    // Utworzenie obiektu błędu, który zostanie wyświetlony użytkownikowi
    const error=new Error('Firebase configuration error: Missing environment variables');

    // Zwracamy błąd przez provide - NIE używamy nuxtApp.provide wielokrotnie
    return {
      provide: {
        firebase: null,
        auth: null,
        firebaseError: error
      }
    };
  }

  try {
    // Inicjalizacja aplikacji Firebase
    const firebaseApp=initializeApp(config);

    // Inicjalizacja usług Firebase
    const auth=getAuth(firebaseApp);
    const firestore=getFirestore(firebaseApp);
    const storage=getStorage(firebaseApp);
    const functions=getFunctions(firebaseApp);

    // Inicjalizacja Analytics tylko w środowisku produkcyjnym i po stronie klienta
    let analytics=null;
    if(process.client&&process.env.NODE_ENV==='production') {
      analytics=getAnalytics(firebaseApp);
    }

    // Podłączenie do emulatorów w środowisku deweloperskim
    if(process.env.NODE_ENV==='development') {
      // Dla lokalnego testowania z emulatorami Firebase uncomment poniższe linie
      // connectAuthEmulator(auth, 'http://localhost:9099')
      // connectFirestoreEmulator(firestore, 'localhost', 8080)
      // connectStorageEmulator(storage, 'localhost', 9199)
      // connectFunctionsEmulator(functions, 'localhost', 5001')

      console.log('🔥 Firebase zainicjalizowany w trybie deweloperskim');
    } else {
      console.log('🔥 Firebase zainicjalizowany w trybie produkcyjnym');
    }

    // Utwórz obiekt Firebase z usługami
    const firebase={
      app: firebaseApp,
      auth,
      firestore,
      storage,
      functions,
      analytics
    };

    // Zwracamy obiekty przez provide - NIE używamy nuxtApp.provide wielokrotnie
    return {
      provide: {
        firebase,
        auth,
        firebaseError: null
      }
    };

  } catch(error) {
    console.error('❌ Błąd inicjalizacji Firebase:', error);

    // Zwracamy błąd przez provide - NIE używamy nuxtApp.provide wielokrotnie
    return {
      provide: {
        firebase: null,
        auth: null,
        firebaseError: error
      }
    };
  }
});
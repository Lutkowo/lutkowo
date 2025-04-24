// Firebase konfiguracja
export const firebaseConfig={
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Konfiguracja emulatorów dla lokalnego developmentu
export const useEmulators=process.env.USE_FIREBASE_EMULATORS==='true';
export const emulatorConfig={
  auth: { url: 'http://localhost:9099' },
  firestore: { host: 'localhost', port: 8080 },
  functions: { host: 'localhost', port: 5001 },
  storage: { host: 'localhost', port: 9199 }
};

// Konfiguracja usług Firebase
export const firebaseServices={
  auth: true,
  firestore: true,
  storage: true,
  functions: true,
  analytics: process.env.NODE_ENV==='production', // Analytics tylko w produkcji
  performance: process.env.NODE_ENV==='production', // Performance tylko w produkcji
  messaging: false // Messaging wyłączone w pierwszej wersji
};
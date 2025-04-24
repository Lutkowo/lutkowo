import { defineStore } from 'pinia';
import { useStorage, useAsyncState } from '@vueuse/core';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, getFirestore } from 'firebase/firestore';

interface User {
  id: string;
  email: string;
  displayName?: string;
  isAdmin: boolean;
}

interface AuthState {
  user: User|null;
  loading: boolean;
  error: string|null;
  initialized: boolean;
}

export const useAuthStore=defineStore('auth', () => {
  // Używamy useStorage do przechowywania stanu użytkownika między sesjami
  const user=useStorage<User|null>('lutkowo-user', null);
  const loading=ref(false);
  const error=ref<string|null>(null);
  const initialized=ref(false);

  // Sprawdzenie czy użytkownik jest zalogowany
  const isLoggedIn=computed(() => !!user.value);

  // Sprawdzenie czy użytkownik jest administratorem
  const isAdmin=computed(() => isLoggedIn.value&&user.value?.isAdmin===true);

  // Logowanie użytkownika z Firebase Authentication
  async function login (email: string, password: string) {
    loading.value=true;
    error.value=null;

    try {
      const auth=getAuth();
      const firestore=getFirestore();

      // Logowanie z Firebase
      const result=await signInWithEmailAndPassword(auth, email, password);

      // Pobranie dodatkowych informacji z Firestore
      const userDoc=await getDoc(doc(firestore, 'users', result.user.uid));

      // Przypisanie danych użytkownika
      user.value={
        id: result.user.uid,
        email: result.user.email||email,
        displayName: result.user.displayName||undefined,
        isAdmin: userDoc.exists()? userDoc.data().isAdmin||false:false
      };

      // Jeśli dokument użytkownika nie istnieje, stworzymy go
      if(!userDoc.exists()) {
        await setDoc(doc(firestore, 'users', result.user.uid), {
          email: result.user.email,
          displayName: result.user.displayName,
          isAdmin: false,
          createdAt: new Date()
        });
      }

      return user.value;
    } catch(err: any) {
      let message='Wystąpił błąd podczas logowania';

      // Obsługa typowych błędów Firebase Authentication
      if(err.code==='auth/user-not-found'||err.code==='auth/wrong-password') {
        message='Nieprawidłowy email lub hasło';
      } else if(err.code==='auth/too-many-requests') {
        message='Zbyt wiele prób logowania. Spróbuj ponownie później';
      } else if(err.code==='auth/user-disabled') {
        message='Konto zostało zablokowane';
      }

      error.value=message;
      console.error('Login error:', err);
      return null;
    } finally {
      loading.value=false;
    }
  }

  // Rejestracja użytkownika z Firebase Authentication
  async function register (email: string, password: string, displayName: string) {
    loading.value=true;
    error.value=null;

    try {
      const auth=getAuth();
      const firestore=getFirestore();

      // Tworzenie użytkownika w Firebase Auth
      const result=await createUserWithEmailAndPassword(auth, email, password);

      // Aktualizacja profilu z displayName
      await updateProfile(result.user, { displayName });

      // Tworzenie dokumentu użytkownika w Firestore
      await setDoc(doc(firestore, 'users', result.user.uid), {
        email,
        displayName,
        isAdmin: false,
        createdAt: new Date()
      });

      // Przypisanie danych użytkownika
      user.value={
        id: result.user.uid,
        email,
        displayName,
        isAdmin: false
      };

      return user.value;
    } catch(err: any) {
      let message='Wystąpił błąd podczas rejestracji';

      // Obsługa typowych błędów Firebase Authentication
      if(err.code==='auth/email-already-in-use') {
        message='Ten adres email jest już używany';
      } else if(err.code==='auth/invalid-email') {
        message='Nieprawidłowy adres email';
      } else if(err.code==='auth/weak-password') {
        message='Hasło jest zbyt słabe';
      }

      error.value=message;
      console.error('Register error:', err);
      return null;
    } finally {
      loading.value=false;
    }
  }

  // Wylogowanie użytkownika
  async function logout () {
    try {
      const auth=getAuth();
      await signOut(auth);
      user.value=null;
      return true;
    } catch(err) {
      console.error('Logout error:', err);
      return false;
    }
  }

  // Inicjalizacja stanu autoryzacji
  function init () {
    if(initialized.value) return;

    const auth=getAuth();

    // Nasłuchiwanie na zmiany stanu autoryzacji
    onAuthStateChanged(auth, async (firebaseUser) => {
      loading.value=true;

      try {
        if(firebaseUser) {
          const firestore=getFirestore();

          // Pobranie dodatkowych informacji z Firestore
          const userDoc=await getDoc(doc(firestore, 'users', firebaseUser.uid));

          // Aktualizacja stanu użytkownika
          user.value={
            id: firebaseUser.uid,
            email: firebaseUser.email||'',
            displayName: firebaseUser.displayName||undefined,
            isAdmin: userDoc.exists()? userDoc.data().isAdmin||false:false
          };
        } else {
          // Użytkownik wylogowany
          user.value=null;
        }
      } catch(err) {
        console.error('Error in auth state change handler:', err);
        user.value=null;
      } finally {
        loading.value=false;
      }
    });

    initialized.value=true;
  }

  // Resetowanie stanu błędu
  function resetError () {
    error.value=null;
  }

  return {
    user,
    loading,
    error,
    isLoggedIn,
    isAdmin,
    login,
    register,
    logout,
    init,
    resetError
  };
});
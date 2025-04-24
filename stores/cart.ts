import { defineStore } from 'pinia';
import { useStorage, useEventBus, useCycleList } from '@vueuse/core';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  increment
} from 'firebase/firestore';
import { useAuthStore } from './auth';

interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  attributes?: Record<string, string>;
}

interface Coupon {
  code: string;
  discount: number; // procent zniżki (np. 10 = 10%)
  type: 'percentage'|'fixed';
  validUntil?: Date;
  minCartValue?: number;
}

// Wydarzenie do synchronizacji koszyka między kartami
const cartBus=useEventBus<{ type: string, payload?: any; }>('cart-updates');

export const useCartStore=defineStore('cart', () => {
  // Używamy useStorage do przechowywania koszyka w localStorage (dla niezalogowanych użytkowników)
  const items=useStorage<CartItem[]>('lutkowo-cart', []);
  const appliedCoupon=useStorage<Coupon|null>('lutkowo-coupon', null);
  const loading=ref(false);
  const error=ref<string|null>(null);

  // Korzystamy z authStore aby określić czy użytkownik jest zalogowany
  const authStore=useAuthStore();

  // Zmienna wskazująca czy koszyk został już zsynchronizowany z Firebase
  const isSynced=ref(false);

  // Pobieranie dostępnych kuponów z Firestore
  async function fetchAvailableCoupons () {
    try {
      const db=getFirestore();
      const couponsRef=collection(db, 'coupons');

      // Pobierz tylko aktywne kupony (te których data ważności jest w przyszłości)
      const q=query(
        couponsRef,
        where('active', '==', true),
        where('validUntil', '>', new Date())
      );

      const querySnapshot=await getDocs(q);

      return querySnapshot.docs.map(doc => {
        const data=doc.data();
        return {
          code: doc.id,
          discount: data.discount||0,
          type: data.type||'percentage',
          validUntil: data.validUntil?.toDate(),
          minCartValue: data.minCartValue||0
        } as Coupon;
      });
    } catch(err) {
      console.error('Error fetching coupons:', err);
      // W przypadku błędu, zwracamy domyślne kupony
      return [
        { code: 'WELCOME10', discount: 10, type: 'percentage' },
        { code: 'FREESHIPPING', discount: 15, type: 'fixed' },
        { code: 'LUTKOWO25', discount: 25, type: 'percentage' }
      ];
    }
  }

  // Lista dostępnych kuponów
  const availableCoupons=ref<Coupon[]>([
    { code: 'WELCOME10', discount: 10, type: 'percentage' },
    { code: 'FREESHIPPING', discount: 15, type: 'fixed' },
    { code: 'LUTKOWO25', discount: 25, type: 'percentage' }
  ]);

  // Inicjalizacja dostępnych kuponów
  async function initCoupons () {
    try {
      availableCoupons.value=await fetchAvailableCoupons();
    } catch(err) {
      console.error('Error initializing coupons:', err);
    }
  }

  // Możliwość cyklicznego przełączania między dostępnymi kuponami (dla UI)
  const { state: currentCouponDisplay, next: nextCouponDisplay }=useCycleList(availableCoupons);

  // Nasłuchiwanie na zmiany koszyka z innych kart
  cartBus.on((event) => {
    if(event.type==='sync'&&event.payload) {
      // Synchronizujemy stan koszyka z innej karty
      items.value=event.payload;
    }
  });

  // Obliczenie wartości koszyka
  const cartTotal=computed(() => {
    const subtotal=items.value.reduce((total, item) => total+(item.price*item.quantity), 0);

    if(!appliedCoupon.value) return subtotal;

    // Sprawdzamy czy wartość koszyka przekracza minimalną wartość dla kuponu
    if(appliedCoupon.value.minCartValue&&subtotal<appliedCoupon.value.minCartValue) {
      return subtotal;
    }

    if(appliedCoupon.value.type==='percentage') {
      const discount=subtotal*(appliedCoupon.value.discount/100);
      return subtotal-discount;
    } else {
      return Math.max(0, subtotal-appliedCoupon.value.discount);
    }
  });

  // Obliczenie liczby przedmiotów w koszyku
  const cartCount=computed(() => {
    return items.value.reduce((count, item) => count+item.quantity, 0);
  });

  // Obliczenie wartości rabatu
  const discountValue=computed(() => {
    if(!appliedCoupon.value) return 0;

    const subtotal=items.value.reduce((total, item) => total+(item.price*item.quantity), 0);

    // Sprawdzamy czy wartość koszyka przekracza minimalną wartość dla kuponu
    if(appliedCoupon.value.minCartValue&&subtotal<appliedCoupon.value.minCartValue) {
      return 0;
    }

    if(appliedCoupon.value.type==='percentage') {
      return subtotal*(appliedCoupon.value.discount/100);
    } else {
      return appliedCoupon.value.discount;
    }
  });

  // Pobranie przedmiotu z koszyka na podstawie ID produktu
  function getItemById (productId: string) {
    return items.value.find(item => item.productId===productId);
  }

  // Synchronizacja koszyka z Firestore (dla zalogowanych użytkowników)
  async function syncCartWithFirestore () {
    if(!authStore.isLoggedIn) return;

    const db=getFirestore();
    const cartRef=doc(db, 'users', authStore.user.id, 'cart', 'current');

    try {
      const cartDoc=await getDoc(cartRef);

      // Jeśli koszyk istnieje w Firestore
      if(cartDoc.exists()) {
        const firestoreCart=cartDoc.data();
        const firestoreItems=firestoreCart.items||[];

        // Sprawdź, czy mamy lokalny koszyk do połączenia
        if(items.value.length>0) {
          // Utwórz mapę dla szybszego dostępu do produktów z Firestore
          const firestoreItemsMap=new Map();
          firestoreItems.forEach(item => {
            firestoreItemsMap.set(item.id, item);
          });

          // Utwórz nową tablicę połączonych produktów
          const mergedItems=[...items.value];

          // Dodaj produkty z Firestore, które nie istnieją w koszyku lokalnym
          // lub zaktualizuj ilości, jeśli produkt już istnieje
          firestoreItems.forEach(firestoreItem => {
            const localItemIndex=mergedItems.findIndex(item => item.id===firestoreItem.id);

            if(localItemIndex===-1) {
              // Produkt nie istnieje lokalnie, dodaj go
              mergedItems.push(firestoreItem);
            } else {
              // Produkt istnieje lokalnie, zaktualizuj ilość
              // Wybierz większą wartość, aby nie utracić produktów
              mergedItems[localItemIndex].quantity=Math.max(
                mergedItems[localItemIndex].quantity,
                firestoreItem.quantity
              );
            }
          });

          // Zaktualizuj lokalny koszyk połączonymi produktami
          items.value=mergedItems;

          // Zaktualizuj Firestore jednym wywołaniem
          await updateDoc(cartRef, {
            items: mergedItems,
            updatedAt: serverTimestamp()
          });
        } else {
          // Lokalny koszyk jest pusty, użyj koszyka z Firestore
          items.value=firestoreItems;

          // Zastosuj kupon, jeśli istnieje w koszyku Firestore
          if(firestoreCart.coupon) {
            appliedCoupon.value=firestoreCart.coupon;
          }
        }
      } else if(items.value.length>0) {
        // Koszyk nie istnieje w Firestore, ale mamy lokalny koszyk
        // Zapisz lokalny koszyk do Firestore
        await setDoc(cartRef, {
          items: items.value,
          coupon: appliedCoupon.value,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }

      // Emituj zdarzenie aktualizacji koszyka
      cartBus.emit('update');
    } catch(err) {
      console.error('Error syncing cart with Firestore:', err);
    }
  }

  // Dodanie przedmiotu do koszyka
  async function addItem (product: any, quantity=1, attributes: Record<string, string>={}) {
    const existing=items.value.find(item =>
      item.productId===product.id&&
      JSON.stringify(item.attributes||{})===JSON.stringify(attributes)
    );

    if(existing) {
      existing.quantity+=quantity;
    } else {
      items.value.push({
        id: `cart-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]||'/images/placeholder.jpg',
        quantity,
        attributes
      });
    }

    // Powiadom inne karty o zmianie w koszyku
    cartBus.emit({ type: 'sync', payload: items.value });

    // Jeśli użytkownik jest zalogowany, aktualizujemy koszyk w Firestore
    if(authStore.isLoggedIn&&authStore.user?.id&&isSynced.value) {
      try {
        const db=getFirestore();
        const cartRef=doc(db, 'users', authStore.user.id, 'cart', 'current');

        await updateDoc(cartRef, {
          items: items.value,
          updatedAt: serverTimestamp()
        });
      } catch(err) {
        console.error('Error updating cart in Firestore:', err);
      }
    }
  }

  // Usunięcie przedmiotu z koszyka
  async function removeItem (itemId: string) {
    const itemToRemove=items.value.find(item => item.id===itemId);
    items.value=items.value.filter(item => item.id!==itemId);

    // Powiadom inne karty o zmianie w koszyku
    cartBus.emit({ type: 'sync', payload: items.value });

    // Jeśli użytkownik jest zalogowany, aktualizujemy koszyk w Firestore
    if(authStore.isLoggedIn&&authStore.user?.id&&isSynced.value&&itemToRemove) {
      try {
        const db=getFirestore();
        const cartRef=doc(db, 'users', authStore.user.id, 'cart', 'current');

        await updateDoc(cartRef, {
          items: items.value,
          updatedAt: serverTimestamp()
        });
      } catch(err) {
        console.error('Error updating cart in Firestore:', err);
      }
    }
  }

  // Aktualizacja ilości przedmiotu
  async function updateQuantity (itemId: string, quantity: number) {
    const item=items.value.find(item => item.id===itemId);
    if(item) {
      item.quantity=Math.max(1, quantity);

      // Powiadom inne karty o zmianie w koszyku
      cartBus.emit({ type: 'sync', payload: items.value });

      // Jeśli użytkownik jest zalogowany, aktualizujemy koszyk w Firestore
      if(authStore.isLoggedIn&&authStore.user?.id&&isSynced.value) {
        try {
          const db=getFirestore();
          const cartRef=doc(db, 'users', authStore.user.id, 'cart', 'current');

          await updateDoc(cartRef, {
            items: items.value,
            updatedAt: serverTimestamp()
          });
        } catch(err) {
          console.error('Error updating cart in Firestore:', err);
        }
      }
    }
  }

  // Wyczyszczenie koszyka
  async function clearCart () {
    items.value=[];
    appliedCoupon.value=null;

    // Powiadom inne karty o zmianie w koszyku
    cartBus.emit({ type: 'sync', payload: items.value });

    // Jeśli użytkownik jest zalogowany, usuwamy koszyk w Firestore
    if(authStore.isLoggedIn&&authStore.user?.id&&isSynced.value) {
      try {
        const db=getFirestore();
        const cartRef=doc(db, 'users', authStore.user.id, 'cart', 'current');

        await setDoc(cartRef, {
          items: [],
          coupon: null,
          updatedAt: serverTimestamp()
        });
      } catch(err) {
        console.error('Error clearing cart in Firestore:', err);
      }
    }
  }

  // Zastosowanie kuponu
  async function applyCoupon (code: string) {
    if(!code) return;

    // Jeśli ten sam kod kuponu jest już zastosowany, nie rób nic
    if(appliedCoupon.value&&appliedCoupon.value.code===code) {
      return;
    }

    error.value='';
    loading.value=true;

    try {
      const db=getFirestore();

      // Sprawdź czy kupon istnieje i jest aktywny
      const couponRef=doc(db, 'coupons', code);
      const couponDoc=await getDoc(couponRef);

      if(!couponDoc.exists()) {
        error.value='Kupon nie istnieje';
        return;
      }

      const couponData=couponDoc.data();

      // Sprawdź czy kupon jest aktywny
      if(!couponData.active) {
        error.value='Kupon nie jest aktywny';
        return;
      }

      // Sprawdź datę ważności
      if(couponData.expirationDate&&couponData.expirationDate.toDate()<new Date()) {
        error.value='Kupon wygasł';
        return;
      }

      // Sprawdź limity użycia
      if(couponData.usageLimit&&couponData.usageCount>=couponData.usageLimit) {
        error.value='Limit użyć kuponu został osiągnięty';
        return;
      }

      // Sprawdź czy użytkownik nie wykorzystał już tego kuponu (jeśli jest zalogowany)
      if(authStore.isLoggedIn&&couponData.oneTimePerUser) {
        const userCouponRef=doc(db, 'users', authStore.user.id, 'coupons', code);
        const userCouponDoc=await getDoc(userCouponRef);

        if(userCouponDoc.exists()) {
          error.value='Już wykorzystałeś ten kupon';
          return;
        }
      }

      // Zapisz zastosowany kupon
      appliedCoupon.value={
        code,
        discount: couponData.discount,
        type: couponData.type,
        minCartValue: couponData.minCartValue||0
      };

      // Jeśli użytkownik jest zalogowany, zaktualizuj koszyk w Firestore
      if(authStore.isLoggedIn) {
        const cartRef=doc(db, 'users', authStore.user.id, 'cart', 'current');
        await updateDoc(cartRef, {
          coupon: appliedCoupon.value,
          updatedAt: serverTimestamp()
        });

        // Zapisz informację o wykorzystaniu kuponu przez użytkownika
        if(couponData.oneTimePerUser) {
          const userCouponRef=doc(db, 'users', authStore.user.id, 'coupons', code);
          await setDoc(userCouponRef, {
            usedAt: serverTimestamp()
          });
        }

        // Zwiększ licznik użyć kuponu
        await updateDoc(couponRef, {
          usageCount: increment(1)
        });
      }

      // Po pomyślnym zastosowaniu kuponu, wyczyść błąd
      error.value='';

      // Emituj zdarzenie aktualizacji koszyka
      cartBus.emit('update');
    } catch(err) {
      console.error('Error applying coupon:', err);
      error.value='Wystąpił błąd podczas stosowania kuponu';
    } finally {
      loading.value=false;
    }
  }

  // Usunięcie kuponu
  async function removeCoupon () {
    appliedCoupon.value=null;

    // Jeśli użytkownik jest zalogowany, aktualizujemy kupon w Firestore
    if(authStore.isLoggedIn&&authStore.user?.id&&isSynced.value) {
      try {
        const db=getFirestore();
        const cartRef=doc(db, 'users', authStore.user.id, 'cart', 'current');

        await updateDoc(cartRef, {
          coupon: null,
          updatedAt: serverTimestamp()
        });
      } catch(err) {
        console.error('Error removing coupon in Firestore:', err);
      }
    }
  }

  // Inicjalizacja koszyka
  async function initCart () {
    // Jeśli użytkownik jest zalogowany, synchronizujemy koszyk z Firestore
    if(authStore.isLoggedIn&&authStore.user?.id) {
      await syncCartWithFirestore();
    }

    // Inicjalizacja kuponów
    await initCoupons();
  }

  // Obserwujemy zmiany stanu logowania
  watch(() => authStore.isLoggedIn, async (isLoggedIn) => {
    if(isLoggedIn&&authStore.user?.id) {
      isSynced.value=false;
      await syncCartWithFirestore();
    } else {
      isSynced.value=false;
    }
  });

  return {
    items,
    loading,
    error,
    appliedCoupon,
    currentCouponDisplay,
    cartTotal,
    cartCount,
    discountValue,
    getItemById,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    nextCouponDisplay,
    initCart,
    syncCartWithFirestore
  };
});
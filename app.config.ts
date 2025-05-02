export default defineAppConfig({
  // Podstawowa konfiguracja UI aplikacji
  ui: {
    // Główna paleta kolorów dla aplikacji - jaśniejsze barwy
    primary: '#4da6ff', // Jasny niebieski - główny kolor marki
    secondary: '#7bc86c', // Jasny zielony - uzupełniający kolor

    // Konfiguracja dla poszczególnych komponentów UI
    button: {
      default: {
        color: 'primary',
        variant: 'solid',
        size: 'md',
        rounded: 'md'
      }
    },
    card: {
      rounded: 'lg',
      shadow: 'md',
      body: {
        padding: 'lg'
      }
    },
    badge: {
      default: {
        color: 'primary',
        variant: 'solid',
        size: 'sm',
        rounded: 'full'
      }
    },
    input: {
      default: {
        size: 'md',
        rounded: 'md',
        color: 'primary'
      }
    },
    modal: {
      backdrop: 'blur',
      transition: {
        enterActiveClass: 'transition duration-200 ease-out',
        enterFromClass: 'opacity-0 scale-95',
        leaveActiveClass: 'transition duration-100 ease-in',
        leaveToClass: 'opacity-0 scale-95'
      }
    },
    alert: {
      default: {
        color: 'primary',
        variant: 'soft',
        icon: true,
        closable: true
      }
    }
  },

  // Konfiguracja PWA
  pwa: {
    name: 'Lutkowo',
    theme_color: '#4da6ff', // Zgodny z kolorem primary
    background_color: '#ffffff'
  },

  // Ustawienia produktu/sklepu
  product: {
    imagesPerProduct: 5, // Maksymalna liczba zdjęć na produkt
    categoriesInNav: ['ceramika', 'szkło', 'glina', 'makramy'], // Kategorie pokazywane w nawigacji
  },

  // Ustawienia dostępności (a11y)
  a11y: {
    highContrast: false, // Domyślnie wyłączony wysoki kontrast
    reduceMotion: false, // Domyślnie włączone animacje
    fontSize: 'md', // Domyślny rozmiar czcionki
    focusVisible: true // Wyraźny focus dla elementów interaktywnych
  },

  // Ustawienia kontaktu i adresu
  contact: {
    email: 'kontakt@lutkowo.pl',
    phone: '+48 123 456 789',
    address: 'ul. Przykładowa 1, 00-001 Warszawa',
    socialMedia: {
      facebook: 'https://facebook.com/lutkowo',
      instagram: 'https://instagram.com/lutkowo'
    }
  },

  // Ustawienia prawne
  legal: {
    companyName: 'Lutkowo Sp. z o.o.',
    vatId: 'PL1234567890',
    regon: '123456789'
  }
});
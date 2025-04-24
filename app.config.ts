export default defineAppConfig({
  ui: {
    // Globalne klasy dla wszystkich komponentów
    strategy: 'override',

    // Konfiguracja dla konkretnych komponentów
    button: {
      default: {
        size: 'md',
        color: 'primary',
        variant: 'solid',
        rounded: 'md',
        class: 'font-medium'
      },
      variants: {
        rounded: {
          'none': 'rounded-none',
          'sm': 'rounded-sm',
          'md': 'rounded-md',
          'lg': 'rounded-lg',
          'xl': 'rounded-xl',
          'full': 'rounded-full'
        }
      }
    },

    card: {
      base: 'overflow-hidden',
      background: 'bg-white dark:bg-gray-900',
      rounded: 'rounded-lg',
      shadow: 'shadow-sm',
      body: {
        base: 'p-4',
        padding: {
          sm: 'p-2',
          md: 'p-4',
          lg: 'p-6'
        }
      },
      header: {
        base: 'p-4 border-b border-gray-200 dark:border-gray-800',
        padding: {
          sm: 'p-2 px-4',
          md: 'p-4',
          lg: 'p-6'
        }
      },
      footer: {
        base: 'p-4 border-t border-gray-200 dark:border-gray-800',
        padding: {
          sm: 'p-2 px-4',
          md: 'p-4',
          lg: 'p-6'
        }
      }
    },

    input: {
      default: {
        size: 'md',
        color: 'primary'
      },
      variants: {
        size: {
          '2xs': 'text-xs',
          'xs': 'text-xs',
          'sm': 'text-sm',
          'md': 'text-sm',
          'lg': 'text-base',
          'xl': 'text-base'
        }
      }
    },

    select: {
      default: {
        size: 'md',
        color: 'primary'
      }
    },

    textarea: {
      default: {
        size: 'md',
        color: 'primary'
      }
    },

    notification: {
      default: {
        color: 'primary'
      }
    },

    alert: {
      default: {
        color: 'primary'
      }
    },

    // Dostosowanie nawigacji i layoutu
    page: {
      base: 'min-h-[100vh] flex flex-col',
      padding: 'px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8'
    },

    container: {
      base: 'mx-auto w-full',
      padding: 'px-4 sm:px-6 lg:px-8',
      constrained: 'max-w-7xl'
    },

    // Menu i nawigacja
    dropdown: {
      width: 'w-48',
      background: 'bg-white dark:bg-gray-900',
      shadow: 'shadow-lg',
      rounded: 'rounded-md',
      ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
      base: 'relative z-10 focus:outline-none overflow-hidden',
      item: {
        base: 'group flex items-center gap-2 w-full',
        padding: 'px-3 py-2',
        size: 'text-sm',
        active: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white',
        inactive: 'text-gray-700 dark:text-gray-200',
        hover: 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
        icon: {
          base: 'flex-shrink-0 h-4 w-4',
          active: 'text-primary-500 dark:text-primary-400',
          inactive: 'text-gray-500 dark:text-gray-400'
        },
        avatar: {
          base: 'flex-shrink-0',
          size: '3xs'
        },
        label: 'truncate',
        shortcuts: 'hidden md:inline-flex flex-shrink-0 gap-0.5 ml-auto',
        disabled: 'cursor-not-allowed opacity-50'
      }
    }
  }
});
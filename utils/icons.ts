/**
 * Konfiguracja ikon używanych w aplikacji.
 * Heroicons powinny być używane z prefiksem i-heroicons- 
 * np. i-heroicons-hand-raised zamiast heroicons:hand
 */

export const ICON_PREFIXES = {
  HEROICONS: 'i-heroicons-',
  MDI: 'i-mdi-',
  TWEMOJI: 'i-twemoji-'
};

// Funkcja pomocnicza do konwersji starego formatu ikon na nowy format
export function convertIconName(name: string): string {
  // Zamiana heroicons:hand na i-heroicons-hand
  if (name.startsWith('heroicons:')) {
    return `i-heroicons-${name.split(':')[1]}`;
  }
  
  // Zamiana mdi:icon na i-mdi-icon
  if (name.startsWith('mdi:')) {
    return `i-mdi-${name.split(':')[1]}`;
  }
  
  // Zamiana twemoji:icon na i-twemoji-icon
  if (name.startsWith('twemoji:')) {
    return `i-twemoji-${name.split(':')[1]}`;
  }
  
  return name;
}
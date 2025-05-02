<template>
  <Transition name="slide-up">
    <div v-if="showInstallPrompt" class="pwa-install-prompt">
      <div class="prompt-content">
        <div class="prompt-header">
          <UIcon name="i-heroicons-sparkles" class="prompt-icon" />
          <h3>{{ $t('pwa.installTitle') }}</h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark"
            size="sm"
            class="close-button"
            @click="dismissPrompt"
          />
        </div>
        <div class="prompt-body">
          <p>{{ $t('pwa.installText') }}</p>
          <div class="prompt-actions">
            <UButton
              color="primary"
              variant="solid"
              class="install-button"
              @click="installPWA"
            >
              {{ $t('pwa.installButton') }}
            </UButton>
            <UButton
              color="gray"
              variant="outline"
              class="not-now-button"
              @click="dismissPrompt"
            >
              {{ $t('pwa.notNowButton') }}
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Stan wyświetlania monitu instalacji
const showInstallPrompt = ref(false);

// Przechowuje zdarzenie instalacji PWA
let deferredPrompt: any = null;

// Nasłuchuj zdarzenia beforeinstallprompt
const handleBeforeInstallPrompt = (e: Event) => {
  // Zapobiegaj automatycznemu wyświetlaniu monitu
  e.preventDefault();
  
  // Zapisz zdarzenie do późniejszego użycia
  deferredPrompt = e;
  
  // Sprawdź, czy użytkownik nie odrzucił już monitu
  const promptDismissed = localStorage.getItem('lutkowo-pwa-prompt-dismissed');
  if (!promptDismissed) {
    // Opóźnij wyświetlenie monitu o 5 sekund, aby nie przeszkadzać w pierwszym wrażeniu
    setTimeout(() => {
      showInstallPrompt.value = true;
    }, 5000);
  }
};

// Funkcja instalacji PWA
const installPWA = async () => {
  if (!deferredPrompt) {
    return;
  }
  
  // Pokaż natywny prompt instalacji
  deferredPrompt.prompt();
  
  // Czekaj na decyzję użytkownika
  const { outcome } = await deferredPrompt.userChoice;
  
  // Wyczyść zapisane zdarzenie
  deferredPrompt = null;
  
  // Ukryj nasz własny prompt
  showInstallPrompt.value = false;
  
  // Zapisz informację o wyniku
  if (outcome === 'accepted') {
    localStorage.setItem('lutkowo-pwa-installed', 'true');
  }
};

// Funkcja odrzucenia monitu
const dismissPrompt = () => {
  showInstallPrompt.value = false;
  
  // Zapisz informację w localStorage, aby nie pokazywać monitu ponownie przez 7 dni
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);
  localStorage.setItem('lutkowo-pwa-prompt-dismissed', expiryDate.toISOString());
};

// Sprawdź, czy monit powinien być wyświetlony
const checkPromptDismissalStatus = () => {
  const promptDismissed = localStorage.getItem('lutkowo-pwa-prompt-dismissed');
  
  if (promptDismissed) {
    const dismissalDate = new Date(promptDismissed);
    const now = new Date();
    
    // Jeśli upłynęło 7 dni od odrzucenia, usuń zapisaną preferencję
    if (now > dismissalDate) {
      localStorage.removeItem('lutkowo-pwa-prompt-dismissed');
      return false;
    }
    return true;
  }
  return false;
};

// Podłącz zdarzenia przy montowaniu komponentu
onMounted(() => {
  // Sprawdź, czy aplikacja nie jest już zainstalowana
  const isPWAInstalled = localStorage.getItem('lutkowo-pwa-installed') || 
                         window.matchMedia('(display-mode: standalone)').matches;
  
  if (!isPWAInstalled && !checkPromptDismissalStatus()) {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }
});

// Odłącz zdarzenia przy odmontowywaniu komponentu
onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
});
</script>

<style scoped>
.pwa-install-prompt {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  max-width: 600px;
  margin: 0 auto;
}

.prompt-content {
  padding: 1.5rem;
}

.prompt-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
}

.prompt-icon {
  color: #4da6ff;
  width: 24px;
  height: 24px;
  margin-right: 0.75rem;
}

.prompt-header h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  flex-grow: 1;
}

.close-button {
  position: absolute;
  right: 0;
  top: 0;
}

.prompt-body p {
  margin-bottom: 1.5rem;
  color: #555;
}

.prompt-actions {
  display: flex;
  gap: 1rem;
}

.install-button {
  flex-grow: 1;
}

/* Animacja pojawienia się monitu */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>

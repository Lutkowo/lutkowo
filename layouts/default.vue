<template>
  <div class="layout">
    <!-- Nagłówek -->
    <header class="header">
      <UContainer class="header-container">
        <!-- Logo i nawigacja -->
        <div class="header-content">
          <NuxtLink to="/" class="logo">
            <span class="logo-text">Lutkowo</span>
          </NuxtLink>

          <!-- Nawigacja desktopowa -->
          <nav class="nav-desktop">
            <ul class="nav-links">
              <li v-for="item in navigationItems" :key="item.path">
                <NuxtLink :to="item.path" class="nav-link">
                  {{ $t(item.i18nKey) }}
                </NuxtLink>
              </li>
            </ul>
          </nav>

          <!-- Przyciski akcji -->
          <div class="nav-actions">
            <!-- Wybór języka -->
            <UDropdown :items="languageItems">
              <UButton
                color="gray"
                variant="ghost"
                icon="i-heroicons-language"
                class="language-switcher"
              >
                {{ currentLanguageLabel }}
              </UButton>
            </UDropdown>

            <!-- Przycisk logowania -->
            <UButton to="/login" color="gray" variant="ghost" icon="i-heroicons-user">
              {{ $t("nav.login") }}
            </UButton>

            <!-- Przycisk hamburgera na mobile -->
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-bars-3"
              class="menu-button"
              @click="toggleMobileMenu"
            />
          </div>
        </div>

        <!-- Menu mobilne -->
        <Transition name="slide-down">
          <nav v-if="mobileMenuOpen" class="nav-mobile">
            <ul class="mobile-nav-links">
              <li v-for="item in navigationItems" :key="item.path">
                <NuxtLink :to="item.path" class="mobile-nav-link" @click="closeMobileMenu">
                  {{ $t(item.i18nKey) }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/login" class="mobile-nav-link" @click="closeMobileMenu">
                  {{ $t("nav.login") }}
                </NuxtLink>
              </li>
              <li class="language-selector">
                <div class="language-options">
                  <span class="language-label">{{ $t("common.language") }}:</span>
                  <UButton
                    v-for="lang in availableLanguages"
                    :key="lang.code"
                    size="sm"
                    :color="lang.code === locale ? 'primary' : 'gray'"
                    :variant="lang.code === locale ? 'solid' : 'ghost'"
                    class="language-button"
                    @click="switchLanguage(lang.code)"
                  >
                    {{ lang.name }}
                  </UButton>
                </div>
              </li>
            </ul>
          </nav>
        </Transition>
      </UContainer>
    </header>

    <!-- Główna zawartość strony -->
    <main class="main-content">
      <slot />
    </main>

    <!-- Stopka -->
    <footer class="footer">
      <UContainer>
        <div class="footer-content">
          <!-- O Lutkowo -->
          <div class="footer-section">
            <h3 class="footer-heading">{{ $t("footer.about") }}</h3>
            <p class="footer-text">{{ $t("footer.aboutText") }}</p>
            <div class="social-links">
              <UButton
                v-for="social in socialLinks"
                :key="social.name"
                :icon="social.icon"
                color="white"
                variant="ghost"
                size="sm"
                :title="social.name"
                class="social-button"
                square
              />
            </div>
          </div>

          <!-- Szybkie linki -->
          <div class="footer-section">
            <h3 class="footer-heading">{{ $t("footer.quickLinks") }}</h3>
            <ul class="footer-links">
              <li v-for="item in navigationItems" :key="item.path">
                <NuxtLink :to="item.path" class="footer-link">
                  {{ $t(item.i18nKey) }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/privacy" class="footer-link">
                  {{ $t("common.privacyPolicy") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/terms" class="footer-link">
                  {{ $t("common.terms") }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Kontakt -->
          <div class="footer-section">
            <h3 class="footer-heading">{{ $t("footer.contact") }}</h3>
            <ul class="contact-info">
              <li class="contact-item">
                <UIcon name="i-heroicons-envelope" class="contact-icon" />
                <span
                  >{{ $t("footer.contactEmail") }}
                  <a href="mailto:kontakt@lutkowo.com" class="contact-link"
                    >kontakt@lutkowo.com</a
                  ></span
                >
              </li>
              <li class="contact-item">
                <UIcon name="i-heroicons-phone" class="contact-icon" />
                <span
                  >{{ $t("footer.contactPhone") }}
                  <a href="tel:+48123456789" class="contact-link">+48 123 456 789</a></span
                >
              </li>
              <li class="contact-item">
                <UIcon name="i-heroicons-map-pin" class="contact-icon" />
                <span>{{ $t("footer.contactAddress") }} ul. Ceramiczna 42, 00-001 Warszawa</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="copyright">
          <p>{{ $t("footer.rights") }}</p>
        </div>
      </UContainer>

      <!-- Komponent instalacji PWA -->
      <PWAInstallPrompt />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useHead } from "@unhead/vue";
import { useSeoMeta } from "#imports";

const { t, locale } = useI18n();

// Stan menu mobilnego
const mobileMenuOpen = ref(false);

// Elementy nawigacji
const navigationItems = [
  { path: "/", i18nKey: "nav.home" },
  { path: "/products", i18nKey: "nav.products" },
  { path: "/about", i18nKey: "nav.about" },
  { path: "/contact", i18nKey: "nav.contact" },
];

// Obsługa menu mobilnego
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;

  // Zablokuj scrollowanie strony gdy menu jest otwarte
  if (mobileMenuOpen.value) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  document.body.style.overflow = "";
};

// Dostępne języki
const availableLanguages = [
  { code: "pl", name: "PL" },
  { code: "en", name: "EN" },
];

// Aktualna etykieta języka
const currentLanguageLabel = computed(() => {
  return locale.value.toUpperCase();
});

// Elementy rozwijanej listy języków
const languageItems = computed(() => {
  return availableLanguages.map((lang) => ({
    label: lang.name,
    click: () => switchLanguage(lang.code),
    active: lang.code === locale.value,
  }));
});

// Zmiana języka
const switchLanguage = (langCode: string) => {
  locale.value = langCode;
  closeMobileMenu();

  // Zapisz preferencję języka w localStorage
  localStorage.setItem("lutkowo-lang", langCode);
};

// Linki social media
const socialLinks = [
  { name: "Facebook", icon: "i-heroicons-bolt", url: "#" },
  { name: "Instagram", icon: "i-heroicons-camera", url: "#" },
  { name: "Pinterest", icon: "i-heroicons-photo", url: "#" },
];

// Domyślny tytuł i opis dla wszystkich stron
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} | Lutkowo` : "Lutkowo";
  },
});

// SEO meta dane dla wszystkich stron
useSeoMeta({
  ogSiteName: "Lutkowo",
  twitterCard: "summary_large_image",
});

// Ustaw język z localStorage przy uruchomieniu
onMounted(() => {
  const savedLang = localStorage.getItem("lutkowo-lang");
  if (savedLang && availableLanguages.some((lang) => lang.code === savedLang)) {
    locale.value = savedLang;
  }

  // Obsługa zamknięcia menu mobilnego przy zmianie rozmiaru ekranu
  const handleResize = () => {
    if (window.innerWidth > 768 && mobileMenuOpen.value) {
      closeMobileMenu();
    }
  };

  window.addEventListener("resize", handleResize);

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
});
</script>

<style scoped>
/* Układ strony */
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}

/* Nagłówek */
.header {
  position: sticky;
  top: 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.header-container {
  position: relative;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  color: #4da6ff;
}

/* Nawigacja desktopowa */
.nav-desktop {
  display: none;
}

.nav-links {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 2rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
  position: relative;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #4da6ff;
}

.nav-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #4da6ff;
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

/* Akcje nawigacji */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Przycisk menu mobilnego */
.menu-button {
  display: block;
}

/* Menu mobilne */
.nav-mobile {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 99;
}

.mobile-nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-nav-link {
  display: block;
  padding: 1rem;
  color: #333;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid #eee;
  transition: color 0.3s ease;
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  color: #4da6ff;
}

/* Selektor języka w menu mobilnym */
.language-selector {
  padding: 1rem;
}

.language-options {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.language-label {
  margin-right: 0.5rem;
}

/* Animacja wysuwania menu */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease-out;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Footer */
.footer {
  background-color: #333;
  color: white;
  padding: 3rem 0 1.5rem;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-heading {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.footer-text {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #ccc;
}

.footer-links,
.contact-info {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  color: #ccc;
  text-decoration: none;
  display: block;
  padding: 0.5rem 0;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #4da6ff;
}

/* Social media links */
.social-links {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.social-button {
  border-radius: 50%;
}

/* Contact info */
.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #ccc;
}

.contact-icon {
  width: 20px;
  height: 20px;
  margin-top: 3px;
}

.contact-link {
  color: #4da6ff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #7fbfff;
  text-decoration: underline;
}

/* Copyright */
.copyright {
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #999;
}

/* Media queries dla responsywności */
@media (min-width: 768px) {
  .nav-desktop {
    display: block;
  }

  .menu-button {
    display: none;
  }

  .footer-content {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
}

@media (max-width: 767px) {
  .header-content {
    padding: 0.75rem 0;
  }

  .nav-actions {
    gap: 0.5rem;
  }

  .language-switcher {
    display: none;
  }
}
</style>

<!-- Potrzebny import onMounted i onUnmounted -->
<script>
import { onMounted, onUnmounted } from "vue";
</script>

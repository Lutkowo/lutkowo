<template>
  <div class="home-page">
    <!-- Sekcja Hero -->
    <section class="hero-section">
      <UContainer>
        <div class="hero-content">
          <h1 class="hero-title">{{ $t("home.hero.title") }}</h1>
          <p class="hero-description">{{ $t("home.hero.description") }}</p>
          <div class="hero-buttons">
            <UButton size="lg" color="primary" :to="'/products'" icon="i-heroicons-shopping-bag">
              {{ $t("home.hero.shopButton") }}
            </UButton>
            <UButton
              size="lg"
              color="gray"
              variant="outline"
              :to="'/about'"
              icon="i-heroicons-information-circle"
            >
              {{ $t("home.hero.aboutButton") }}
            </UButton>
          </div>
        </div>
        <div class="hero-image">
          <!-- Zastępczy obraz - w przyszłości zastąpić właściwym -->
          <UImage
            src="/images/hero-placeholder.jpg"
            alt="Lutkowo - Ręcznie wykonane produkty"
            width="600"
            height="400"
            loading="eager"
            placeholder
            class="rounded-lg shadow-lg"
          />
        </div>
      </UContainer>
    </section>

    <!-- Sekcja Kategorie -->
    <section class="categories-section">
      <UContainer>
        <h2 class="section-title">{{ $t("home.categories.title") }}</h2>
        <div class="categories-grid">
          <UCard
            v-for="(category, index) in categories"
            :key="index"
            class="category-card"
            :to="`/products?category=${category.id}`"
          >
            <template #header>
              <UImage
                :src="category.image"
                :alt="$t(`categories.${category.id}`)"
                width="300"
                height="200"
                loading="lazy"
                placeholder
                class="category-image"
              />
            </template>
            <template #footer>
              <h3 class="category-title">{{ $t(`categories.${category.id}`) }}</h3>
            </template>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Sekcja Wyróżnione Produkty -->
    <section class="featured-section">
      <UContainer>
        <div class="section-header">
          <h2 class="section-title">{{ $t("home.featured.title") }}</h2>
          <UButton
            color="primary"
            variant="ghost"
            :to="'/products'"
            icon="i-heroicons-arrow-right"
            iconRight
          >
            {{ $t("home.featured.viewAll") }}
          </UButton>
        </div>
        <div class="products-grid">
          <UCard
            v-for="(product, index) in featuredProducts"
            :key="index"
            class="product-card"
            :to="`/products/${product.id}`"
          >
            <template #header>
              <div class="product-image-container">
                <UImage
                  :src="product.image"
                  :alt="product.name"
                  width="300"
                  height="300"
                  loading="lazy"
                  placeholder
                  class="product-image"
                />
                <UBadge v-if="product.featured" color="amber" class="featured-badge">
                  {{ $t("product.featured") }}
                </UBadge>
              </div>
            </template>
            <template #default>
              <h3 class="product-title">{{ product.name }}</h3>
              <p class="product-price">{{ formatPrice(product.price) }} zł</p>
            </template>
            <template #footer>
              <UButton color="primary" block icon="i-heroicons-shopping-cart">
                {{ $t("product.addToCart") }}
              </UButton>
            </template>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Sekcja O Nas -->
    <section class="about-section">
      <UContainer>
        <div class="about-content">
          <div class="about-text">
            <h2 class="section-title">{{ $t("home.about.title") }}</h2>
            <p class="about-description">{{ $t("home.about.description1") }}</p>
            <p class="about-description">{{ $t("home.about.description2") }}</p>
            <UButton
              color="primary"
              variant="outline"
              :to="'/about'"
              icon="i-heroicons-arrow-right"
              iconRight
            >
              {{ $t("home.about.button") }}
            </UButton>
          </div>
          <div class="about-image">
            <UImage
              src="/images/about-placeholder.jpg"
              alt="O Lutkowo"
              width="500"
              height="350"
              loading="lazy"
              placeholder
              class="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Sekcja Testimonials -->
    <section class="testimonials-section">
      <UContainer>
        <h2 class="section-title">{{ $t("home.testimonials.title") }}</h2>
        <div class="testimonials-grid">
          <UCard
            v-for="(testimonial, index) in testimonials"
            :key="index"
            class="testimonial-card"
            padding="lg"
          >
            <div class="testimonial-content">
              <UIcon name="i-heroicons-chat-bubble-left-right" class="testimonial-icon" />
              <p class="testimonial-text">"{{ testimonial.text }}"</p>
              <div class="testimonial-author">
                <strong>{{ testimonial.author }}</strong>
              </div>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Sekcja Newsletter -->
    <section class="newsletter-section">
      <UContainer>
        <div class="newsletter-container">
          <h2 class="section-title">{{ $t("home.newsletter.title") }}</h2>
          <p class="newsletter-description">{{ $t("home.newsletter.description") }}</p>
          <form @submit.prevent="subscribeToNewsletter" class="newsletter-form">
            <UFormGroup class="newsletter-input-group">
              <UInput
                v-model="newsletterEmail"
                type="email"
                :placeholder="$t('home.newsletter.placeholder')"
                icon="i-heroicons-envelope"
                required
                class="newsletter-input"
              />
            </UFormGroup>
            <UButton
              type="submit"
              color="primary"
              :loading="isSubscribing"
              class="newsletter-button"
            >
              {{ $t("home.newsletter.button") }}
            </UButton>
          </form>
          <UAlert
            v-if="showNewsletterSuccess"
            color="green"
            variant="soft"
            icon="i-heroicons-check-circle"
            :title="$t('home.newsletter.success')"
            class="newsletter-alert"
          />
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useSeoMeta } from "@unhead/vue";

const { t, locale } = useI18n();

// SEO meta tagi
useSeoMeta({
  title: () => t("site.title"),
  ogTitle: () => t("site.title"),
  description: () => t("site.description"),
  ogDescription: () => t("site.description"),
  ogImage: "/images/og-image.jpg",
});

// Dane kategorii (mock data)
const categories = [
  {
    id: "ceramics",
    image: "/images/categories/ceramics.jpg",
  },
  {
    id: "glass",
    image: "/images/categories/glass.jpg",
  },
  {
    id: "macrame",
    image: "/images/categories/macrame.jpg",
  },
  {
    id: "textiles",
    image: "/images/categories/textiles.jpg",
  },
];

// Dane wyróżnionych produktów (mock data)
const featuredProducts = [
  {
    id: "1",
    name: "Ceramiczny wazon",
    price: 120,
    image: "/images/products/vase-1.jpg",
    featured: true,
  },
  {
    id: "2",
    name: "Szklana miseczka",
    price: 75,
    image: "/images/products/bowl-1.jpg",
    featured: false,
  },
  {
    id: "3",
    name: "Makrama ścienna",
    price: 150,
    image: "/images/products/macrame-1.jpg",
    featured: true,
  },
  {
    id: "4",
    name: "Lniany obrus",
    price: 95,
    image: "/images/products/tablecloth-1.jpg",
    featured: false,
  },
];

// Dane testimonials (mock data)
const testimonials = [
  {
    author: "Anna K.",
    text: "Zakupiłam ceramiczny wazon i jest piękny! Widać dbałość o szczegóły i miłość do rzemiosła.",
  },
  {
    author: "Piotr M.",
    text: "Makrama, którą kupiłem mojej żonie na urodziny, stała się centralnym punktem naszego salonu. Jakość wykonania jest doskonała.",
  },
  {
    author: "Joanna T.",
    text: "Obsługa klienta jest na najwyższym poziomie, a produkty zachwycają jakością. Polecam wszystkim miłośnikom rękodzieła!",
  },
];

// Newsletter
const newsletterEmail = ref("");
const isSubscribing = ref(false);
const showNewsletterSuccess = ref(false);

// Funkcja pomocnicza do formatowania ceny
const formatPrice = (price: number) => {
  return price.toFixed(2);
};

// Funkcja do obsługi newslettera
const subscribeToNewsletter = async () => {
  isSubscribing.value = true;

  // Tutaj w przyszłości będzie integracja z Firebase
  await new Promise((resolve) => setTimeout(resolve, 1000));

  isSubscribing.value = false;
  showNewsletterSuccess.value = true;
  newsletterEmail.value = "";

  // Ukryj komunikat po 5 sekundach
  setTimeout(() => {
    showNewsletterSuccess.value = false;
  }, 5000);
};
</script>

<style scoped>
.home-page {
  padding-bottom: 4rem;
}

/* Hero Section */
.hero-section {
  padding: 4rem 0;
  background-color: #f8f9fa;
}

.hero-content {
  max-width: 600px;
  margin-bottom: 2rem;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
}

.hero-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #555;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Categories Section */
.categories-section {
  padding: 4rem 0;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: #333;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.category-card {
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.category-title {
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
}

/* Featured Products Section */
.featured-section {
  padding: 4rem 0;
  background-color: #f8f9fa;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image-container {
  position: relative;
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.featured-badge {
  position: absolute;
  top: 10px;
  right: 10px;
}

.product-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #4da6ff;
}

/* About Section */
.about-section {
  padding: 4rem 0;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.about-text {
  flex: 1;
  min-width: 300px;
}

.about-image {
  flex: 1;
  min-width: 300px;
}

.about-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #555;
}

/* Testimonials Section */
.testimonials-section {
  padding: 4rem 0;
  background-color: #f8f9fa;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  height: 100%;
}

.testimonial-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.testimonial-icon {
  font-size: 2rem;
  color: #4da6ff;
  margin-bottom: 1rem;
}

.testimonial-text {
  font-style: italic;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.testimonial-author {
  align-self: flex-end;
}

/* Newsletter Section */
.newsletter-section {
  padding: 4rem 0;
}

.newsletter-container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.newsletter-description {
  margin-bottom: 2rem;
  color: #555;
}

.newsletter-form {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.newsletter-input-group {
  flex: 1;
  min-width: 200px;
}

.newsletter-alert {
  margin-top: 2rem;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .hero-section {
    padding: 3rem 0;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-description {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .about-content {
    flex-direction: column;
  }

  .newsletter-form {
    flex-direction: column;
  }

  .newsletter-button {
    width: 100%;
  }
}
</style>

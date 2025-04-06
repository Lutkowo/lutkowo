<template>
  <div>
    <!-- Hero Section -->
    <v-parallax src="/images/hero-bg.jpg" height="500">
      <div class="d-flex flex-column fill-height justify-center align-center text-center">
        <h1 class="text-h2 font-weight-bold mb-4">{{ $t('home.title') }}</h1>
        <h2 class="text-h5 mb-6">{{ $t('home.subtitle') }}</h2>
        <v-btn color="secondary" size="large" to="/shop">
          {{ $t('home.shopNow') }}
        </v-btn>
      </div>
    </v-parallax>
    
    <!-- Featured Products -->
    <v-container class="my-8">
      <h2 class="text-h4 text-center mb-6">{{ $t('home.featuredProducts') }}</h2>
      
      <v-row v-if="loading">
        <v-col v-for="i in 4" :key="i" cols="12" sm="6" md="3">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </v-row>
      
      <v-row v-else-if="featuredProducts.length">
        <v-col v-for="product in featuredProducts" :key="product.id" cols="12" sm="6" md="3">
          <v-card :to="`/product/${product.id}`" hover>
            <v-img :src="product.images[0]" height="200" cover></v-img>
            <v-card-title>{{ product.name }}</v-card-title>
            <v-card-text>
              <div class="text-h6">{{ product.price }} {{ $t('common.currency') }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      
      <div v-else class="text-center">
        <p>{{ $t('product.noProductsFound') }}</p>
      </div>
      
      <div class="text-center mt-4">
        <v-btn color="primary" to="/shop">
          {{ $t('common.viewAllProducts') }}
        </v-btn>
      </div>
    </v-container>
    
    <!-- Categories Section -->
    <v-container class="my-8">
      <h2 class="text-h4 text-center mb-6">{{ $t('common.categories') }}</h2>
      
      <v-row>
        <v-col v-for="category in categories" :key="category.id" cols="12" sm="6" md="4">
          <v-card :to="`/shop/${category.id}`" hover height="200" class="d-flex align-center justify-center">
            <v-card-title class="text-h5 text-center">{{ category.name }}</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
    <!-- About Section -->
    <v-container class="my-8">
      <v-row align="center">
        <v-col cols="12" md="6">
          <h2 class="text-h4 mb-4">{{ $t('about.aboutUs') }}</h2>
          <p class="text-body-1">
            {{ $t('about.shortDescription') }}
          </p>
          <v-btn color="primary" class="mt-4" to="/about">
            {{ $t('about.readMore') }}
          </v-btn>
        </v-col>
        <v-col cols="12" md="6">
          <v-img src="/images/about.jpg" height="400" cover></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import { useProductsStore } from '~/stores/products'

export default {
  name: 'HomePage',
  
  setup() {
    const productsStore = useProductsStore()
    
    return {
      productsStore
    }
  },
  
  data() {
    return {
      categories: [
        { id: 'ceramics', name: 'Ceramika' },
        { id: 'glass', name: 'Szkło' },
        { id: 'macrame', name: 'Makramy' },
        { id: 'textiles', name: 'Tekstylia' },
        { id: 'wood', name: 'Drewno' }
      ]
    }
  },
  
  computed: {
    loading() {
      return this.productsStore.loading
    },
    
    featuredProducts() {
      return this.productsStore.featuredProducts.slice(0, 4)
    }
  },
  
  async mounted() {
    if (!this.productsStore.products.length) {
      await this.productsStore.fetchProducts()
    }
  }
}
</script>

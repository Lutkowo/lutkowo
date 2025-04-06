<template>
  <div>
    <h1 class="text-h3 mb-6">{{ categoryTitle }}</h1>
    
    <v-row v-if="filteredProducts.length">
      <v-col cols="12" sm="6" md="4" v-for="product in filteredProducts" :key="product.id">
        <v-card class="mb-4">
          <v-img height="200" :src="product.image" cover></v-img>
          <v-card-title>{{ product.name }}</v-card-title>
          <v-card-text>
            <p>{{ product.price }} {{ $t('common.currency') }}</p>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" block>
              {{ $t('product.addToCart') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    
    <v-card v-else class="text-center pa-6">
      <v-icon size="large" class="mb-4">mdi-alert-circle-outline</v-icon>
      <h2 class="text-h5 mb-2">{{ $t('product.noProductsFound') }}</h2>
      <v-btn color="primary" class="mt-4" to="/shop">
        {{ $t('common.backToShop') }}
      </v-btn>
    </v-card>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CategoryPage',
  
  data() {
    return {
      // Sample products data - will be replaced with Firebase data later
      allProducts: [
        {
          id: 1,
          name: 'Ceramiczny wazon',
          price: 120,
          image: '/images/product-placeholder.jpg',
          category: 'ceramics'
        },
        {
          id: 2,
          name: 'Makrama ścienna',
          price: 150,
          image: '/images/product-placeholder.jpg',
          category: 'macrame'
        },
        {
          id: 3,
          name: 'Szklany lampion',
          price: 85,
          image: '/images/product-placeholder.jpg',
          category: 'glass'
        },
        {
          id: 4,
          name: 'Drewniana tacka',
          price: 110,
          image: '/images/product-placeholder.jpg',
          category: 'wood'
        },
        {
          id: 5,
          name: 'Poduszka dekoracyjna',
          price: 95,
          image: '/images/product-placeholder.jpg',
          category: 'textiles'
        }
      ],
      categoryMap: {
        'ceramics': 'Ceramika',
        'glass': 'Szkło',
        'macrame': 'Makramy',
        'textiles': 'Tekstylia',
        'wood': 'Drewno'
      }
    }
  },
  
  computed: {
    category() {
      return this.$route.params.category as string
    },
    
    categoryTitle() {
      return this.categoryMap[this.category] || this.category
    },
    
    filteredProducts() {
      return this.allProducts.filter(product => product.category === this.category)
    }
  }
}
</script>

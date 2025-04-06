<template>
  <div>
    <h1 class="text-h3 mb-6">{{ $t('common.shop') }}</h1>
    
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="(product, index) in products" :key="index">
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
  </div>
</template>

<script lang="ts">
export default {
  name: 'ShopPage',
  
  data() {
    return {
      // Sample products data - will be replaced with Firebase data later
      products: [
        {
          id: 1,
          name: 'Ceramiczny wazon',
          price: 120,
          image: '/images/product-placeholder.jpg'
        },
        {
          id: 2,
          name: 'Makrama ścienna',
          price: 150,
          image: '/images/product-placeholder.jpg'
        },
        {
          id: 3,
          name: 'Szklany lampion',
          price: 85,
          image: '/images/product-placeholder.jpg'
        }
      ]
    }
  }
}
</script>

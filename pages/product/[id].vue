<template>
  <div>
    <div v-if="loading" class="text-center pa-8">
      <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
    </div>
    
    <div v-else-if="!product" class="text-center pa-8">
      <v-icon size="large" class="mb-4">mdi-alert-circle</v-icon>
      <h2 class="text-h5">{{ $t('product.notFound') }}</h2>
      <v-btn color="primary" class="mt-4" to="/shop">
        {{ $t('common.backToShop') }}
      </v-btn>
    </div>
    
    <template v-else>
      <v-breadcrumbs :items="breadcrumbs"></v-breadcrumbs>
      
      <v-row>
        <v-col cols="12" md="6">
          <v-img
            :src="product.image || '/images/product-placeholder.jpg'"
            height="400"
            cover
            class="rounded"
          ></v-img>
        </v-col>
        
        <v-col cols="12" md="6">
          <h1 class="text-h3 mb-2">{{ product.name }}</h1>
          
          <div class="d-flex align-center mb-4">
            <div class="text-h4 mr-4">{{ product.price }} {{ $t('common.currency') }}</div>
            <v-chip v-if="product.available" color="success" class="text-white">{{ $t('product.inStock') }}</v-chip>
            <v-chip v-else color="error" class="text-white">{{ $t('product.outOfStock') }}</v-chip>
          </div>
          
          <p class="text-body-1 mb-6">{{ product.description }}</p>
          
          <div class="d-flex align-center mb-6">
            <v-btn-group>
              <v-btn icon @click="decreaseQuantity">
                <v-icon>mdi-minus</v-icon>
              </v-btn>
              <v-btn disabled>{{ quantity }}</v-btn>
              <v-btn icon @click="increaseQuantity">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-btn-group>
            
            <v-btn
              color="primary"
              size="large"
              class="ml-4"
              :disabled="!product.available"
              @click="addToCart"
            >
              <v-icon class="mr-2">mdi-cart</v-icon>
              {{ $t('product.addToCart') }}
            </v-btn>
          </div>
          
          <v-divider class="mb-4"></v-divider>
          
          <div>
            <div class="mb-2"><strong>{{ $t('product.category') }}:</strong> {{ product.category }}</div>
            <div><strong>{{ $t('product.sku') }}:</strong> {{ product.id }}</div>
          </div>
        </v-col>
      </v-row>
      
      <v-divider class="my-8"></v-divider>
      
      <h2 class="text-h4 mb-4">{{ $t('product.details') }}</h2>
      <div>{{ product.details || product.description }}</div>
      
      <h2 class="text-h4 mt-8 mb-4">{{ $t('product.relatedProducts') }}</h2>
      <v-row>
        <v-col v-for="relatedProduct in relatedProducts" :key="relatedProduct.id" cols="12" sm="6" md="3">
          <v-card :to="`/product/${relatedProduct.id}`" hover>
            <v-img :src="relatedProduct.image || '/images/product-placeholder.jpg'" height="200" cover></v-img>
            <v-card-title>{{ relatedProduct.name }}</v-card-title>
            <v-card-text>
              <div class="text-h6">{{ relatedProduct.price }} {{ $t('common.currency') }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProductDetailPage',
  
  data() {
    return {
      loading: true,
      product: null,
      quantity: 1,
      
      // Sample products data - will be replaced with Firebase data later
      allProducts: [
        {
          id: 1,
          name: 'Ceramiczny wazon',
          price: 120,
          image: '/images/product-placeholder.jpg',
          description: 'Ręcznie robiony ceramiczny wazon o unikalnym kształcie.',
          category: 'ceramics',
          available: true
        },
        {
          id: 2,
          name: 'Makrama ścienna',
          price: 150,
          image: '/images/product-placeholder.jpg',
          description: 'Piękna makrama ścienna wykonana z naturalnej bawełny.',
          category: 'macrame',
          available: true
        },
        {
          id: 3,
          name: 'Szklany lampion',
          price: 85,
          image: '/images/product-placeholder.jpg',
          description: 'Ręcznie robiony szklany lampion idealny do tworzenia przytulnej atmosfery.',
          category: 'glass',
          available: true
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
    productId() {
      return this.$route.params.id
    },
    
    breadcrumbs() {
      if (!this.product) return []
      
      return [
        {
          title: this.$t('common.home'),
          disabled: false,
          to: '/'
        },
        {
          title: this.$t('common.shop'),
          disabled: false,
          to: '/shop'
        },
        {
          title: this.categoryMap[this.product.category] || this.product.category,
          disabled: false,
          to: `/shop/${this.product.category}`
        },
        {
          title: this.product.name,
          disabled: true
        }
      ]
    },
    
    relatedProducts() {
      if (!this.product) return []
      
      return this.allProducts
        .filter(p => p.category === this.product.category && p.id !== this.product.id)
        .slice(0, 4)
    }
  },
  
  methods: {
    fetchProduct() {
      // Simulate API call
      this.loading = true
      
      setTimeout(() => {
        this.product = this.allProducts.find(p => p.id === parseInt(this.productId as string))
        this.loading = false
      }, 500)
    },
    
    increaseQuantity() {
      this.quantity++
    },
    
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    
    addToCart() {
      // This will be implemented later with proper store integration
      alert(`Added ${this.quantity} × ${this.product.name} to cart`)
    }
  },
  
  mounted() {
    this.fetchProduct()
  }
}
</script>

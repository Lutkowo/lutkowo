<template>
  <div>
    <h1 class="text-h3 mb-6">{{ $t('cart.yourCart') }}</h1>
    
    <v-card v-if="cartItems.length === 0" class="text-center pa-6">
      <v-icon size="large" class="mb-4">mdi-cart-outline</v-icon>
      <h2 class="text-h5 mb-2">{{ $t('cart.empty') }}</h2>
      <v-btn color="primary" class="mt-4" to="/shop">
        {{ $t('cart.continueShopping') }}
      </v-btn>
    </v-card>
    
    <template v-else>
      <v-row>
        <v-col cols="12" md="8">
          <v-card>
            <v-list>
              <v-list-item v-for="(item, index) in cartItems" :key="index">
                <v-list-item-title>{{ item.name }}</v-list-item-title>
                <template v-slot:append>
                  <div>
                    {{ item.quantity }} x {{ item.price }} {{ $t('common.currency') }}
                  </div>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        
        <v-col cols="12" md="4">
          <v-card class="pa-4">
            <h2 class="text-h5 mb-4">{{ $t('cart.summary') }}</h2>
            <div class="d-flex justify-space-between mb-4">
              <span>{{ $t('cart.total') }}</span>
              <span>{{ cartTotal }} {{ $t('common.currency') }}</span>
            </div>
            <v-btn color="primary" block>
              {{ $t('cart.checkout') }}
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CartPage',
  
  data() {
    return {
      cartItems: [] // Empty cart for now
    }
  },
  
  computed: {
    cartTotal() {
      return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    }
  }
}
</script>

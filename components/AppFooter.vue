<template>
  <v-footer app padless color="primary" dark>
    <v-container>
      <v-row>
        <v-col cols="12" sm="4">
          <h3 class="text-h6 mb-4">Lutkowo</h3>
          <p>{{ $t('home.subtitle') }}</p>
          <div class="mt-4">
            <v-btn icon variant="plain" class="mr-2">
              <v-icon>mdi-facebook</v-icon>
            </v-btn>
            <v-btn icon variant="plain" class="mr-2">
              <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn icon variant="plain">
              <v-icon>mdi-pinterest</v-icon>
            </v-btn>
          </div>
        </v-col>
        
        <v-col cols="12" sm="4">
          <h3 class="text-h6 mb-4">{{ $t('common.categories') }}</h3>
          <v-list bg-color="transparent" color="white">
            <v-list-item v-for="category in categories" :key="category.id" :to="`/shop/${category.id}`" link>
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        
        <v-col cols="12" sm="4">
          <h3 class="text-h6 mb-4">{{ $t('common.contact') }}</h3>
          <div class="d-flex align-center mb-3">
            <v-icon class="mr-2">mdi-map-marker</v-icon>
            <span>ul. Przykładowa 123, 00-000 Warszawa</span>
          </div>
          <div class="d-flex align-center mb-3">
            <v-icon class="mr-2">mdi-phone</v-icon>
            <span>+48 123 456 789</span>
          </div>
          <div class="d-flex align-center">
            <v-icon class="mr-2">mdi-email</v-icon>
            <span>kontakt@lutkowo.pl</span>
          </div>
        </v-col>
      </v-row>
      
      <v-divider class="my-4"></v-divider>
      
      <v-row>
        <v-col cols="12" class="text-center">
          &copy; {{ new Date().getFullYear() }} Lutkowo. {{ $t('common.allRightsReserved') }}
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script lang="ts">
export default {
  name: 'AppFooter',
  
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
  }
}
</script>

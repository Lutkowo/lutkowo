<template>
  <div>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer" class="d-md-none"></v-app-bar-nav-icon>
      
      <v-toolbar-title>
        <NuxtLink to="/" class="text-decoration-none text-white">Lutkowo</NuxtLink>
      </v-toolbar-title>
      
      <v-spacer></v-spacer>
      
      <!-- Desktop Navigation -->
      <div class="d-none d-md-flex">
        <v-btn v-for="item in menuItems" :key="item.title" :to="item.route" text>
          {{ $t(item.title) }}
        </v-btn>
      </div>
      
      <!-- Language Switcher -->
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon>
            <v-icon>mdi-translate</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item 
            v-for="locale in availableLocales" 
            :key="locale.code"
            @click="switchLanguage(locale.code)"
          >
            <v-list-item-title>{{ locale.name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      
      <!-- Cart Button -->
      <v-btn icon class="ml-2" to="/cart">
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      
      <!-- User Menu -->
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon class="ml-2">
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <template v-if="isLoggedIn">
            <v-list-item to="/account">
              <v-list-item-title>{{ $t('common.myAccount') }}</v-list-item-title>
            </v-list-item>
            <v-list-item v-if="isAdmin" to="/admin">
              <v-list-item-title>{{ $t('admin.dashboard') }}</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title>{{ $t('common.logout') }}</v-list-item-title>
            </v-list-item>
          </template>
          <template v-else>
            <v-list-item to="/login">
              <v-list-item-title>{{ $t('common.login') }}</v-list-item-title>
            </v-list-item>
            <v-list-item to="/register">
              <v-list-item-title>{{ $t('common.register') }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list>
      </v-menu>
    </v-app-bar>
    
    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.title" :to="item.route" link>
          <template v-slot:prepend>
            <v-icon>{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import { useAuthStore } from '~/stores/auth'

export default {
  name: 'AppHeader',
  
  data() {
    return {
      drawer: false,
      menuItems: [
        { title: 'common.home', route: '/', icon: 'mdi-home' },
        { title: 'common.shop', route: '/shop', icon: 'mdi-store' },
        { title: 'common.about', route: '/about', icon: 'mdi-information' },
        { title: 'common.contact', route: '/contact', icon: 'mdi-email' }
      ]
    }
  },
  
  computed: {
    isLoggedIn() {
      const authStore = useAuthStore()
      return authStore.isLoggedIn
    },
    
    isAdmin() {
      const authStore = useAuthStore()
      return authStore.isAdmin
    },
    
    availableLocales() {
      const localeStore = useI18n()
      return localeStore.locales.value
    }
  },
  
  methods: {
    logout() {
      const authStore = useAuthStore()
      authStore.logout()
      this.$router.push('/')
    },
    
    switchLanguage(locale: string) {
      const localeStore = useI18n()
      localeStore.setLocale(locale)
    }
  }
}
</script>

<template>
  <v-app>
    <AppHeader />
    
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
    
    <AppFooter />
  </v-app>
</template>

<script lang="ts">
export default {
  name: 'DefaultLayout'
}
</script>

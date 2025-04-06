<template>
  <div>
    <h1 class="text-h3 mb-6">{{ $t('about.aboutUs') }}</h1>
    
    <v-row>
      <v-col cols="12" md="6">
        <p class="text-body-1 mb-4">
          {{ $t('about.storyParagraph1') }}
        </p>
        <p class="text-body-1 mb-4">
          {{ $t('about.storyParagraph2') }}
        </p>
        <p class="text-body-1">
          {{ $t('about.storyParagraph3') }}
        </p>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-img src="/images/about-placeholder.jpg" class="rounded" height="400" cover>
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AboutPage'
}
</script>

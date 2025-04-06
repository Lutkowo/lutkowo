<template>
  <div>
    <h1 class="text-h3 mb-6">{{ $t('contact.getInTouch') }}</h1>
    
    <v-row>
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>{{ $t('contact.sendMessage') }}</v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submitForm">
              <v-text-field
                v-model="formData.name"
                :label="$t('contact.name')"
                required
              ></v-text-field>
              
              <v-text-field
                v-model="formData.email"
                :label="$t('contact.email')"
                type="email"
                required
              ></v-text-field>
              
              <v-textarea
                v-model="formData.message"
                :label="$t('contact.message')"
                required
                rows="5"
              ></v-textarea>
              
              <v-btn
                type="submit"
                color="primary"
                :loading="loading"
              >
                {{ $t('contact.send') }}
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col cols="12" md="6">
        <v-card class="pa-4">
          <v-card-title>{{ $t('contact.contactInfo') }}</v-card-title>
          <v-card-text>
            <div class="d-flex align-center mb-4">
              <v-icon size="24" class="mr-2">mdi-map-marker</v-icon>
              <span>ul. Przykładowa 123, 00-000 Warszawa</span>
            </div>
            
            <div class="d-flex align-center mb-4">
              <v-icon size="24" class="mr-2">mdi-phone</v-icon>
              <span>+48 123 456 789</span>
            </div>
            
            <div class="d-flex align-center">
              <v-icon size="24" class="mr-2">mdi-email</v-icon>
              <span>kontakt@lutkowo.pl</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ContactPage',
  
  data() {
    return {
      loading: false,
      formData: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  
  methods: {
    async submitForm() {
      this.loading = true
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      alert('Message sent!')
      this.formData = { name: '', email: '', message: '' }
      this.loading = false
    }
  }
}
</script>

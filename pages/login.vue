<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="elevation-12">
          <v-card-title class="text-center">
            {{ $t('common.login') }}
          </v-card-title>
          
          <v-card-text>
            <v-alert v-if="error" type="error" class="mb-4">
              {{ error }}
            </v-alert>
            
            <v-form @submit.prevent="login" ref="form">
              <v-text-field
                v-model="email"
                :label="$t('auth.email')"
                type="email"
                required
                prepend-icon="mdi-email"
                :rules="[rules.required, rules.email]"
              ></v-text-field>
              
              <v-text-field
                v-model="password"
                :label="$t('auth.password')"
                type="password"
                required
                prepend-icon="mdi-lock"
                :rules="[rules.required, rules.minLength]"
              ></v-text-field>
              
              <div class="d-flex justify-end mb-4">
                <a href="/forgot-password" class="text-decoration-none">
                  {{ $t('auth.forgotPassword') }}
                </a>
              </div>
              
              <v-btn 
                type="submit" 
                color="primary" 
                block 
                :loading="loading"
                :disabled="loading"
              >
                {{ $t('common.login') }}
              </v-btn>
            </v-form>
          </v-card-text>
          
          <v-card-actions class="justify-center pb-4">
            <span>{{ $t('auth.noAccount') }}</span>
            <v-btn variant="text" color="primary" to="/register">
              {{ $t('common.register') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { useAuthStore } from '~/stores/auth'

export default {
  name: 'LoginPage',
  
  setup() {
    const authStore = useAuthStore()
    
    return {
      authStore
    }
  },
  
  data() {
    return {
      email: '',
      password: '',
      rules: {
        required: (v: string) => !!v || this.$t('validation.required'),
        email: (v: string) => /.+@.+\..+/.test(v) || this.$t('validation.email'),
        minLength: (v: string) => v.length >= 6 || this.$t('validation.minLength', { length: 6 })
      }
    }
  },
  
  computed: {
    loading() {
      return this.authStore.loading
    },
    
    error() {
      return this.authStore.error
    }
  },
  
  methods: {
    async login() {
      const { valid } = await (this.$refs.form as any).validate()
      
      if (valid) {
        try {
          await this.authStore.login(this.email, this.password)
          this.$router.push('/')
        } catch (error) {
          // Error is already handled in the store
        }
      }
    }
  }
}
</script>

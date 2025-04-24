<template>
  <div class="container mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold mb-6">{{ $t("terms.title") }}</h1>
    
    <div class="prose prose-primary max-w-none">
      <p class="mb-6">{{ $t("terms.lastUpdated") }}: 25.04.2025</p>
      
      <h2 class="text-xl font-semibold mt-8 mb-4">{{ $t("terms.introduction") }}</h2>
      <p>{{ $t("terms.introText") }}</p>
      
      <h2 class="text-xl font-semibold mt-8 mb-4">{{ $t("terms.definitions") }}</h2>
      <p>{{ $t("terms.definitionsText") }}</p>
      
      <h2 class="text-xl font-semibold mt-8 mb-4">{{ $t("terms.orderProcess") }}</h2>
      <p>{{ $t("terms.orderProcessText") }}</p>
      
      <h2 class="text-xl font-semibold mt-8 mb-4">{{ $t("terms.payment") }}</h2>
      <p>{{ $t("terms.paymentText") }}</p>
      
      <h2 class="text-xl font-semibold mt-8 mb-4">{{ $t("terms.delivery") }}</h2>
      <p>{{ $t("terms.deliveryText") }}</p>
      
      <h2 class="text-xl font-semibold mt-8 mb-4">{{ $t("terms.returns") }}</h2>
      <p>{{ $t("terms.returnsText") }}</p>
      
      <h2 class="text-xl font-semibold mt-8 mb-4">{{ $t("terms.liability") }}</h2>
      <p>{{ $t("terms.liabilityText") }}</p>
      
      <h2 class="text-xl font-semibold mt-8 mb-4">{{ $t("terms.contact") }}</h2>
      <p>{{ $t("terms.contactText") }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Dodanie tytułu strony
useHead({
  title: 'Regulamin | Lutkowo'
})
</script>
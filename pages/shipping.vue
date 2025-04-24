<template>
  <div class="container mx-auto py-12 px-4">
    <h1 class="text-3xl font-bold mb-6">{{ $t("shipping.title") }}</h1>
    
    <div class="prose prose-primary max-w-none">
      <h2 class="text-xl font-semibold mt-8 mb-4">{{ $t("shipping.deliveryOptions") }}</h2>
      <p>{{ $t("shipping.standardDeliveryInfo") }}</p>
      
      <h2 class="text-xl font-semibold mt-8 mb-4">{{ $t("shipping.deliveryTime") }}</h2>
      <p>{{ $t("shipping.deliveryTimeInfo") }}</p>
      
      <h2 class="text-xl font-semibold mt-8 mb-4">{{ $t("shipping.prices") }}</h2>
      <ul class="list-disc pl-5 mb-6">
        <li class="mb-2">{{ $t("shipping.priceOption1") }}</li>
        <li class="mb-2">{{ $t("shipping.priceOption2") }}</li>
        <li class="mb-2">{{ $t("shipping.priceOption3") }}</li>
      </ul>
      
      <h2 class="text-xl font-semibold mt-8 mb-4">{{ $t("shipping.returns") }}</h2>
      <p>{{ $t("shipping.returnsInfo") }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Dodanie tytułu strony
useHead({
  title: 'Dostawa | Lutkowo'
})
</script>
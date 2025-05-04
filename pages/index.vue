<template>
	<div class="home-page">
		<HeroSection />
		<AboutSection />
		<ProductsSection />
		<CategoriesSection />
	</div>
</template>

<script setup>
	import HeroSection from "~/components/home/HeroSection.vue";
	import AboutSection from "~/components/home/AboutSection.vue";
	import ProductsSection from "~/components/home/ProductsSection.vue";
	import CategoriesSection from "~/components/home/CategoriesSection.vue";
</script>

<style scoped>
	.home-page {
		min-height: 100vh;
	}
</style>

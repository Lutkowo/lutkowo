<template>
	<div class="flex flex-col min-h-screen bg-white dark:bg-gray-950">
		<AppHeader />
		<main class="flex-grow py-6 md:py-10">
			<UContainer>
				<slot />
			</UContainer>
		</main>
		<AppFooter />
	</div>
</template>

<script setup lang="ts">
	// Domyślnie używamy komponentów AppHeader i AppFooter
</script>

<style>
	html {
		scroll-behavior: smooth;
	}

	body {
		font-family: "Inter", sans-serif;
		font-feature-settings: "cv02", "cv03", "cv04", "cv11";
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>

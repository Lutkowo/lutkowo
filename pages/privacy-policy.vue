<template>
	<div class="container mx-auto py-12 px-4">
		<h1 class="text-3xl font-bold mb-6">{{ $t("privacy.title") }}</h1>

		<div class="prose prose-primary max-w-none">
			<p class="mb-6">{{ $t("privacy.lastUpdated") }}: 25.04.2025</p>

			<h2 class="text-xl font-semibold mt-8 mb-4">
				{{ $t("privacy.introduction") }}
			</h2>
			<p>{{ $t("privacy.introText") }}</p>

			<h2 class="text-xl font-semibold mt-8 mb-4">
				{{ $t("privacy.dataCollection") }}
			</h2>
			<p>{{ $t("privacy.dataCollectionText") }}</p>

			<h2 class="text-xl font-semibold mt-8 mb-4">
				{{ $t("privacy.cookies") }}
			</h2>
			<p>{{ $t("privacy.cookiesText") }}</p>

			<h2 class="text-xl font-semibold mt-8 mb-4">
				{{ $t("privacy.thirdParty") }}
			</h2>
			<p>{{ $t("privacy.thirdPartyText") }}</p>

			<h2 class="text-xl font-semibold mt-8 mb-4">
				{{ $t("privacy.rights") }}
			</h2>
			<p>{{ $t("privacy.rightsText") }}</p>

			<h2 class="text-xl font-semibold mt-8 mb-4">
				{{ $t("privacy.contact") }}
			</h2>
			<p>{{ $t("privacy.contactText") }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	// Dodanie tytułu strony
	useHead({
		title: "Polityka Prywatności | Lutkowo",
	});
</script>

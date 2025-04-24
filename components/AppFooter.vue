<template>
	<footer
		class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto pt-12 pb-6"
	>
		<div class="container mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
				<!-- O firmie -->
				<div class="space-y-4">
					<div class="flex items-center space-x-2">
						<UIcon name="i-heroicons-gift" class="text-primary-500 w-6 h-6" />
						<h3 class="text-xl font-semibold">Lutkowo</h3>
					</div>
					<p class="text-gray-600 dark:text-gray-400 text-sm">
						{{ $t("home.subtitle") }}
					</p>
					<div class="flex space-x-3">
						<UButton
							color="gray"
							variant="ghost"
							icon="i-mdi-facebook"
							size="xs"
						/>
						<UButton
							color="gray"
							variant="ghost"
							icon="i-mdi-instagram"
							size="xs"
						/>
						<UButton
							color="gray"
							variant="ghost"
							icon="i-mdi-pinterest"
							size="xs"
						/>
					</div>
				</div>

				<!-- Kategorie -->
				<div class="space-y-4">
					<h3 class="font-medium text-gray-900 dark:text-white">
						{{ $t("common.categories") }}
					</h3>
					<ul class="space-y-2">
						<li v-for="category in categories" :key="category.id">
							<NuxtLink
								:to="`/shop/${category.id}`"
								class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm"
							>
								{{ category.name }}
							</NuxtLink>
						</li>
					</ul>
				</div>

				<!-- Przydatne linki -->
				<div class="space-y-4">
					<h3 class="font-medium text-gray-900 dark:text-white">
						{{ $t("common.usefulLinks") }}
					</h3>
					<ul class="space-y-2">
						<li>
							<NuxtLink
								to="/about"
								class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm"
							>
								{{ $t("common.about") }}
							</NuxtLink>
						</li>
						<li>
							<NuxtLink
								to="/contact"
								class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm"
							>
								{{ $t("common.contact") }}
							</NuxtLink>
						</li>
						<li>
							<NuxtLink
								to="/shipping"
								class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm"
							>
								{{ $t("common.shipping") }}
							</NuxtLink>
						</li>
						<li>
							<NuxtLink
								to="/privacy-policy"
								class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm"
							>
								{{ $t("common.privacyPolicy") }}
							</NuxtLink>
						</li>
						<li>
							<NuxtLink
								to="/terms"
								class="text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 text-sm"
							>
								{{ $t("common.terms") }}
							</NuxtLink>
						</li>
					</ul>
				</div>

				<!-- Kontakt -->
				<div class="space-y-4">
					<h3 class="font-medium text-gray-900 dark:text-white">
						{{ $t("common.contact") }}
					</h3>
					<ul class="space-y-3">
						<li class="flex items-start space-x-2">
							<UIcon
								name="i-heroicons-map-pin"
								class="flex-shrink-0 text-primary-500 w-5 h-5 mt-0.5"
							/>
							<span class="text-gray-600 dark:text-gray-400 text-sm">
								ul. Przykładowa 123, 00-000 Warszawa
							</span>
						</li>
						<li class="flex items-start space-x-2">
							<UIcon
								name="i-heroicons-phone"
								class="flex-shrink-0 text-primary-500 w-5 h-5 mt-0.5"
							/>
							<span class="text-gray-600 dark:text-gray-400 text-sm">
								+48 123 456 789
							</span>
						</li>
						<li class="flex items-start space-x-2">
							<UIcon
								name="i-heroicons-envelope"
								class="flex-shrink-0 text-primary-500 w-5 h-5 mt-0.5"
							/>
							<span class="text-gray-600 dark:text-gray-400 text-sm">
								kontakt@lutkowo.pl
							</span>
						</li>
					</ul>
				</div>
			</div>

			<!-- Copyright -->
			<div class="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
				<div class="flex flex-col md:flex-row justify-between items-center">
					<p class="text-sm text-gray-600 dark:text-gray-400">
						&copy; {{ new Date().getFullYear() }} Lutkowo.
						{{ $t("common.allRightsReserved") }}
					</p>
					<div class="flex items-center space-x-4 mt-4 md:mt-0">
						<NuxtLink
							v-for="locale in locales"
							:key="locale.code"
							@click.prevent="switchLanguage(locale.code)"
							class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 cursor-pointer"
						>
							{{ locale.name }}
						</NuxtLink>
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
	const { locale, locales } = useI18n();

	// Kategorie - docelowo będą pobierane z API/store
	const categories = [
		{ id: "ceramics", name: "Ceramika" },
		{ id: "glass", name: "Szkło" },
		{ id: "macrame", name: "Makramy" },
		{ id: "textiles", name: "Tekstylia" },
		{ id: "wood", name: "Drewno" },
	];

	// Funkcja przełączania języka
	function switchLanguage(code: "pl" | "en") {
		locale.value = code;
	}
</script>

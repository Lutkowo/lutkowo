<template>
	<div>
		<div class="py-8 md:py-16 bg-primary-50 dark:bg-gray-900">
			<UContainer>
				<div class="max-w-3xl mx-auto text-center mb-12">
					<h1
						class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
					>
						{{ $t("home.title") }}
					</h1>
					<p class="text-lg text-gray-700 dark:text-gray-300">
						{{ $t("home.subtitle") }}
					</p>
					<UButton size="lg" color="primary" class="mt-8" to="/shop">
						{{ $t("home.shopNow") }}
					</UButton>
				</div>
			</UContainer>
		</div>

		<!-- Wyróżnione kategorie -->
		<UContainer class="py-16">
			<h2
				class="text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-white"
			>
				{{ $t("home.categories") }}
			</h2>

			<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
				<NuxtLink
					v-for="category in categories"
					:key="category.id"
					:to="`/shop/${category.id}`"
					class="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 aspect-square"
				>
					<UImage
						:src="category.image"
						class="w-full h-full object-cover"
						alt=""
					/>
					<div
						class="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center"
					>
						<span class="text-white text-xl font-medium">{{
							category.name
						}}</span>
					</div>
				</NuxtLink>
			</div>
		</UContainer>

		<!-- Wyróżnione produkty -->
		<div class="py-16 bg-gray-50 dark:bg-gray-900">
			<UContainer>
				<h2
					class="text-2xl font-semibold text-center mb-8 text-gray-900 dark:text-white"
				>
					{{ $t("home.featuredProducts") }}
				</h2>

				<div v-if="productsStore.loading" class="flex justify-center my-8">
					<UIcon
						name="i-heroicons-arrow-path"
						class="w-8 h-8 animate-spin text-primary-500"
					/>
				</div>

				<div
					v-else-if="productsStore.error"
					class="p-4 rounded-lg bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 my-8"
				>
					{{ productsStore.error }}
				</div>

				<div
					v-else-if="featuredProducts.length === 0"
					class="text-center my-8 text-gray-600 dark:text-gray-400"
				>
					{{ $t("products.noProductsFound") }}
				</div>

				<div
					v-else
					class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
				>
					<UCard
						v-for="product in featuredProducts"
						:key="product.id"
						class="hover:shadow-lg transition-all duration-300"
					>
						<template #header>
							<NuxtLink
								:to="`/product/${product.id}`"
								class="block aspect-square overflow-hidden"
							>
								<UImage
									:src="product.images[0] || '/images/placeholder.jpg'"
									class="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
									:alt="product.name"
								/>
							</NuxtLink>
						</template>

						<div>
							<NuxtLink :to="`/product/${product.id}`" class="block">
								<h3
									class="text-lg font-medium text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400"
								>
									{{ product.name }}
								</h3>
							</NuxtLink>
							<p
								class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2"
							>
								{{ product.description }}
							</p>
							<div class="flex justify-between items-center mt-4">
								<span class="text-lg font-bold text-gray-900 dark:text-white">
									{{ formatPrice(product.price) }}
								</span>
								<UButton
									v-if="product.available"
									color="primary"
									variant="soft"
									icon="i-heroicons-shopping-cart"
									size="sm"
									@click="addToCart(product)"
								>
									{{ $t("products.addToCart") }}
								</UButton>
								<UBadge v-else color="gray" class="text-xs">
									{{ $t("products.outOfStock") }}
								</UBadge>
							</div>
						</div>
					</UCard>
				</div>

				<div class="text-center mt-12">
					<UButton color="primary" variant="outline" to="/shop">
						{{ $t("home.viewAllProducts") }}
					</UButton>
				</div>
			</UContainer>
		</div>

		<!-- Zalety sklepu -->
		<UContainer class="py-16">
			<h2
				class="text-2xl font-semibold text-center mb-12 text-gray-900 dark:text-white"
			>
				{{ $t("home.whyChooseUs") }}
			</h2>

			<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div class="text-center">
					<UIcon
						name="i-heroicons-hand"
						class="w-12 h-12 text-primary-500 mx-auto mb-4"
					/>
					<h3 class="text-lg font-medium mb-2 text-gray-900 dark:text-white">
						{{ $t("home.handmade") }}
					</h3>
					<p class="text-gray-600 dark:text-gray-400">
						{{ $t("home.handmadeDesc") }}
					</p>
				</div>

				<div class="text-center">
					<UIcon
						name="i-heroicons-globe-europe-africa"
						class="w-12 h-12 text-primary-500 mx-auto mb-4"
					/>
					<h3 class="text-lg font-medium mb-2 text-gray-900 dark:text-white">
						{{ $t("home.ecofriendly") }}
					</h3>
					<p class="text-gray-600 dark:text-gray-400">
						{{ $t("home.ecofriendlyDesc") }}
					</p>
				</div>

				<div class="text-center">
					<UIcon
						name="i-heroicons-truck"
						class="w-12 h-12 text-primary-500 mx-auto mb-4"
					/>
					<h3 class="text-lg font-medium mb-2 text-gray-900 dark:text-white">
						{{ $t("home.fastDelivery") }}
					</h3>
					<p class="text-gray-600 dark:text-gray-400">
						{{ $t("home.fastDeliveryDesc") }}
					</p>
				</div>
			</div>
		</UContainer>

		<div>
			<h1>Strona główna</h1>
			<p>Witamy w sklepie Lutkowo</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useProductsStore } from "~/stores/products";
	import { useCartStore } from "~/stores/cart";

	const { t } = useI18n();
	const productsStore = useProductsStore();
	const cartStore = useCartStore();

	// Zapewniamy, że produkty są załadowane
	if (productsStore.products.length === 0) {
		productsStore.fetchProducts();
	}

	// Kategorie produktów (statycznie na razie, później będą pobierane z API)
	const categories = ref([
		{ id: "ceramics", name: "Ceramika", image: "/images/placeholder.jpg" },
		{ id: "glass", name: "Szkło", image: "/images/placeholder.jpg" },
		{ id: "macrame", name: "Makramy", image: "/images/placeholder.jpg" },
		{ id: "textiles", name: "Tekstylia", image: "/images/placeholder.jpg" },
		{ id: "wood", name: "Drewno", image: "/images/placeholder.jpg" },
	]);

	// Formatowanie ceny
	function formatPrice(price: number) {
		return new Intl.NumberFormat("pl-PL", {
			style: "currency",
			currency: "PLN",
		}).format(price);
	}

	// Dodanie produktu do koszyka
	function addToCart(product: any) {
		cartStore.addItem(product);

		// Wyświetlenie komunikatu o dodaniu do koszyka
		const { toast } = useToast();
		toast.add({
			title: t("cart.addedToCart"),
			description: product.name,
			icon: "i-heroicons-check-circle",
			color: "primary",
			timeout: 3000,
		});
	}

	// Pobieranie wyróżnionych produktów
	const featuredProducts = computed(() => {
		return productsStore.featuredProducts || [];
	});
</script>

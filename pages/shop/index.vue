<template>
	<UContainer class="py-8">
		<UPageHeader :title="$t('shop.title')" class="mb-8" />

		<!-- Kategorie -->
		<div v-if="mainCategories.length" class="mb-12">
			<h2 class="text-2xl font-medium mb-6">{{ $t("shop.categories") }}</h2>
			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
				<UCard
					v-for="category in mainCategories"
					:key="category.id"
					@click="navigateToCategory(category.slug)"
					class="cursor-pointer hover:scale-105 transition-transform"
				>
					<template #header>
						<NuxtImg
							:src="category.imageUrl || '/images/placeholder.txt'"
							:alt="category.name"
							width="200"
							height="150"
							format="webp"
							class="w-full h-36 object-cover rounded-t"
						/>
					</template>
					<h3 class="text-lg font-medium text-center">{{ category.name }}</h3>
				</UCard>
			</div>
		</div>

		<!-- Filtry i sortowanie -->
		<div class="flex justify-end mb-6">
			<USelect
				v-model="sortOption"
				:options="[
					{ label: $t('shop.sort.newest'), value: 'newest' },
					{ label: $t('shop.sort.priceAsc'), value: 'priceAsc' },
					{ label: $t('shop.sort.priceDesc'), value: 'priceDesc' },
					{ label: $t('shop.sort.nameAsc'), value: 'nameAsc' },
				]"
				size="sm"
				class="w-48"
			/>
		</div>

		<!-- Lista produktów -->
		<ULazyLoad as="div" class="mb-8">
			<template #loading>
				<div
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
				>
					<USkeleton v-for="i in 12" :key="i" class="h-80" />
				</div>
			</template>

			<UAlert
				v-if="error"
				icon="i-heroicons-exclamation-triangle"
				color="error"
				variant="soft"
				:title="$t('shop.error')"
				:description="error.message"
			/>

			<UEmptyState
				v-else-if="!loading && !products.length"
				:title="$t('shop.noProducts')"
				icon="i-heroicons-shopping-bag"
			/>

			<div
				v-else
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
			>
				<UCard
					v-for="product in sortedProducts"
					:key="product.id"
					class="product-card"
					:ui="{
						body: {
							base: 'p-4',
						},
					}"
					:to="`/product/${product.id}`"
				>
					<template #header>
						<div class="relative">
							<NuxtImg
								:src="product.thumbnailUrl || '/images/placeholder.txt'"
								:alt="product.name"
								width="300"
								height="200"
								format="webp"
								loading="lazy"
								class="w-full h-48 object-cover rounded-t"
							/>
							<UBadge
								v-if="product.metadata?.handmade"
								color="primary"
								variant="solid"
								class="absolute top-2 right-2"
							>
								{{ $t("product.handmade") }}
							</UBadge>
						</div>
					</template>

					<h3 class="text-lg font-medium mb-2 line-clamp-1">
						{{ product.name }}
					</h3>
					<p class="text-xl font-bold text-primary mb-2">
						{{ formatPrice(product.price, product.currency) }}
					</p>
					<p class="text-sm text-gray-600 line-clamp-2">
						{{ product.shortDescription }}
					</p>

					<template #footer>
						<UButton
							color="primary"
							variant="ghost"
							block
							:icon="
								product.availableQuantity
									? 'i-heroicons-shopping-cart'
									: 'i-heroicons-no-symbol'
							"
							:disabled="!product.availableQuantity"
							@click.stop="addToCartDirectly(product)"
						>
							{{ $t("product.addToCart") }}
						</UButton>
					</template>
				</UCard>
			</div>
		</ULazyLoad>

		<!-- Paginacja / Więcej produktów -->
		<div v-if="products.length > 0" class="flex justify-center">
			<UButton
				v-if="canLoadMore"
				:loading="loadingMore"
				:disabled="loadingMore"
				@click="loadMoreProducts"
				size="lg"
				color="neutral"
				variant="soft"
				:label="loadingMore ? $t('shop.loadingMore') : $t('shop.loadMore')"
				icon="i-heroicons-arrow-down"
			/>
		</div>
	</UContainer>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted } from "vue";
	import { useProducts } from "~/composables/useProducts";
	import { useCategories } from "~/composables/useCategories";
	import type { Product } from "~/types/product";
	import { useCartStore } from "~/stores/cart";
	import { useToast } from "#imports";

	// Composables
	const { products, loading, error, fetchProducts, fetchMoreProducts } =
		useProducts();

	const { categories, mainCategories, fetchCategories } = useCategories();

	const cartStore = useCartStore();
	const toast = useToast();

	// Lokalne stany
	const sortOption = ref("newest");
	const loadingMore = ref(false);
	const canLoadMore = ref(true);

	// Limit produktów per strona
	const PRODUCTS_PER_PAGE = 12;

	// Pobierz produkty i kategorie przy montowaniu komponentu
	onMounted(async () => {
		// Pobierz kategorie
		await fetchCategories();

		// Pobierz produkty
		const fetchedProducts = await fetchProducts(PRODUCTS_PER_PAGE);

		// Sprawdź, czy możemy załadować więcej
		canLoadMore.value = fetchedProducts.length >= PRODUCTS_PER_PAGE;
	});

	// Posortowane produkty
	const sortedProducts = computed(() => {
		if (!products.value.length) return [];

		const productsCopy = [...products.value];

		switch (sortOption.value) {
			case "priceAsc":
				return productsCopy.sort((a, b) => a.price - b.price);
			case "priceDesc":
				return productsCopy.sort((a, b) => b.price - a.price);
			case "nameAsc":
				return productsCopy.sort((a, b) => a.name.localeCompare(b.name));
			case "newest":
			default:
				return productsCopy.sort((a, b) => {
					// Bezpieczne porównanie dat - obsługa różnych formatów daty z Firebase
					if (!b.createdAt && !a.createdAt) return 0;
					if (!b.createdAt) return -1;
					if (!a.createdAt) return 1;

					const dateA =
						b.createdAt instanceof Date
							? b.createdAt
							: new Date(b.createdAt || Date.now());
					const dateB =
						a.createdAt instanceof Date
							? a.createdAt
							: new Date(a.createdAt || Date.now());

					// Weryfikacja poprawności dat
					const validDateA = !isNaN(dateA.getTime());
					const validDateB = !isNaN(dateB.getTime());

					if (!validDateA && !validDateB) return 0;
					if (!validDateA) return -1;
					if (!validDateB) return 1;

					return dateA.getTime() - dateB.getTime();
				});
		}
	});

	// Załaduj więcej produktów
	const loadMoreProducts = async () => {
		if (loadingMore.value) return;

		loadingMore.value = true;

		try {
			const moreProducts = await fetchMoreProducts(PRODUCTS_PER_PAGE);

			// Sprawdź, czy możemy załadować jeszcze więcej
			canLoadMore.value = moreProducts.length >= PRODUCTS_PER_PAGE;
		} catch (err) {
			console.error("Błąd podczas ładowania kolejnych produktów:", err);
		} finally {
			loadingMore.value = false;
		}
	};

	// Nawigacja do kategorii
	const navigateToCategory = (slug: string) => {
		navigateTo(`/shop/${slug}`);
	};

	// Dodaj produkt bezpośrednio do koszyka
	const addToCartDirectly = (product: Product) => {
		cartStore.add({
			product: product,
			quantity: 1,
		});

		toast.add({
			title: $t("product.addedToCart"),
			description: product.name,
			icon: "i-heroicons-check-circle",
			color: "success",
		});
	};

	// Formatowanie ceny
	const formatPrice = (price: number, currency: string = "PLN") => {
		return new Intl.NumberFormat("pl-PL", {
			style: "currency",
			currency: currency,
		}).format(price);
	};
</script>

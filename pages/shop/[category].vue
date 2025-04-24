<template>
	<UContainer class="py-8">
		<div v-if="loading" class="flex justify-center">
			<USkeleton class="h-96 w-full max-w-3xl" />
		</div>

		<UAlert
			v-else-if="error"
			icon="i-heroicons-exclamation-triangle"
			color="error"
			variant="soft"
			:title="$t('category.error')"
			:description="error.message"
			class="mb-4"
		>
			<template #footer>
				<UButton
					@click="goBack"
					color="neutral"
					variant="soft"
					icon="i-heroicons-arrow-left"
				>
					{{ $t("shop.backToShop") }}
				</UButton>
			</template>
		</UAlert>

		<UEmptyState
			v-else-if="!category"
			:title="$t('category.notFound')"
			icon="i-heroicons-shopping-bag"
		>
			<template #footer>
				<UButton
					@click="goBack"
					color="neutral"
					variant="soft"
					icon="i-heroicons-arrow-left"
				>
					{{ $t("shop.backToShop") }}
				</UButton>
			</template>
		</UEmptyState>

		<div v-else>
			<!-- Breadcrumbs -->
			<UBreadcrumb
				:items="[
					{ label: $t('shop.title'), to: '/shop' },
					{
						label: parentCategory?.name,
						to: parentCategory ? `/shop/${parentCategory.slug}` : undefined,
					},
					{ label: category.name, to: '' },
				]"
				class="mb-6"
			/>

			<!-- Nagłówek kategorii -->
			<UPageHeader
				:title="category.name"
				:description="category.description"
				class="mb-8"
			/>

			<!-- Podkategorie -->
			<div v-if="subcategoriesArray.length" class="mb-12">
				<h2 class="text-xl font-medium mb-6">
					{{ $t("category.subcategories") }}
				</h2>
				<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
					<UCard
						v-for="subcategory in subcategoriesArray"
						:key="subcategory.id"
						@click="navigateToCategory(subcategory.slug)"
						class="cursor-pointer hover:scale-105 transition-transform"
					>
						<template #header>
							<NuxtImg
								:src="subcategory.imageUrl || '/images/placeholder.txt'"
								:alt="subcategory.name"
								width="200"
								height="150"
								format="webp"
								class="w-full h-36 object-cover rounded-t"
							/>
						</template>
						<h3 class="text-lg font-medium text-center">
							{{ subcategory.name }}
						</h3>
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
						<USkeleton v-for="i in 8" :key="i" class="h-80" />
					</div>
				</template>

				<UAlert
					v-if="productsError"
					icon="i-heroicons-exclamation-triangle"
					color="error"
					variant="soft"
					:title="$t('shop.error')"
					:description="productsError.message"
				/>

				<UEmptyState
					v-else-if="!productsLoading && !products.length"
					:title="$t('category.noProducts')"
					:description="$t('category.noProductsDescription')"
					icon="i-heroicons-shopping-bag"
					:ui="{
						container: {
							base: 'p-4',
						},
					}"
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
		</div>
	</UContainer>
</template>

<script setup lang="ts">
	import { ref, computed, onMounted, watch } from "vue";
	import { useRoute } from "vue-router";
	import { useProducts } from "~/composables/useProducts";
	import { useCategories } from "~/composables/useCategories";
	import type { Product } from "~/types/product";
	import type { Category } from "~/types/category";
	import { useCartStore } from "~/stores/cart";
	import { useToast } from "#imports";

	const route = useRoute();
	const cartStore = useCartStore();
	const toast = useToast();

	// Composables
	const {
		products,
		loading: productsLoading,
		error: productsError,
		fetchProducts,
		fetchMoreProducts,
	} = useProducts();

	const {
		selectedCategory: category,
		loading,
		error,
		fetchCategoryBySlug,
		fetchCategoryById,
		fetchSubcategories,
	} = useCategories();

	// Lokalne stany
	const sortOption = ref("newest");
	const loadingMore = ref(false);
	const canLoadMore = ref(true);
	const parentCategory = ref<Category | null>(null);
	const subcategoriesArray = ref<Category[]>([]);

	// Limit produktów per strona
	const PRODUCTS_PER_PAGE = 12;

	// Watching for route changes to reload data
	watch(
		() => route.params.category,
		async (newCategorySlug) => {
			if (newCategorySlug) {
				await loadCategoryData(String(newCategorySlug));
			}
		},
		{ immediate: true }
	);

	// Ładowanie danych kategorii
	const loadCategoryData = async (categorySlug: string) => {
		// Pobierz kategorię
		const categoryData = await fetchCategoryBySlug(categorySlug);

		if (categoryData) {
			// Pobierz produkty dla tej kategorii
			const fetchedProducts = await fetchProducts(
				PRODUCTS_PER_PAGE,
				categoryData.id,
				true
			);

			// Sprawdź, czy możemy załadować więcej
			canLoadMore.value = fetchedProducts.length >= PRODUCTS_PER_PAGE;

			// Pobierz podkategorie
			const subCats = await fetchSubcategories(categoryData.id);
			subcategoriesArray.value = subCats;

			// Pobierz rodzica jeśli istnieje
			if (categoryData.parentId) {
				parentCategory.value = await fetchCategoryById(categoryData.parentId);
			} else {
				parentCategory.value = null;
			}
		}
	};

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
				return productsCopy.sort(
					(a, b) => b.createdAt.getTime() - a.createdAt.getTime()
				);
		}
	});

	// Załaduj więcej produktów
	const loadMoreProducts = async () => {
		if (loadingMore.value || !category.value) return;

		loadingMore.value = true;

		try {
			const moreProducts = await fetchMoreProducts(
				PRODUCTS_PER_PAGE,
				category.value.id
			);

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

	// Cofnij
	const goBack = () => {
		navigateTo("/shop");
	};

	// Formatowanie ceny
	const formatPrice = (price: number, currency: string = "PLN") => {
		return new Intl.NumberFormat("pl-PL", {
			style: "currency",
			currency: currency,
		}).format(price);
	};
</script>

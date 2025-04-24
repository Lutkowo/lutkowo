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
			:title="$t('product.error')"
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
					{{ $t("product.backToShop") }}
				</UButton>
			</template>
		</UAlert>

		<UEmptyState
			v-else-if="!product"
			:title="$t('product.notFound')"
			icon="i-heroicons-shopping-bag"
		>
			<template #footer>
				<UButton
					@click="goBack"
					color="neutral"
					variant="soft"
					icon="i-heroicons-arrow-left"
				>
					{{ $t("product.backToShop") }}
				</UButton>
			</template>
		</UEmptyState>

		<div v-else>
			<!-- Breadcrumbs -->
			<UBreadcrumb
				:items="[
					{ label: $t('shop.title'), to: '/shop' },
					{
						label: category?.name,
						to: category ? `/shop/${category.slug}` : undefined,
					},
					{ label: product.name, to: '' },
				]"
				class="mb-6"
			/>

			<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
				<!-- Galeria zdjęć -->
				<div>
					<div class="relative rounded-lg overflow-hidden mb-4">
						<NuxtImg
							:src="
								currentImage ||
								product.thumbnailUrl ||
								'/images/placeholder.txt'
							"
							:alt="product.name"
							width="600"
							height="400"
							format="webp"
							quality="90"
							class="w-full h-auto aspect-[4/3] object-contain bg-gray-50"
						/>
					</div>

					<div
						v-if="product.images && product.images.length > 1"
						class="flex gap-2 overflow-x-auto pb-2"
					>
						<UButton
							v-for="(image, index) in product.images"
							:key="index"
							:color="currentImage === image ? 'primary' : 'neutral'"
							variant="ghost"
							class="p-0 min-w-16 min-h-16"
							@click="currentImage = image"
						>
							<NuxtImg
								:src="image"
								:alt="`${product.name} - zdjęcie ${index + 1}`"
								width="64"
								height="64"
								format="webp"
								class="w-16 h-16 object-cover"
							/>
						</UButton>
					</div>
				</div>

				<!-- Informacje o produkcie -->
				<div>
					<h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>

					<p class="text-2xl font-bold text-primary mb-4">
						{{ formatPrice(product.price, product.currency) }}
					</p>

					<div class="prose prose-sm mb-6">
						<p>{{ product.shortDescription }}</p>
					</div>

					<div class="flex gap-4 items-center mb-6">
						<UButtonGroup size="md">
							<UButton
								@click="decreaseQuantity"
								:disabled="quantity <= 1"
								icon="i-heroicons-minus"
								color="neutral"
								variant="soft"
							/>
							<UInput
								v-model="quantity"
								type="number"
								min="1"
								:max="product.availableQuantity"
								class="w-16 text-center"
							/>
							<UButton
								@click="increaseQuantity"
								:disabled="quantity >= product.availableQuantity"
								icon="i-heroicons-plus"
								color="neutral"
								variant="soft"
							/>
						</UButtonGroup>

						<UButton
							@click="addToCart"
							:disabled="!product.availableQuantity"
							color="primary"
							icon="i-heroicons-shopping-cart"
							class="flex-grow"
						>
							{{ $t("product.addToCart") }}
						</UButton>
					</div>

					<UBadge
						v-if="product.availableQuantity > 10"
						color="success"
						variant="soft"
						icon="i-heroicons-check-circle"
						size="lg"
						class="mb-4"
					>
						{{ $t("product.inStock") }}
					</UBadge>

					<UBadge
						v-else-if="product.availableQuantity > 0"
						color="warning"
						variant="soft"
						icon="i-heroicons-exclamation-circle"
						size="lg"
						class="mb-4"
					>
						{{ $t("product.lowStock", { count: product.availableQuantity }) }}
					</UBadge>

					<UBadge
						v-else
						color="error"
						variant="soft"
						icon="i-heroicons-x-circle"
						size="lg"
						class="mb-4"
					>
						{{ $t("product.outOfStock") }}
					</UBadge>

					<UDivider class="my-6" />

					<div class="space-y-4">
						<UBadge
							v-if="product.metadata?.handmade"
							color="primary"
							variant="soft"
							size="lg"
							icon="i-heroicons-sparkles"
						>
							{{ $t("product.handmade") }}
						</UBadge>

						<div
							v-if="
								product.metadata?.materials && product.metadata.materials.length
							"
							class="flex gap-2 flex-wrap"
						>
							<UBadge
								v-for="material in product.metadata.materials"
								:key="material"
								color="neutral"
								variant="subtle"
							>
								{{ material }}
							</UBadge>
						</div>

						<UCard
							v-if="product.metadata?.dimensions || product.metadata?.weight"
							class="bg-gray-50"
						>
							<UTable :rows="productSpecsRows">
								<template #cell-property="{ row }">
									<div class="font-medium">{{ row.property }}</div>
								</template>
							</UTable>
						</UCard>
					</div>
				</div>
			</div>

			<!-- Szczegółowy opis -->
			<UCard class="mb-12">
				<template #header>
					<div class="font-bold text-xl px-4 py-2">
						{{ $t("product.description") }}
					</div>
				</template>
				<div
					class="prose prose-sm max-w-none"
					v-html="product.description"
				></div>
			</UCard>

			<!-- Podobne produkty -->
			<div v-if="similarProducts.length" class="mb-8">
				<h2 class="text-2xl font-medium mb-6">
					{{ $t("product.similarProducts") }}
				</h2>
				<div
					class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
				>
					<UCard
						v-for="similarProduct in similarProducts"
						:key="similarProduct.id"
						:to="`/product/${similarProduct.id}`"
						class="hover:shadow-lg transition-shadow"
					>
						<template #header>
							<NuxtImg
								:src="similarProduct.thumbnailUrl || '/images/placeholder.txt'"
								:alt="similarProduct.name"
								width="200"
								height="150"
								format="webp"
								loading="lazy"
								class="w-full h-40 object-cover"
							/>
						</template>
						<h3 class="font-medium mb-2 line-clamp-1">
							{{ similarProduct.name }}
						</h3>
						<p class="font-bold text-primary">
							{{ formatPrice(similarProduct.price, similarProduct.currency) }}
						</p>
					</UCard>
				</div>
			</div>
		</div>
	</UContainer>
</template>

<script setup lang="ts">
	import { ref, onMounted, computed } from "vue";
	import { useRoute } from "vue-router";
	import { useProducts } from "~/composables/useProducts";
	import { useCategories } from "~/composables/useCategories";
	import type { Product } from "~/types/product";
	import { useCartStore } from "~/stores/cart";
	import { useToast } from "#imports";

	const route = useRoute();
	const cartStore = useCartStore();
	const toast = useToast();

	// Composables
	const {
		selectedProduct: product,
		loading,
		error,
		fetchProductById,
		fetchProducts,
	} = useProducts();

	const { selectedCategory: category, fetchCategoryById } = useCategories();

	// Lokalne stany
	const quantity = ref(1);
	const currentImage = ref("");
	const similarProducts = ref<Product[]>([]);

	// Oblicz wiersze specyfikacji produktu
	const productSpecsRows = computed(() => {
		const rows = [];

		if (product.value?.metadata?.dimensions) {
			rows.push({
				property: $t("product.dimensions"),
				value: `${product.value.metadata.dimensions.width} × ${product.value.metadata.dimensions.height} × ${product.value.metadata.dimensions.depth} cm`,
			});
		}

		if (product.value?.metadata?.weight) {
			rows.push({
				property: $t("product.weight"),
				value: formatWeight(product.value.metadata.weight),
			});
		}

		return rows;
	});

	// Pobierz dane produktu przy montowaniu komponentu
	onMounted(async () => {
		const productId = String(route.params.id);

		// Pobierz produkt
		const productData = await fetchProductById(productId);

		if (productData) {
			// Ustaw pierwsze zdjęcie jako aktywne
			if (productData.images && productData.images.length > 0) {
				currentImage.value = productData.images[0];
			}

			// Pobierz kategorię produktu
			if (productData.categoryId) {
				await fetchCategoryById(productData.categoryId);
			}

			// Pobierz podobne produkty (z tej samej kategorii)
			if (productData.categoryId) {
				const similarProductsResult = await fetchProducts(
					4,
					productData.categoryId,
					true
				);
				// Usuń bieżący produkt z listy podobnych
				similarProducts.value = similarProductsResult.filter(
					(p: Product) => p.id !== productId
				);
			}
		}
	});

	// Metody
	const increaseQuantity = () => {
		if (product.value && quantity.value < product.value.availableQuantity) {
			quantity.value++;
		}
	};

	const decreaseQuantity = () => {
		if (quantity.value > 1) {
			quantity.value--;
		}
	};

	const addToCart = () => {
		if (product.value) {
			cartStore.add({
				product: product.value,
				quantity: quantity.value,
			});

			toast.add({
				title: $t("product.addedToCart"),
				description: `${product.value.name} (${quantity.value}x)`,
				icon: "i-heroicons-check-circle",
				color: "success",
			});
		}
	};

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

	// Formatowanie wagi
	const formatWeight = (weight: number) => {
		if (weight >= 1000) {
			return `${(weight / 1000).toFixed(1)} kg`;
		}
		return `${weight} g`;
	};
</script>

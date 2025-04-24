<template>
	<header class="border-b border-gray-200 dark:border-gray-800">
		<div class="container mx-auto">
			<div class="flex items-center justify-between py-4">
				<!-- Logo i nazwa sklepu -->
				<NuxtLink to="/" class="flex items-center space-x-2">
					<UIcon name="i-heroicons-gift" class="text-primary-500 w-8 h-8" />
					<span class="text-xl font-semibold text-gray-900 dark:text-white"
						>Lutkowo</span
					>
				</NuxtLink>

				<!-- Nawigacja desktopowa -->
				<nav class="hidden md:flex items-center space-x-6">
					<UButton
						v-for="item in menuItems"
						:key="item.title"
						:to="item.route"
						variant="ghost"
						size="sm"
						class="font-medium"
					>
						{{ $t(item.title) }}
					</UButton>
				</nav>

				<!-- Akcje użytkownika -->
				<div class="flex items-center space-x-2">
					<!-- Przełącznik języka -->
					<UDropdown
						:items="languageItems"
						:popper="{ placement: 'bottom-end' }"
					>
						<UButton color="gray" variant="ghost" icon="i-heroicons-language">
							<span class="sr-only">{{ $t("common.language") }}</span>
						</UButton>
					</UDropdown>

					<!-- Koszyk -->
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-shopping-cart"
						to="/cart"
					>
						<span class="sr-only">{{ $t("common.cart") }}</span>
					</UButton>

					<!-- Menu użytkownika -->
					<UDropdown
						:items="userMenuItems"
						:popper="{ placement: 'bottom-end' }"
					>
						<UButton
							color="gray"
							variant="ghost"
							icon="i-heroicons-user-circle"
						>
							<span class="sr-only">{{ $t("common.account") }}</span>
						</UButton>
					</UDropdown>

					<!-- Przycisk menu mobilnego -->
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-bars-3"
						class="md:hidden"
						@click="isMenuOpen = true"
					>
						<span class="sr-only">{{ $t("common.menu") }}</span>
					</UButton>
				</div>
			</div>
		</div>

		<!-- Menu mobilne -->
		<USlideover v-model="isMenuOpen" side="left">
			<div class="px-4 py-6">
				<div class="flex justify-between items-center mb-6">
					<h2 class="text-lg font-semibold">Lutkowo</h2>
					<UButton
						color="gray"
						variant="ghost"
						icon="i-heroicons-x-mark"
						@click="isMenuOpen = false"
					/>
				</div>
				<nav class="flex flex-col space-y-4">
					<UButton
						v-for="item in menuItems"
						:key="item.title"
						:to="item.route"
						variant="ghost"
						class="justify-start"
						@click="isMenuOpen = false"
					>
						<template #leading>
							<UIcon :name="item.icon" />
						</template>
						{{ $t(item.title) }}
					</UButton>
				</nav>
			</div>
		</USlideover>
	</header>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";

	const { t, locale, locales } = useI18n();
	const isMenuOpen = ref(false);

	// Elementy menu
	const menuItems = [
		{
			title: "common.home",
			route: "/",
			icon: "i-heroicons-home",
		},
		{
			title: "common.shop",
			route: "/shop",
			icon: "i-heroicons-shopping-bag",
		},
		{
			title: "common.about",
			route: "/about",
			icon: "i-heroicons-information-circle",
		},
		{
			title: "common.contact",
			route: "/contact",
			icon: "i-heroicons-envelope",
		},
	];

	// Funkcja przełączania języka
	function switchLanguage(code: "pl" | "en") {
		locale.value = code;
	}

	// Elementy menu języka
	const languageItems = computed(() => {
		return (locales.value || []).map((l: any) => ({
			label: l.name,
			icon:
				l.code === "pl"
					? "i-twemoji-flag-poland"
					: "i-twemoji-flag-united-kingdom",
			onClick: () => switchLanguage(l.code as "pl" | "en"),
		}));
	});

	// Elementy menu użytkownika
	const isLoggedIn = ref(false); // To będzie pobierane ze store'a auth
	const isAdmin = ref(false); // To będzie pobierane ze store'a auth

	const userMenuItems = computed(() => {
		if (isLoggedIn.value) {
			const items = [
				{
					label: t("common.myAccount"),
					icon: "i-heroicons-user",
					to: "/account",
				},
				{
					label: t("common.myOrders"),
					icon: "i-heroicons-clipboard-document-list",
					to: "/account/orders",
				},
			];

			if (isAdmin.value) {
				items.push({
					label: t("admin.dashboard"),
					icon: "i-heroicons-cog-6-tooth",
					to: "/admin",
				});
			}

			items.push({
				label: t("common.logout"),
				icon: "i-heroicons-arrow-right-on-rectangle",
				onClick: () => logout(),
			});

			return items;
		} else {
			return [
				{
					label: t("common.login"),
					icon: "i-heroicons-arrow-right-on-rectangle",
					to: "/login",
				},
				{
					label: t("common.register"),
					icon: "i-heroicons-user-plus",
					to: "/register",
				},
			];
		}
	});

	// Funkcja wylogowania (będzie wykorzystywać store auth)
	function logout() {
		// auth.logout()
		// Przekierowanie po wylogowaniu
		navigateTo("/");
	}
</script>

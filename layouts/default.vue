<template>
	<div class="app-layout">
		<header class="app-header">
			<div class="container">
				<div class="logo-container">
					<h1>Lutkowo</h1>
					<!-- Placeholder na logo -->
				</div>
				<nav class="main-nav">
					<ul>
						<li>
							<NuxtLink to="/">{{ $t("nav.home") }}</NuxtLink>
						</li>
						<li>
							<NuxtLink to="#">{{ $t("nav.about") }}</NuxtLink>
						</li>
						<li>
							<NuxtLink to="#">{{ $t("nav.products") }}</NuxtLink>
						</li>
						<li>
							<NuxtLink to="#">{{ $t("nav.contact") }}</NuxtLink>
						</li>
					</ul>
				</nav>
				<div class="lang-switcher">
					<button
						v-for="locale in availableLocales"
						:key="locale.code"
						@click="switchLanguage(locale.code)"
						:class="{ active: currentLocale === locale.code }"
					>
						{{ locale.code.toUpperCase() }}
					</button>
				</div>
			</div>
		</header>

		<main class="app-content">
			<slot />
		</main>

		<footer class="app-footer">
			<div class="container">
				<div class="footer-logo">
					<p>Lutkowo</p>
				</div>
				<div class="footer-links">
					<p>{{ $t("nav.about") }}</p>
					<p>{{ $t("nav.contact") }}</p>
				</div>
				<div class="footer-socials">
					<span>FB</span>
					<span>IG</span>
				</div>
				<div class="footer-copyright">
					<p>{{ $t("footer.rights") }}</p>
				</div>
			</div>
		</footer>
	</div>
</template>

<script setup>
	const { locale, locales } = useI18n();
	const currentLocale = computed(() => locale.value);
	const availableLocales = computed(() => locales.value);

	const switchLanguage = (localeCode) => {
		locale.value = localeCode;
	};
</script>

<style scoped>
	.app-layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.container {
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1rem;
	}

	.app-header {
		background-color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
		padding: 1rem 0;
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.app-header .container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.main-nav ul {
		display: flex;
		list-style: none;
		gap: 1.5rem;
	}

	.main-nav a {
		color: var(--color-neutral-dark);
		text-decoration: none;
		transition: color 0.3s ease;
	}

	.main-nav a:hover {
		color: var(--color-primary);
	}

	.lang-switcher {
		display: flex;
		gap: 0.5rem;
	}

	.lang-switcher button {
		background: none;
		border: 1px solid var(--color-gray-300);
		border-radius: 4px;
		cursor: pointer;
		padding: 0.25rem 0.5rem;
		color: var(--color-neutral-dark);
		transition: all 0.3s ease;
	}

	.lang-switcher button.active {
		background-color: var(--color-primary);
		color: white;
		border-color: var(--color-primary);
	}

	.lang-switcher button:hover:not(.active) {
		background-color: var(--color-gray-200);
	}

	.app-content {
		flex: 1;
	}

	.app-footer {
		background-color: var(--color-gray-200);
		padding: 2rem 0;
		margin-top: 2rem;
	}

	.app-footer .container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 2rem;
	}

	.footer-copyright {
		grid-column: 1 / -1;
		text-align: center;
		margin-top: 1rem;
		font-size: 0.875rem;
		color: var(--color-gray-600);
	}

	@media (max-width: 768px) {
		.app-header .container {
			flex-direction: column;
			gap: 1rem;
		}

		.main-nav ul {
			flex-wrap: wrap;
			justify-content: center;
		}
	}
</style>

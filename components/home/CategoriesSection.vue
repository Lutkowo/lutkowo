<template>
	<section class="categories-section">
		<div class="container">
			<h2 class="section-title">{{ $t("categories.title") }}</h2>
			<div class="categories-grid">
				<div class="category-card">
					<div class="category-image">
						<img src="/images/categories/kategoria_ceramika.png" alt="Ceramika" />
					</div>
					<h3 class="category-name">{{ $t("categories.ceramics.name") }}</h3>
					<p class="category-description">
						{{ $t("categories.ceramics.description") }}
					</p>
				</div>

				<div class="category-card">
					<div class="category-image">
						<img src="/images/categories/kategoria_szko.png" alt="Szkło" />
					</div>
					<h3 class="category-name">{{ $t("categories.glass.name") }}</h3>
					<p class="category-description">
						{{ $t("categories.glass.description") }}
					</p>
				</div>

				<div class="category-card">
					<div class="category-image">
						<img src="/images/categories/kategoria_makrama.png" alt="Makrama" />
					</div>
					<h3 class="category-name">{{ $t("categories.macrame.name") }}</h3>
					<p class="category-description">
						{{ $t("categories.macrame.description") }}
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
	// No script content needed as data is now fetched from i18n
</script>

<style scoped>
	.categories-section {
		padding: 5rem 0;
		background-color: #f5f5f5;
	}

	.section-title {
		font-family: "Quicksand", sans-serif;
		font-size: 2.5rem;
		color: #5e9cb2;
		text-align: center;
		margin-bottom: 3rem;
		position: relative;
	}

	.section-title::after {
		content: "";
		position: absolute;
		bottom: -10px;
		left: 50%;
		transform: translateX(-50%);
		width: 80px;
		height: 3px;
		background-color: #f0c987;
	}

	.categories-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	.category-card {
		background-color: white;
		border-radius: 12px;
		padding: 2rem;
		text-align: center;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
		transition: transform 0.3s ease;
		overflow: hidden;
	}

	.category-card:hover {
		transform: translateY(-5px);
	}

	.category-image {
		width: 100%;
		height: 180px;
		margin: 0 auto 1.5rem;
		overflow: hidden;
		border-radius: 8px;
	}

	.category-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.category-card:hover .category-image img {
		transform: scale(1.05);
	}

	.category-name {
		font-family: "Quicksand", sans-serif;
		font-size: 1.25rem;
		color: #4a5568;
		margin-bottom: 0.5rem;
	}

	.category-description {
		font-size: 0.9rem;
		color: #718096;
		line-height: 1.5;
	}

	@media (max-width: 992px) {
		.categories-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 768px) {
		.categories-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 576px) {
		.categories-grid {
			grid-template-columns: 1fr;
		}

		.category-image {
			height: 150px;
		}
	}
</style>

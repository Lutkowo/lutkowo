<template>
	<section class="products-section">
		<div class="container">
			<h2 class="section-title">{{ $t("products.title") }}</h2>
			<div class="products-grid">
				<!-- Przykładowe produkty z rzeczywistym obrazem -->
				<div
					v-for="product in exampleProducts"
					:key="product.id"
					class="product-card"
				>
					<div class="product-image">
						<img src="/images/products/example_product.png" :alt="product.name" />
					</div>
					<div class="product-info">
						<h3 class="product-title">{{ product.name }}</h3>
						<p class="product-description">{{ product.description }}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
	// Przykładowe dane o produktach (w prawdziwym scenariuszu pochodziłyby z API/Firebase)
	const exampleProducts = [
		{
			id: 1,
			name: "Ceramiczny wazon",
			description: "Ręcznie robiony wazon w minimalistycznym stylu",
		},
		{
			id: 2,
			name: "Makrama ścienna",
			description: "Dekoracyjna makrama wykonana z naturalnych materiałów",
		},
		{
			id: 3,
			name: "Szklany świecznik",
			description: "Elegancki świecznik z dmuchanego szkła",
		},
		{
			id: 4,
			name: "Ceramiczny kubek",
			description: "Wyjątkowy kubek ręcznie malowany",
		},
		{
			id: 5,
			name: "Gliniany talerz",
			description: "Wytrzymały talerz z naturalnej gliny",
		},
		{
			id: 6,
			name: "Makramowy koszyk",
			description: "Praktyczny koszyk do przechowywania drobiazgów",
		},
	];
</script>

<style scoped>
	.products-section {
		padding: 5rem 0;
		background-color: white;
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

	.products-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 2rem;
	}

	.product-card {
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.product-card:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
	}

	.product-image {
		height: 250px;
		width: 100%;
		overflow: hidden;
	}

	.product-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}

	.product-card:hover .product-image img {
		transform: scale(1.05);
	}

	.product-info {
		padding: 1.5rem;
	}

	.product-title {
		font-family: "Quicksand", sans-serif;
		font-size: 1.25rem;
		color: #4a5568;
		margin-bottom: 0.5rem;
	}

	.product-description {
		font-size: 0.9rem;
		color: #718096;
		line-height: 1.5;
	}

	@media (max-width: 768px) {
		.products-grid {
			grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		}
	}
</style>

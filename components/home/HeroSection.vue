<template>
	<section class="hero-section">
		<div class="container">
			<div class="hero-content">
				<h1 class="hero-title">{{ $t("hero.title") }}</h1>
				<p class="hero-subtitle">{{ $t("hero.subtitle") }}</p>
				<button class="hero-cta">{{ $t("hero.cta") }}</button>
			</div>
		</div>
	</section>
</template>

<style scoped>
	.hero-section {
		background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
			url("/images/hero-placeholder.png");
		background-size: cover;
		background-position: center;
		height: 80vh;
		display: flex;
		align-items: center;
		color: white;
		text-align: center;
	}

	.hero-content {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem;
	}

	.hero-title {
		font-family: "Quicksand", sans-serif;
		font-size: 3rem;
		margin-bottom: 1rem;
		animation: fadeInDown 1s ease-out;
	}

	.hero-subtitle {
		font-size: 1.5rem;
		margin-bottom: 2rem;
		animation: fadeIn 1.5s ease-out;
	}

	.hero-cta {
		background-color: #e88c6a;
		color: white;
		border: none;
		padding: 0.75rem 2rem;
		font-size: 1rem;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		animation: fadeInUp 2s ease-out;
	}

	.hero-cta:hover {
		background-color: #d87d5c;
		transform: translateY(-2px);
	}

	@keyframes fadeInDown {
		from {
			opacity: 0;
			transform: translateY(-20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>

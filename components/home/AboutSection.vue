<template>
	<section class="about-section">
		<div class="container">
			<h2 class="section-title">{{ $t("about.title") }}</h2>
			<div class="about-content">
				<div class="about-image">
					<!-- Placeholder dla zdjęcia pracowni/twórców -->
					<div class="image-placeholder"></div>
				</div>
				<div class="about-text">
					<p>{{ $t("about.paragraph1") }}</p>
					<p>{{ $t("about.paragraph2") }}</p>
					<button class="about-cta">{{ $t("about.cta") }}</button>
				</div>
			</div>
		</div>
	</section>
</template>

<style scoped>
	.about-section {
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

	.about-content {
		display: flex;
		align-items: center;
		gap: 4rem;
	}

	.about-image {
		flex: 1;
	}

	.image-placeholder {
		background-color: #e8e8e8;
		border-radius: 12px;
		height: 400px;
		width: 100%;
	}

	.about-text {
		flex: 1;
	}

	.about-text p {
		font-size: 1.1rem;
		line-height: 1.6;
		margin-bottom: 1.5rem;
		color: #4a5568;
	}

	.about-cta {
		background-color: transparent;
		border: 2px solid #5e9cb2;
		color: #5e9cb2;
		padding: 0.75rem 2rem;
		font-size: 1rem;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		margin-top: 1rem;
	}

	.about-cta:hover {
		background-color: #5e9cb2;
		color: white;
	}

	@media (max-width: 768px) {
		.about-content {
			flex-direction: column;
		}

		.image-placeholder {
			height: 300px;
		}
	}
</style>

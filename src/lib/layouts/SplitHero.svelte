<script lang="ts">
	interface Section {
		title: string;
		content: string;
		image?: string;
		imageAlt?: string;
		ctaText?: string;
		ctaHref?: string;
	}

	interface Props {
		sections?: Section[];
	}

	let { sections = [] }: Props = $props();
</script>

<div class="split-hero">
	{#each sections as section, i}
		<section class="split-section" class:reversed={i % 2 === 1}>
			<div class="split-content">
				<h2>{section.title}</h2>
				<p>{section.content}</p>
				{#if section.ctaText && section.ctaHref}
					<a href={section.ctaHref} class="cta-button">{section.ctaText}</a>
				{/if}
			</div>
			<div class="split-image">
				{#if section.image}
					<img src={section.image} alt={section.imageAlt || ''} />
				{:else}
					<div class="image-placeholder">Image</div>
				{/if}
			</div>
		</section>
	{/each}
</div>

<style>
	.split-hero {
		width: 100%;
	}
	.split-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		gap: 0;
	}
	.split-section.reversed .split-content {
		order: 2;
	}
	.split-section.reversed .split-image {
		order: 1;
	}
	.split-content {
		padding: 80px 48px;
	}
	.split-content h2 {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 24px;
		line-height: 1.2;
	}
	.split-content p {
		font-size: 1.25rem;
		color: #666;
		line-height: 1.7;
		margin-bottom: 32px;
	}
	.cta-button {
		display: inline-block;
		padding: 14px 28px;
		background: #333;
		color: white;
		text-decoration: none;
		border-radius: 8px;
		font-weight: 600;
	}
	.split-image {
		height: 100%;
		min-height: 500px;
		background: #e0e0e0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.split-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.image-placeholder {
		font-size: 1.5rem;
		color: #999;
	}
	@media (max-width: 900px) {
		.split-section {
			grid-template-columns: 1fr;
		}
		.split-section.reversed .split-content {
			order: 0;
		}
		.split-section.reversed .split-image {
			order: 0;
		}
		.split-content {
			padding: 48px 24px;
		}
		.split-image {
			min-height: 300px;
		}
	}
</style>

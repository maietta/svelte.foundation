<script lang="ts">
	interface Props {
		title?: string;
		subtitle?: string;
		ctaText?: string;
		ctaHref?: string;
		variant?: 'default' | 'dark';
	}

	let {
		title = 'Ready to Get Started?',
		subtitle = 'Contact us today to learn how we can help your business grow.',
		ctaText = 'Contact Us',
		ctaHref = '/contact',
		variant = 'default'
	}: Props = $props();
</script>

<section class="cta-section {variant}">
	<div class="cta-content">
		<h2>{title}</h2>
		<p>{subtitle}</p>
		<a href={ctaHref} class="cta-button">{ctaText}</a>
	</div>
</section>

<style>
	.cta-section {
		padding: 80px 24px;
		text-align: center;
	}
	.cta-section.default {
		background: #f5f5f5;
	}
	.cta-section.dark {
		background: #333;
		color: white;
	}
	.cta-content {
		max-width: 600px;
		margin: 0 auto;
	}
	.cta-section.dark .cta-content p {
		color: #ccc;
	}
	.cta-section h2 {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 16px;
	}
	.cta-section p {
		font-size: 1.25rem;
		color: #666;
		margin-bottom: 32px;
	}
	.cta-button {
		display: inline-block;
		padding: 16px 32px;
		background: #333;
		color: white;
		text-decoration: none;
		border-radius: 8px;
		font-weight: 600;
		font-size: 1.125rem;
	}
	.cta-section.dark .cta-button {
		background: white;
		color: #333;
	}
</style>

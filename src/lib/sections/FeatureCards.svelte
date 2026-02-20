<script lang="ts">
	interface Feature {
		icon?: string;
		title: string;
		description: string;
		href?: string;
	}

	interface Props {
		title?: string;
		subtitle?: string;
		features?: Feature[];
		columns?: 2 | 3 | 4;
	}

	let {
		title = 'Our Features',
		subtitle = 'Discover what makes us different',
		features = [],
		columns = 3
	}: Props = $props();

	const gridClass = {
		2: 'grid-2',
		3: 'grid-3',
		4: 'grid-4'
	};
</script>

<section class="features-section">
	<div class="section-header">
		<h2>{title}</h2>
		<p>{subtitle}</p>
	</div>
	<div class="features-grid {gridClass[columns]}">
		{#each features as feature}
			<div class="feature-card">
				{#if feature.icon}
					<div class="feature-icon">{feature.icon}</div>
				{/if}
				<h3>{feature.title}</h3>
				<p>{feature.description}</p>
				{#if feature.href}
					<a href={feature.href} class="feature-link">Learn more</a>
				{/if}
			</div>
		{/each}
	</div>
</section>

<style>
	.features-section {
		padding: 64px 24px;
		max-width: 1200px;
		margin: 0 auto;
	}
	.section-header {
		text-align: center;
		margin-bottom: 48px;
	}
	.section-header h2 {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 16px;
	}
	.section-header p {
		font-size: 1.25rem;
		color: #666;
	}
	.features-grid {
		display: grid;
		gap: 32px;
	}
	.grid-2 {
		grid-template-columns: repeat(2, 1fr);
	}
	.grid-3 {
		grid-template-columns: repeat(3, 1fr);
	}
	.grid-4 {
		grid-template-columns: repeat(4, 1fr);
	}
	.feature-card {
		padding: 32px;
		border: 2px dashed #999;
		border-radius: 12px;
		background: #fafafa;
	}
	.feature-icon {
		font-size: 2.5rem;
		margin-bottom: 16px;
	}
	.feature-card h3 {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 12px;
	}
	.feature-card p {
		color: #666;
		line-height: 1.6;
		margin-bottom: 16px;
	}
	.feature-link {
		color: #333;
		font-weight: 600;
		text-decoration: none;
	}
	.feature-link:hover {
		text-decoration: underline;
	}
	@media (max-width: 768px) {
		.features-grid {
			grid-template-columns: 1fr !important;
		}
	}
</style>

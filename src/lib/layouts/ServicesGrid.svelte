<script lang="ts">
	interface Service {
		icon?: string;
		title: string;
		description: string;
		href?: string;
		features?: string[];
	}

	interface Props {
		title?: string;
		subtitle?: string;
		services?: Service[];
		columns?: 2 | 3 | 4;
		showFeatures?: boolean;
	}

	let {
		title = 'Our Services',
		subtitle = 'What we offer',
		services = [],
		columns = 3,
		showFeatures = true
	}: Props = $props();

	const gridClass = {
		2: 'grid-2',
		3: 'grid-3',
		4: 'grid-4'
	};
</script>

<section class="services-section">
	<div class="section-header">
		<h1>{title}</h1>
		{#if subtitle}
			<p>{subtitle}</p>
		{/if}
	</div>

	<div class="services-grid {gridClass[columns]}">
		{#each services as service}
			<div class="service-card">
				{#if service.icon}
					<div class="service-icon">{service.icon}</div>
				{/if}
				<h2>{service.title}</h2>
				<p>{service.description}</p>
				{#if showFeatures && service.features && service.features.length > 0}
					<ul class="service-features">
						{#each service.features as feature}
							<li>{feature}</li>
						{/each}
					</ul>
				{/if}
				{#if service.href}
					<a href={service.href} class="service-link">Learn more →</a>
				{/if}
			</div>
		{/each}
	</div>
</section>

<style>
	.services-section {
		padding: 64px 24px;
		max-width: 1200px;
		margin: 0 auto;
	}
	.section-header {
		text-align: center;
		margin-bottom: 48px;
	}
	.section-header h1 {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 16px;
	}
	.section-header p {
		font-size: 1.25rem;
		color: #666;
	}
	.services-grid {
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
	.service-card {
		padding: 32px;
		border: 2px dashed #999;
		border-radius: 12px;
		background: #fafafa;
		text-align: center;
	}
	.service-icon {
		font-size: 3rem;
		margin-bottom: 20px;
	}
	.service-card h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 16px;
	}
	.service-card p {
		color: #666;
		line-height: 1.6;
		margin-bottom: 20px;
	}
	.service-features {
		text-align: left;
		list-style: none;
		padding: 0;
		margin-bottom: 20px;
	}
	.service-features li {
		padding: 6px 0;
		padding-left: 20px;
		position: relative;
		color: #555;
	}
	.service-features li::before {
		content: '✓';
		position: absolute;
		left: 0;
		color: #666;
	}
	.service-link {
		display: inline-block;
		color: #333;
		font-weight: 600;
		text-decoration: none;
	}
	.service-link:hover {
		text-decoration: underline;
	}
	@media (max-width: 768px) {
		.services-grid {
			grid-template-columns: 1fr !important;
		}
	}
</style>

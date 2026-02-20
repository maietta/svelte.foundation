<script lang="ts">
	interface PricingFeature {
		text: string;
		included: boolean;
	}

	interface PricingTier {
		name: string;
		price: string;
		period?: string;
		description: string;
		ctaText?: string;
		ctaHref?: string;
		popular?: boolean;
		features: PricingFeature[];
	}

	interface Props {
		title?: string;
		subtitle?: string;
		tiers?: PricingTier[];
	}

	let {
		title = 'Simple, Transparent Pricing',
		subtitle = 'Choose the plan that works best for your business.',
		tiers = []
	}: Props = $props();
</script>

<section class="pricing-section">
	<div class="section-header">
		<h1>{title}</h1>
		{#if subtitle}
			<p>{subtitle}</p>
		{/if}
	</div>

	<div class="tiers" style="--tier-count: {tiers.length}">
		{#each tiers as tier}
			<div class="tier-card" class:popular={tier.popular}>
				{#if tier.popular}
					<div class="popular-badge">Most Popular</div>
				{/if}
				<div class="tier-header">
					<h2>{tier.name}</h2>
					<div class="price">
						<span class="amount">{tier.price}</span>
						{#if tier.period}
							<span class="period">/{tier.period}</span>
						{/if}
					</div>
					<p class="tier-description">{tier.description}</p>
				</div>
				<ul class="features-list">
					{#each tier.features as feature}
						<li class:included={feature.included} class:excluded={!feature.included}>
							<span class="check-icon">{feature.included ? '✓' : '✗'}</span>
							{feature.text}
						</li>
					{/each}
				</ul>
				<a
					href={tier.ctaHref ?? '/contact'}
					class="tier-cta"
					class:cta-primary={tier.popular}
					class:cta-secondary={!tier.popular}
				>
					{tier.ctaText ?? 'Get Started'}
				</a>
			</div>
		{/each}
	</div>
</section>

<style>
	.pricing-section {
		padding: 64px 24px;
		max-width: 1100px;
		margin: 0 auto;
	}
	.section-header {
		text-align: center;
		margin-bottom: 56px;
	}
	.section-header h1 {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 12px;
	}
	.section-header p {
		font-size: 1.125rem;
		opacity: 0.6;
	}
	.tiers {
		display: grid;
		grid-template-columns: repeat(var(--tier-count, 3), 1fr);
		gap: 24px;
		align-items: stretch;
	}
	@media (max-width: 900px) {
		.tiers {
			grid-template-columns: 1fr;
			max-width: 480px;
			margin: 0 auto;
		}
	}
	.tier-card {
		position: relative;
		border: 1px solid oklch(var(--b3));
		border-radius: var(--radius-box);
		padding: 32px;
		display: flex;
		flex-direction: column;
		gap: 24px;
		background: oklch(var(--b1));
	}
	.tier-card.popular {
		border-color: oklch(var(--p));
		box-shadow: 0 0 0 2px oklch(var(--p)/0.3);
	}
	.popular-badge {
		position: absolute;
		top: -12px;
		left: 50%;
		transform: translateX(-50%);
		background: oklch(var(--p));
		color: oklch(var(--pc));
		font-size: 0.75rem;
		font-weight: 600;
		padding: 4px 16px;
		border-radius: 99px;
		white-space: nowrap;
	}
	.tier-header h2 {
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: 8px;
	}
	.price {
		margin-bottom: 8px;
	}
	.amount {
		font-size: 2.5rem;
		font-weight: 800;
	}
	.period {
		font-size: 1rem;
		opacity: 0.5;
	}
	.tier-description {
		font-size: 0.875rem;
		opacity: 0.6;
	}
	.features-list {
		list-style: none;
		padding: 0;
		margin: 0;
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.features-list li {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 0.9rem;
	}
	.features-list li.excluded {
		opacity: 0.35;
	}
	.check-icon {
		font-size: 0.875rem;
		font-weight: 700;
		width: 18px;
		flex-shrink: 0;
	}
	li.included .check-icon {
		color: oklch(var(--su));
	}
	li.excluded .check-icon {
		color: oklch(var(--er));
	}
	.tier-cta {
		display: block;
		text-align: center;
		padding: 12px 24px;
		border-radius: var(--radius-field);
		font-weight: 600;
		font-size: 0.9rem;
		text-decoration: none;
		transition: opacity 0.2s;
	}
	.tier-cta:hover {
		opacity: 0.85;
	}
	.cta-primary {
		background: oklch(var(--p));
		color: oklch(var(--pc));
	}
	.cta-secondary {
		background: oklch(var(--b3));
		color: oklch(var(--bc));
	}
</style>

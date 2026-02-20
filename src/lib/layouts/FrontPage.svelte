<script lang="ts">
	import Hero from '$lib/sections/Hero.svelte';
	import FeatureCards from '$lib/sections/FeatureCards.svelte';
	import CtaSection from '$lib/sections/CtaSection.svelte';

	interface Feature {
		icon?: string;
		title: string;
		description: string;
		href?: string;
	}

	interface Props {
		heroTitle?: string;
		heroSubtitle?: string;
		heroCtaText?: string;
		heroCtaHref?: string;
		showHeroBusinessInfo?: boolean;
		featuresTitle?: string;
		featuresSubtitle?: string;
		features?: Feature[];
		featuresColumns?: 2 | 3 | 4;
		showCta?: boolean;
		ctaTitle?: string;
		ctaSubtitle?: string;
		ctaText?: string;
		ctaHref?: string;
		ctaDark?: boolean;
	}

	let {
		heroTitle = 'Welcome to Our Website',
		heroSubtitle = 'We provide professional services to help your business grow.',
		heroCtaText = 'Get Started',
		heroCtaHref = '/contact',
		showHeroBusinessInfo = false,
		featuresTitle = 'Our Services',
		featuresSubtitle = 'Discover what we can do for you',
		features = [],
		featuresColumns = 3,
		showCta = true,
		ctaTitle = 'Ready to Get Started?',
		ctaSubtitle = 'Contact us today to learn more about our services.',
		ctaText = 'Contact Us',
		ctaHref = '/contact',
		ctaDark = false
	}: Props = $props();
</script>

<div class="front-page">
	<Hero
		title={heroTitle}
		subtitle={heroSubtitle}
		ctaText={heroCtaText}
		ctaHref={heroCtaHref}
		showBusinessInfo={showHeroBusinessInfo}
	/>

	{#if features.length > 0}
		<FeatureCards
			title={featuresTitle}
			subtitle={featuresSubtitle}
			{features}
			columns={featuresColumns}
		/>
	{/if}

	{#if showCta}
		<CtaSection
			title={ctaTitle}
			subtitle={ctaSubtitle}
			{ctaText}
			{ctaHref}
			variant={ctaDark ? 'dark' : 'default'}
		/>
	{/if}
</div>

<style>
	.front-page {
		width: 100%;
	}
</style>

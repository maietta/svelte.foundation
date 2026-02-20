<script lang="ts">
	import { page } from '$app/stores';
	import FrontPage from '$lib/layouts/FrontPage.svelte';
	import { businessInfo } from '$lib/stores/business';

	const services = [
		{
			icon: '💻',
			title: 'Web Development',
			description: 'Custom websites and web applications built with modern technologies.',
			href: '/services/web-development'
		},
		{
			icon: '📱',
			title: 'Mobile Apps',
			description: 'Native and cross-platform mobile applications for iOS and Android.',
			href: '/services/mobile-apps'
		},
		{
			icon: '☁️',
			title: 'Cloud Solutions',
			description: 'Scalable cloud infrastructure and migration services.',
			href: '/services/cloud'
		}
	];
</script>

<svelte:head>
	<title>{$businessInfo.name} - Home</title>
	<meta
		name="description"
		content="Welcome to {$businessInfo.name}. We provide professional services to help your business grow."
	/>
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="{$businessInfo.name} - Home" />
	<meta
		property="og:description"
		content={$businessInfo.tagline ?? ''}
	/>
	<meta
		property="og:image"
		content="{$page.url.origin}/og?{new URLSearchParams({ title: $businessInfo.name, description: $businessInfo.tagline ?? '' })}"
	/>
	<meta
		name="twitter:image"
		content="{$page.url.origin}/og?{new URLSearchParams({ title: $businessInfo.name, description: $businessInfo.tagline ?? '' })}"
	/>
</svelte:head>

<FrontPage
	heroTitle="Building Digital Solutions for Your Business"
	heroSubtitle="We create modern websites, applications, and cloud solutions that help your business thrive in the digital world."
	heroCtaText="Get a Free Consultation"
	heroCtaHref="/contact"
	showHeroBusinessInfo={true}
	featuresTitle="Our Services"
	featuresSubtitle="What we can do for you"
	features={services}
	featuresColumns={3}
	showCta={true}
	ctaTitle="Ready to Start Your Project?"
	ctaSubtitle="Let's discuss how we can help you achieve your goals."
	ctaText="Schedule a Call"
	ctaHref="/contact"
	ctaDark={true}
/>

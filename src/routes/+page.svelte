<script lang="ts">
import FrontPage from '$lib/layouts/FrontPage.svelte';
        import { businessInfo } from '$lib/stores/business';
        import PageHead from '$lib/components/PageHead.svelte';

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

<PageHead
	title="{$businessInfo.name}"
	description={$businessInfo.tagline ?? ''}
	noSuffix={true}
/>

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

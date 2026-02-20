<script lang="ts">
	import Pricing from '$lib/layouts/Pricing.svelte';

	const tiers = [
		{
			name: 'Starter',
			price: '$0',
			period: 'month',
			description: 'Great for individuals and small projects to get started.',
			ctaText: 'Get Started Free',
			ctaHref: '/contact',
			popular: false,
			features: [
				{ text: '1 website', included: true },
				{ text: '5 GB storage', included: true },
				{ text: 'SSL certificate', included: true },
				{ text: 'Email support', included: true },
				{ text: 'Custom domain', included: false },
				{ text: 'Analytics dashboard', included: false },
				{ text: 'Priority support', included: false },
				{ text: 'SLA guarantee', included: false }
			]
		},
		{
			name: 'Professional',
			price: '$49',
			period: 'month',
			description: 'Everything you need to run a professional business online.',
			ctaText: 'Start Free Trial',
			ctaHref: '/contact',
			popular: true,
			features: [
				{ text: '5 websites', included: true },
				{ text: '50 GB storage', included: true },
				{ text: 'SSL certificate', included: true },
				{ text: 'Priority email support', included: true },
				{ text: 'Custom domain', included: true },
				{ text: 'Analytics dashboard', included: true },
				{ text: 'Priority support', included: false },
				{ text: 'SLA guarantee', included: false }
			]
		},
		{
			name: 'Enterprise',
			price: '$199',
			period: 'month',
			description: 'Advanced features and dedicated support for large teams.',
			ctaText: 'Contact Sales',
			ctaHref: '/contact',
			popular: false,
			features: [
				{ text: 'Unlimited websites', included: true },
				{ text: '500 GB storage', included: true },
				{ text: 'SSL certificate', included: true },
				{ text: '24/7 phone support', included: true },
				{ text: 'Custom domain', included: true },
				{ text: 'Analytics dashboard', included: true },
				{ text: 'Priority support', included: true },
				{ text: 'SLA guarantee', included: true }
			]
		}
	];
</script>

<svelte:head>
	<title>Pricing</title>
	<meta name="description" content="Simple, transparent pricing for every stage of your business." />
</svelte:head>

<Pricing
	title="Simple, Transparent Pricing"
	subtitle="No hidden fees. Cancel anytime."
	{tiers}
/>

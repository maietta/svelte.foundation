<script lang="ts">
	import Portfolio from '$lib/layouts/Portfolio.svelte';
	import PageHead from '$lib/components/PageHead.svelte';

	const projects = [
		{
			id: 'proj-1',
			title: 'Merchant Dashboard',
			description:
				'A real-time sales analytics dashboard for a mid-sized e-commerce brand, built with SvelteKit and a WebSocket data pipeline.',
			tags: ['Web', 'Dashboard', 'SvelteKit'],
			year: '2024',
			client: 'RetailCo'
		},
		{
			id: 'proj-2',
			title: 'HealthTrack Mobile App',
			description:
				'Cross-platform health and fitness tracker with wearable sync, progress charts, and daily goal nudges.',
			tags: ['Mobile', 'Design', 'React Native'],
			year: '2024',
			client: 'WellnessLabs'
		},
		{
			id: 'proj-3',
			title: 'Open-Source UI Kit',
			description:
				'A Svelte + Tailwind component library with 60+ accessible, theme-aware components published on npm.',
			tags: ['Web', 'Open Source', 'Design'],
			year: '2023',
			client: 'Community'
		},
		{
			id: 'proj-4',
			title: 'Logistics Dispatch Platform',
			description:
				'Fleet tracking, driver dispatch, and route optimisation system processing 10k+ deliveries per day.',
			tags: ['Web', 'Dashboard', 'Maps'],
			year: '2023',
			client: 'FastFreight'
		},
		{
			id: 'proj-5',
			title: 'Recipe Social Network',
			description:
				'User-generated recipe platform with video uploads, AI-powered ingredient substitution, and meal planning.',
			tags: ['Web', 'Mobile', 'AI'],
			year: '2022',
			client: 'TasteCo'
		},
		{
			id: 'proj-6',
			title: 'Law Firm Intranet',
			description:
				'Secure document management and matter-tracking intranet replacing a legacy system for a 200-person law firm.',
			tags: ['Web', 'Enterprise'],
			year: '2022',
			client: 'Confidential'
		},
		{
			id: 'proj-7',
			title: 'NFT Marketplace',
			description:
				'EVM-compatible marketplace with wallet connection, lazy minting, and auction mechanics.',
			tags: ['Web', 'Web3'],
			year: '2022',
			client: 'PixelVault'
		},
		{
			id: 'proj-8',
			title: 'Brand Identity System',
			description:
				'Full visual identity — logo, typography, colour system, icon set, and motion guidelines for a fintech startup.',
			tags: ['Design', 'Branding'],
			year: '2021',
			client: 'NovaPay'
		},
		{
			id: 'proj-9',
			title: 'City Council Portal',
			description:
				'Public-facing portal for permit applications, council meeting agendas, and resident service requests.',
			tags: ['Web', 'Enterprise', 'Accessibility'],
			year: '2021',
			client: 'Eastbridge Council'
		}
	];
</script>

<PageHead
	title="Portfolio"
	description="A selection of projects we are proud of — from dashboards and mobile apps to open-source tools and enterprise platforms."
	label="Portfolio"
/>

<Portfolio
	title="Our Work"
	subtitle="A selection of projects across web, mobile, design, and enterprise."
	{projects}
/>

<script lang="ts">
	import Timeline from '$lib/layouts/Timeline.svelte';

	const events = [
		{
			id: 'ev-1',
			date: 'January 2018',
			badge: 'Founded',
			title: 'The Beginning',
			description:
				'Two engineers and a designer, one rented desk, and an idea: make great software accessible to growing businesses. The company was incorporated and the first commit was pushed.'
		},
		{
			id: 'ev-2',
			date: 'August 2018',
			badge: 'Product',
			title: 'First Public Beta',
			description:
				'After six months of closed testing with 20 design partners, we opened the beta to the public. 500 people signed up in the first week.'
		},
		{
			id: 'ev-3',
			date: 'March 2019',
			badge: 'Growth',
			title: 'Seed Funding Round',
			description:
				'Closed a £1.2M seed round led by Northstar Ventures to grow the team and accelerate product development.'
		},
		{
			id: 'ev-4',
			date: 'November 2019',
			badge: 'Milestone',
			title: '1,000 Customers',
			description:
				'Reached 1,000 paying customers. Expanded the team to 12 people and moved into a proper office.'
		},
		{
			id: 'ev-5',
			date: 'June 2021',
			badge: 'Product',
			title: 'Mobile App Launch',
			description:
				'Launched native iOS and Android apps. Within 30 days, 40% of active users had moved their primary workflow to mobile.'
		},
		{
			id: 'ev-6',
			date: 'February 2022',
			badge: 'Growth',
			title: 'Series A — £8M',
			description:
				'Closed a Series A round to fund expansion into Europe and North America, and to double the engineering team.'
		},
		{
			id: 'ev-7',
			date: 'October 2023',
			badge: 'Milestone',
			title: '10,000 Customers',
			description:
				'Surpassed 10,000 paying customers across 38 countries. Opened a second office in Lisbon.'
		},
		{
			id: 'ev-8',
			date: 'Today',
			badge: 'Now',
			title: 'Still Building',
			description:
				'We are 60 people, proudly bootstrapped beyond the Series A, and focused on shipping high-quality software that our customers love to use every day.'
		}
	];
</script>

<svelte:head>
	<title>Our Story</title>
	<meta name="description" content="The milestones that shaped our company." />
</svelte:head>

<Timeline
	title="Our Story"
	subtitle="From a rented desk to 10,000 customers — the milestones that shaped us."
	{events}
	orientation="alternate"
/>

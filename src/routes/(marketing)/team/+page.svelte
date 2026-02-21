<script lang="ts">
	import Team from '$lib/layouts/Team.svelte';
	import PageHead from '$lib/components/PageHead.svelte';

	const members = [
		{
			name: 'Alex Morgan',
			role: 'Chief Executive Officer',
			bio: 'Visionary leader with 15+ years in digital product development and strategic growth.',
			social: { linkedin: '#', twitter: '#', email: 'alex@example.com' }
		},
		{
			name: 'Jordan Lee',
			role: 'Chief Technology Officer',
			bio: 'Full-stack engineer and systems architect specialising in scalable cloud infrastructure.',
			social: { github: '#', linkedin: '#', email: 'jordan@example.com' }
		},
		{
			name: 'Sam Rivera',
			role: 'Head of Design',
			bio: 'UX/UI designer passionate about accessible, beautiful digital experiences.',
			social: { linkedin: '#', twitter: '#' }
		},
		{
			name: 'Casey Park',
			role: 'Lead Backend Engineer',
			bio: 'Rust and Go enthusiast. Builds fast, reliable APIs and distributed systems.',
			social: { github: '#', linkedin: '#' }
		},
		{
			name: 'Taylor Brooks',
			role: 'Senior Frontend Engineer',
			bio: 'Svelte devotee. Obsessed with performance, animations, and accessibility.',
			social: { github: '#', twitter: '#' }
		},
		{
			name: 'Drew Kim',
			role: 'DevOps Engineer',
			bio: 'Hardened Linux, rootless Docker, and CI/CD pipelines are where he shines.',
			social: { github: '#', linkedin: '#' }
		}
	];
</script>

<PageHead
	title="Our Team"
	description="Meet the people behind the work — engineers, designers, and strategists dedicated to building great products."
	label="Team"
/>

<Team
	title="Meet Our Team"
	subtitle="A small but mighty group of engineers, designers, and strategists."
	{members}
	columns={3}
/>

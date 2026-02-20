<script lang="ts">
	import Testimonials from '$lib/layouts/Testimonials.svelte';
	import CtaSection from '$lib/sections/CtaSection.svelte';
</script>

<svelte:head>
	<title>Client Testimonials | PremoWeb LLC</title>
	<meta
		name="description"
		content="See what our clients say about working with PremoWeb — real results from web development, mobile, cloud, security, and consulting projects."
	/>
</svelte:head>

<Testimonials
	title="What Our Clients Say"
	subtitle="We measure success by the success of the businesses we work with."
	columns={3}
	testimonials={[
		{
			name: 'Rachel Torres',
			role: 'Head of Marketing',
			company: 'Meridian Retail Co.',
			service: 'Web Development',
			rating: 5,
			quote:
				'Our new SvelteKit site loads in under a second and our conversion rate went up 34% in the first month. The team was thorough, communicative, and delivered exactly what they promised.'
		},
		{
			name: 'James Okafor',
			role: 'CTO',
			company: 'Northfield Logistics',
			service: 'Cloud & Infrastructure',
			rating: 5,
			quote:
				'They migrated us off a bloated managed cloud setup onto self-hosted rootless Docker and our monthly infrastructure bill dropped by 60%. The security hardening gave our compliance team peace of mind.'
		},
		{
			name: 'Sofia Kline',
			role: 'Product Manager',
			company: 'Atrium Health Apps',
			service: 'Mobile Development',
			rating: 5,
			quote:
				'We launched a PWA that genuinely rivals the native apps our competitors ship. Users love it, app store reviews are gone, and we maintain one codebase. Couldn\'t be happier.'
		},
		{
			name: 'Derek Wan',
			role: 'Founder',
			company: 'Stackfire SaaS',
			service: 'API & Middleware',
			rating: 5,
			quote:
				'They redesigned our internal API layer using gRPC and the performance difference was immediate. Response times dropped from 400ms to under 40ms. Our team calls it the best investment we made this year.'
		},
		{
			name: 'Monica Lester',
			role: 'Operations Director',
			company: 'Crestwood Manufacturing',
			service: 'Desktop Applications',
			rating: 5,
			quote:
				'The Tauri app they built replaced a clunky Electron tool we\'d been stuck with for years. It starts instantly, uses a fraction of the memory, and the team even added offline support we didn\'t ask for — it turned out to be essential.'
		},
		{
			name: 'Theo Bergmann',
			role: 'Lead Engineer',
			company: 'Surefire Devices',
			service: 'Firmware Development',
			rating: 5,
			quote:
				'Rewriting our sensor firmware in Rust eliminated an entire class of memory bugs we\'d been chasing for two years. The code is smaller, faster, and finally passes our safety audits without exceptions.'
		},
		{
			name: 'Priya Nair',
			role: 'CEO',
			company: 'DataBridge Analytics',
			service: 'Web Scraping & Data',
			rating: 5,
			quote:
				'They built us a compliant, rate-limited scraping pipeline that feeds our dashboard in real time. It handles rate limits and IP rotation gracefully and has had zero downtime in four months.'
		},
		{
			name: 'Carlos Medina',
			role: 'VP of Engineering',
			company: 'FinPath Technologies',
			service: 'Security & Recovery',
			rating: 5,
			quote:
				'After a scary breach incident, they handled our forensic review, cleaned everything up, and hardened our stack in under two weeks. The 20-point checklist they apply to every project is the real deal.'
		},
		{
			name: 'Hannah Bryce',
			role: 'Design Lead',
			company: 'Luminary Studios',
			service: 'UI/UX Design',
			rating: 5,
			quote:
				'Our design system went from a Figma file nobody followed to a living component library the whole team actually uses. Consistency across our product improved overnight and onboarding new devs is so much faster.'
		},
		{
			name: 'Alan Foster',
			role: 'Managing Director',
			company: 'Ironclad Consulting Group',
			service: 'Technical Consulting',
			rating: 5,
			quote:
				'The architecture review surfaced three scaling bottlenecks we had no idea were there. The written report was detailed enough that our internal team could execute the fixes without additional hand-holding. Exceptional value.'
		},
		{
			name: 'Nina Chakraborty',
			role: 'E-commerce Director',
			company: 'Bloom & Co.',
			service: 'Web Development',
			rating: 5,
			quote:
				'We\'d worked with two other agencies before PremoWeb. Night and day difference. They actually understood our business goals, not just the technical spec. The site is beautiful and it sells.'
		},
		{
			name: 'Grant Tillman',
			role: 'IT Manager',
			company: 'Cascade Property Group',
			service: 'Cloud & Infrastructure',
			rating: 5,
			quote:
				'Rootless Docker in production sounded risky to my team at first. After 90 days in production with zero incidents and a dramatically smaller attack surface, we\'re convinced. They held our hand through every step.'
		}
	]}
/>

<CtaSection
	variant="dark"
	title="Ready to start your next project?"
	subtitle="Book a free consultation and let's talk about what we can build together — no obligation, no sales pressure."
	ctaText="Get Your Free Consultation"
	ctaHref="/contact"
/>

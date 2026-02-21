<script lang="ts">
	import ServicesGrid from '$lib/layouts/ServicesGrid.svelte';
	import PageHead from '$lib/components/PageHead.svelte';

	const services = [
		{
			icon: '💻',
			title: 'Web Development',
			description:
				'Custom websites and web applications built with modern technologies like SvelteKit, React, and more.',
			href: '/services/web-development',
			features: ['SvelteKit & Svelte 5', 'React & Next.js', 'TypeScript', 'REST & GraphQL APIs']
		},
		{
			icon: '🖥️',
			title: 'Desktop Applications',
			description: 'Lightweight, performant cross-platform desktop apps with Tauri and Svelte.',
			href: '/services/desktop-apps',
			features: ['Tauri', 'Svelte', 'Cross-Platform', 'ARM Support']
		},
		{
			icon: '📱',
			title: 'Mobile Development',
			description:
				'Native and cross-platform mobile applications for iOS and Android that engage your users.',
			href: '/services/mobile',
			features: ['React Native', 'iOS (Swift)', 'Android (Kotlin)', 'PWA Development']
		},
		{
			icon: '☁️',
			title: 'Cloud Solutions',
			description: 'Secure, high-performance hosting on our own hardened Linux infrastructure.',
			href: '/services/cloud',
			features: ['Hardened Linux', 'Rootless Docker', 'Firejailed Apps', 'Global CDN']
		},
		{
			icon: '🔧',
			title: 'Firmware Development',
			description:
				'Custom firmware development in Assembly, Go, Rust, and Zig for embedded systems.',
			href: '/services/firmware-development',
			features: ['Assembly', 'Go', 'Rust', 'Zig']
		},
		{
			icon: '🔌',
			title: 'API & Middleware',
			description: 'Custom API development, middleware solutions, and system integrations.',
			href: '/services/api-development',
			features: ['REST APIs', 'gRPC', 'GraphQL', 'Integrations']
		},
		{
			icon: '🕷️',
			title: 'Web Scraping & Data Mining',
			description: 'Ethical web scraping and data extraction services for business intelligence.',
			href: '/services/web-scraping',
			features: [
				'Data Extraction',
				'Business Intelligence',
				'Automated Collection',
				'Custom Scrapers'
			]
		},
		{
			icon: '🛡️',
			title: 'Security & Recovery',
			description:
				'Website security hardening, malware removal, and hacked site recovery services.',
			href: '/services/security-recovery',
			features: ['Malware Removal', 'Security Hardening', 'Incident Response', 'Forensic Analysis']
		},
		{
			icon: '🎨',
			title: 'UI/UX Design',
			description: 'Beautiful, intuitive user interfaces designed with your users in mind.',
			href: '/services/design',
			features: ['User Research', 'Wireframing & Prototyping', 'Design Systems', 'Accessibility']
		},
		{
			icon: '📊',
			title: 'Consulting',
			description: 'Expert advice on technology strategy, architecture, and best practices.',
			href: '/services/consulting',
			features: ['Architecture Review', 'Tech Strategy', 'Team Training', 'Code Reviews']
		}
	];
</script>

<PageHead
	title="Services"
	description="Web development, mobile apps, cloud infrastructure, firmware, API design, and more — built to grow your business."
	label="Services"
/>

<ServicesGrid {services} columns={3} />

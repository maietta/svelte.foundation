<script lang="ts">
	import { page } from '$app/stores';
	import SplitHero from '$lib/layouts/SplitHero.svelte';
	import CtaSection from '$lib/sections/CtaSection.svelte';

	const servicesData: Record<
		string,
		{
			title: string;
			description: string;
			icon: string;
			features: string[];
			content: { title: string; text: string }[];
		}
	> = {
		'web-development': {
			title: 'Web Development',
			description: 'Custom websites and web applications built with modern technologies.',
			icon: '💻',
			features: ['SvelteKit & Svelte 5', 'React & Next.js', 'TypeScript', 'REST & GraphQL APIs'],
			content: [
				{
					title: 'Modern Frameworks',
					text: 'We build fast, responsive websites using the latest frameworks like SvelteKit, React, and Next.js. Our developers stay up-to-date with the newest technologies to deliver the best results.'
				},
				{
					title: 'Custom Solutions',
					text: 'Every business is unique. We create tailor-made solutions that fit your specific needs, from simple landing pages to complex web applications.'
				},
				{
					title: 'Performance Focused',
					text: 'Speed matters. We optimize every aspect of your website to ensure fast load times and smooth user experiences across all devices.'
				}
			]
		},
		'desktop-apps': {
			title: 'Desktop Applications',
			description: 'Lightweight, performant cross-platform desktop apps with Tauri and Svelte.',
			icon: '🖥️',
			features: ['Tauri', 'Svelte', 'Cross-Platform', 'ARM Support'],
			content: [
				{
					title: 'Our Stack',
					text: 'Tauri with Svelte is our preferred stack for building desktop applications. It combines the performance of Rust with the simplicity of Svelte for a truly lightweight experience.'
				},
				{
					title: 'Cross-Platform',
					text: 'Build once, deploy everywhere. Our applications run natively on Linux, BSD, Windows, and macOS without modification.'
				},
				{
					title: 'Multi-Architecture',
					text: 'We support x86_64, ARM64, ARMv7, and other architectures. Perfect for embedded systems, servers, and consumer hardware.'
				},
				{
					title: 'Small Footprint',
					text: 'Tauri apps are a fraction of the size of Electron apps, with faster startup times and lower memory usage.'
				}
			]
		},
		mobile: {
			title: 'Mobile Development',
			description: 'Native and cross-platform mobile applications for iOS and Android.',
			icon: '📱',
			features: ['React Native', 'iOS (Swift)', 'Android (Kotlin)', 'PWA Development'],
			content: [
				{
					title: 'Cross-Platform',
					text: 'Reach more users with a single codebase. Our React Native solutions work seamlessly on both iOS and Android.'
				},
				{
					title: 'Native Performance',
					text: 'For the best possible performance, we also offer native iOS and Android development using Swift and Kotlin.'
				},
				{
					title: 'PWA Options',
					text: 'Progressive Web Apps provide an app-like experience without the app store requirements.'
				}
			]
		},
		cloud: {
			title: 'Cloud Solutions',
			description: 'Secure, high-performance hosting on our own hardened Linux infrastructure.',
			icon: '☁️',
			features: ['Hardened Linux', 'Rootless Docker', 'Firejailed Apps', 'Global CDN'],
			content: [
				{
					title: 'Our Own Infrastructure',
					text: 'We own and operate our entire cloud infrastructure, not just renting servers. Every component is designed and maintained by our team for maximum control and security.'
				},
				{
					title: 'Hardened Linux',
					text: 'Our servers run hardened Linux distributions with security patches applied promptly. We go beyond standard hardening to protect your data.'
				},
				{
					title: 'Rootless Docker',
					text: 'Container isolation with rootless Docker ensures that even if a container is compromised, the host system remains secure.'
				},
				{
					title: 'Firejailed Applications',
					text: 'Every application runs in a Firejail sandbox, providing an additional layer of security through mandatory access control and namespace isolation.'
				}
			]
		},
		'firmware-development': {
			title: 'Firmware Development',
			description:
				'Custom firmware development in Assembly, Go, Rust, and Zig for embedded systems.',
			icon: '🔧',
			features: ['Assembly', 'Go', 'Rust', 'Zig'],
			content: [
				{
					title: 'Low-Level Expertise',
					text: 'We develop firmware at the metal level, optimizing for performance, size, and reliability in resource-constrained environments.'
				},
				{
					title: 'Memory-Safe Languages',
					text: 'Leverage Rust and Zig for memory-safe firmware that prevents common vulnerabilities like buffer overflows.'
				},
				{
					title: 'Assembly Optimization',
					text: 'Critical performance code written in Assembly for maximum efficiency in embedded applications.'
				},
				{
					title: 'Cross-Platform',
					text: 'Firmware for ARM, x86, AVR, PIC, and other architectures.'
				}
			]
		},
		'api-development': {
			title: 'API & Middleware',
			description: 'Custom API development, middleware solutions, and system integrations.',
			icon: '🔌',
			features: ['REST APIs', 'GraphQL', 'gRPC', 'Integrations'],
			content: [
				{
					title: 'API Design',
					text: 'We design and build robust APIs following industry best practices, with comprehensive documentation.'
				},
				{
					title: 'Middleware Solutions',
					text: 'Custom middleware to connect disparate systems, handle data transformations, and orchestrate workflows.'
				},
				{
					title: 'System Integrations',
					text: 'Connect your existing systems with third-party services, ERPs, CRMs, and more.'
				},
				{
					title: 'Real-Time Data',
					text: 'WebSocket, Server-Sent Events, and streaming solutions for real-time communication.'
				}
			]
		},
		'web-scraping': {
			title: 'Web Scraping & Data Mining',
			description: 'Ethical web scraping and data extraction services for business intelligence.',
			icon: '🕷️',
			features: [
				'Data Extraction',
				'Business Intelligence',
				'Automated Collection',
				'Custom Scrapers'
			],
			content: [
				{
					title: 'Ethical Scraping',
					text: 'We build respectful, rate-limited scrapers that follow robots.txt and terms of service.'
				},
				{
					title: 'Data Processing',
					text: 'Raw data cleaned, structured, and delivered in usable formats like JSON, CSV, or directly to your database.'
				},
				{
					title: 'Automation',
					text: 'Scheduled data collection that runs automatically, keeping your data fresh without manual intervention.'
				},
				{
					title: 'Complex Targets',
					text: 'JavaScript-heavy sites, APIs, and data behind authentication handled with headless browsers.'
				}
			]
		},
		'security-recovery': {
			title: 'Security & Recovery',
			description:
				'Website security hardening, malware removal, and hacked site recovery services.',
			icon: '🛡️',
			features: ['Malware Removal', 'Security Hardening', 'Incident Response', 'Forensic Analysis'],
			content: [
				{
					title: 'Hacked Site Recovery',
					text: 'We quickly identify and remove malware, backdoors, and compromised code to restore your website.'
				},
				{
					title: 'Security Hardening',
					text: 'Fortify your website against future attacks with config hardening, file permissions, and firewall rules.'
				},
				{
					title: 'Incident Response',
					text: 'Rapid response when security incidents occur, minimizing damage and downtime.'
				},
				{
					title: 'Forensic Analysis',
					text: 'Determine how the breach occurred and what data was compromised.'
				},
				{
					title: 'Ongoing Monitoring',
					text: 'Continuous monitoring for suspicious activity and early threat detection.'
				}
			]
		},
		design: {
			title: 'UI/UX Design',
			description: 'Beautiful, intuitive user interfaces designed with your users in mind.',
			icon: '🎨',
			features: ['User Research', 'Wireframing & Prototyping', 'Design Systems', 'Accessibility'],
			content: [
				{
					title: 'User-Centered Design',
					text: 'We research your users to create interfaces that meet their needs and expectations.'
				},
				{
					title: 'Design Systems',
					text: 'Maintain consistency across your products with comprehensive design systems.'
				},
				{
					title: 'Accessibility',
					text: 'We ensure your digital products are accessible to everyone, including users with disabilities.'
				}
			]
		},
		security: {
			title: 'Security',
			description: 'Comprehensive security audits and implementation to protect your applications.',
			icon: '🔒',
			features: ['Penetration Testing', 'Code Audits', 'Security Best Practices', 'Compliance'],
			content: [
				{
					title: 'Security Audits',
					text: 'Identify vulnerabilities before attackers do with comprehensive security assessments.'
				},
				{
					title: 'Best Practices',
					text: 'We implement industry-standard security practices throughout your development lifecycle.'
				},
				{
					title: 'Compliance',
					text: 'Stay compliant with relevant regulations like GDPR, HIPAA, and PCI-DSS.'
				}
			]
		},
		consulting: {
			title: 'Consulting',
			description: 'Expert advice on technology strategy, architecture, and best practices.',
			icon: '📊',
			features: ['Architecture Review', 'Tech Strategy', 'Team Training', 'Code Reviews'],
			content: [
				{
					title: 'Technology Strategy',
					text: 'Align your technology investments with your business goals.'
				},
				{
					title: 'Architecture',
					text: 'Get expert guidance on designing scalable, maintainable systems.'
				},
				{
					title: 'Team Development',
					text: 'We help your team grow with training and knowledge transfer.'
				}
			]
		}
	};

	const slug = $derived($page.params.slug);
	const service = $derived(servicesData[slug ?? '']);

	const heroSections = $derived(
		service
			? [
					{
						title: service.title,
						content: service.description,
						ctaText: 'Get Started',
						ctaHref: '/contact'
					}
				]
			: []
	);
</script>

<svelte:head>
	<title>{service?.title ?? 'Service'} | Services</title>
	<meta name="description" content={service?.description ?? ''} />
</svelte:head>

{#if service}
	<div class="service-detail">
		<section class="service-hero">
			<div class="service-icon">{service.icon}</div>
			<h1>{service.title}</h1>
			<p class="description">{service.description}</p>
			<ul class="features">
				{#each service.features as feature}
					<li>{feature}</li>
				{/each}
			</ul>
		</section>

		<section class="service-content">
			{#each service.content as item}
				<div class="content-block">
					<h2>{item.title}</h2>
					<p>{item.text}</p>
				</div>
			{/each}
		</section>

		<CtaSection
			title="Ready to get started?"
			subtitle="Contact us today to discuss your project."
			ctaText="Get in Touch"
			ctaHref="/contact"
		/>
	</div>
{:else}
	<div class="not-found">
		<h1>Service Not Found</h1>
		<p>The service you're looking for doesn't exist.</p>
		<a href="/services">← Back to Services</a>
	</div>
{/if}

<style>
	.service-detail {
		max-width: 900px;
		margin: 0 auto;
		padding: 64px 24px;
	}
	.service-hero {
		text-align: center;
		margin-bottom: 64px;
		padding-bottom: 48px;
		border-bottom: 2px dashed #ccc;
	}
	.service-icon {
		font-size: 4rem;
		margin-bottom: 24px;
	}
	.service-hero h1 {
		font-size: 3rem;
		font-weight: bold;
		margin-bottom: 16px;
	}
	.description {
		font-size: 1.25rem;
		color: #666;
		margin-bottom: 32px;
	}
	.features {
		list-style: none;
		padding: 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 12px;
	}
	.features li {
		padding: 8px 16px;
		background: #f0f0f0;
		border-radius: 20px;
		font-size: 0.875rem;
	}
	.service-content {
		margin-bottom: 64px;
	}
	.content-block {
		margin-bottom: 48px;
		padding: 32px;
		border: 2px dashed #ccc;
		border-radius: 12px;
		background: #fafafa;
	}
	.content-block h2 {
		font-size: 1.5rem;
		font-weight: 600;
		margin-bottom: 16px;
	}
	.content-block p {
		color: #555;
		line-height: 1.7;
	}
	.not-found {
		text-align: center;
		padding: 64px 24px;
	}
	.not-found h1 {
		font-size: 2rem;
		margin-bottom: 16px;
	}
	.not-found p {
		color: #666;
		margin-bottom: 24px;
	}
</style>

import { writable, derived } from 'svelte/store';

/** Converts a category display name to a URL-safe slug. */
export function slugifyCategory(cat: string): string {
	return cat
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '');
}

/** Find a category display name from a URL slug. */
export function categoryFromSlug(slug: string, posts: BlogPost[]): string | undefined {
	for (const post of posts) {
		const match = (post.categories ?? []).find((c) => slugifyCategory(c) === slug);
		if (match) return match;
	}
	return undefined;
}

export interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	author?: string;
	image?: string;
	categories?: string[];
	readTime?: string;
}

export const blogPosts = writable<BlogPost[]>([
	// --- Web Development ---
	{
		slug: 'getting-started-with-sveltekit',
		title: 'Getting Started with SvelteKit',
		excerpt: 'Learn how to build modern web applications with SvelteKit, from setup to deployment.',
		date: '2024-01-15',
		author: 'John Doe',
		readTime: '5 min read',
		categories: ['Tutorial', 'Web Development']
	},
	{
		slug: 'why-we-build-with-sveltekit',
		title: 'Why We Build Everything with SvelteKit',
		excerpt:
			'SvelteKit offers a compelling combination of performance, developer experience, and flexibility. Here is why it is our framework of choice for every web project.',
		date: '2024-02-10',
		author: 'Jane Smith',
		readTime: '6 min read',
		categories: ['Web Development', 'SvelteKit']
	},
	{
		slug: 'typescript-with-svelte',
		title: 'Using TypeScript with Svelte',
		excerpt:
			'Get started with TypeScript in your Svelte projects for better type safety and developer experience.',
		date: '2023-12-28',
		author: 'Jane Smith',
		readTime: '8 min read',
		categories: ['Tutorial', 'Web Development']
	},

	// --- Desktop Applications ---
	{
		slug: 'building-desktop-apps-with-tauri',
		title: 'Building Desktop Apps with Tauri and Svelte',
		excerpt:
			'Tauri lets you ship tiny, fast desktop applications that look and feel native. We walk through how we use Svelte as the frontend layer for Tauri projects.',
		date: '2024-03-05',
		author: 'John Doe',
		readTime: '9 min read',
		categories: ['Desktop', 'Tauri']
	},
	{
		slug: 'tauri-vs-electron',
		title: 'Tauri vs Electron: Why We Made the Switch',
		excerpt:
			'Electron ships a full Chromium runtime. Tauri uses the system WebView and a Rust core — the result is a 10x smaller binary and dramatically lower memory usage.',
		date: '2024-03-18',
		author: 'Jane Smith',
		readTime: '7 min read',
		categories: ['Desktop', 'Performance']
	},

	// --- Mobile Development ---
	{
		slug: 'mobile-pwa-vs-native',
		title: 'PWA vs Native App: Choosing the Right Approach',
		excerpt:
			'Progressive Web Apps have closed the gap on native apps for most use cases. We break down when to go native and when a PWA is the smarter, faster choice.',
		date: '2024-01-28',
		author: 'John Doe',
		readTime: '8 min read',
		categories: ['Mobile', 'PWA']
	},
	{
		slug: 'react-native-for-cross-platform-apps',
		title: 'React Native in 2024: Cross-Platform Done Right',
		excerpt:
			'React Native continues to mature as a cross-platform solution. Discover how we structure React Native projects to share maximum code between iOS and Android.',
		date: '2024-02-20',
		author: 'Jane Smith',
		readTime: '10 min read',
		categories: ['Mobile', 'React Native']
	},

	// --- Cloud Solutions ---
	{
		slug: 'hardened-linux-hosting',
		title: 'Why We Self-Host on Hardened Linux',
		excerpt:
			'Cloud managed services are convenient but opinionated. We run our own hardened Linux infrastructure with rootless Docker and Firejail to give clients full control and security.',
		date: '2024-04-02',
		author: 'John Doe',
		readTime: '11 min read',
		categories: ['Cloud', 'Security']
	},
	{
		slug: 'rootless-docker-in-production',
		title: 'Running Rootless Docker in Production',
		excerpt:
			'Running Docker as root is a well-known attack surface. We outline how we deploy all client workloads with rootless Docker and why you should too.',
		date: '2024-04-15',
		author: 'Jane Smith',
		readTime: '8 min read',
		categories: ['Cloud', 'Docker']
	},

	// --- Firmware Development ---
	{
		slug: 'rust-for-embedded-systems',
		title: 'Rust for Embedded Systems: Safety at the Hardware Level',
		excerpt:
			'Rust eliminates entire classes of bugs — buffer overflows, null pointer dereferences, race conditions — that are endemic to C-based firmware. Here is how we use it in production.',
		date: '2024-05-01',
		author: 'John Doe',
		readTime: '12 min read',
		categories: ['Firmware', 'Rust']
	},

	// --- API & Middleware ---
	{
		slug: 'grpc-vs-rest-for-internal-apis',
		title: 'gRPC vs REST for Internal APIs',
		excerpt:
			'REST is ubiquitous, but gRPC offers strongly typed contracts, bidirectional streaming, and dramatically better performance for service-to-service communication.',
		date: '2024-03-22',
		author: 'Jane Smith',
		readTime: '9 min read',
		categories: ['API', 'Backend']
	},

	// --- Web Scraping & Data Mining ---
	{
		slug: 'ethical-web-scraping-guide',
		title: 'The Developer\'s Guide to Ethical Web Scraping',
		excerpt:
			'Web scraping is a powerful tool for business intelligence when done responsibly. We cover rate limiting, robots.txt compliance, and building scrapers that respect the sites they read.',
		date: '2024-01-20',
		author: 'John Doe',
		readTime: '7 min read',
		categories: ['Web Scraping', 'Data']
	},

	// --- Security & Recovery ---
	{
		slug: 'website-security-hardening-checklist',
		title: 'Website Security Hardening: Our 20-Point Checklist',
		excerpt:
			'From HTTP headers to dependency audits, here is the exact checklist we run on every project before it goes to production — and on any hacked site we take on for recovery.',
		date: '2024-02-05',
		author: 'Jane Smith',
		readTime: '13 min read',
		categories: ['Security', 'Best Practices']
	},
	{
		slug: 'what-to-do-when-your-site-is-hacked',
		title: 'What To Do When Your Website Gets Hacked',
		excerpt:
			'Discovering your site has been compromised is stressful. This step-by-step guide walks you through containment, forensic analysis, cleanup, and hardening so it does not happen again.',
		date: '2024-02-18',
		author: 'John Doe',
		readTime: '10 min read',
		categories: ['Security', 'Recovery']
	},

	// --- UI/UX Design ---
	{
		slug: 'responsive-design-best-practices',
		title: 'Responsive Design Best Practices',
		excerpt:
			'Discover the essential techniques for creating websites that look great on any device.',
		date: '2024-01-10',
		author: 'Jane Smith',
		readTime: '7 min read',
		categories: ['Design', 'CSS']
	},
	{
		slug: 'building-accessible-websites',
		title: 'Building Accessible Websites',
		excerpt:
			'Learn how to create websites that are accessible to everyone, including users with disabilities.',
		date: '2023-12-20',
		author: 'John Doe',
		readTime: '10 min read',
		categories: ['Design', 'Accessibility']
	},
	{
		slug: 'design-systems-for-growing-products',
		title: 'Why Every Product Needs a Design System',
		excerpt:
			'Ad-hoc UI decisions compound into inconsistency at scale. A design system — tokens, components, and documented patterns — keeps your product coherent as it grows.',
		date: '2024-04-28',
		author: 'Jane Smith',
		readTime: '8 min read',
		categories: ['Design', 'UI/UX']
	},

	// --- Consulting ---
	{
		slug: 'architecture-review-what-to-expect',
		title: 'What to Expect from a Technical Architecture Review',
		excerpt:
			'An architecture review surfaces bottlenecks, security gaps, and scaling limits before they become emergencies. Here is how we structure ours and what clients typically discover.',
		date: '2024-05-10',
		author: 'John Doe',
		readTime: '9 min read',
		categories: ['Consulting', 'Architecture']
	},
	{
		slug: 'seo-tips-for-developers',
		title: 'SEO Tips for Web Developers',
		excerpt:
			'Improve your website visibility with these essential search engine optimization tips.',
		date: '2024-01-05',
		author: 'John Doe',
		readTime: '6 min read',
		categories: ['Consulting', 'SEO']
	},
	{
		slug: 'state-management-in-svelte',
		title: 'State Management in Svelte',
		excerpt: 'Explore different approaches to managing state in your Svelte applications.',
		date: '2023-12-15',
		author: 'Jane Smith',
		readTime: '6 min read',
		categories: ['Tutorial', 'Web Development']
	}
]);

/** All unique categories derived from the blog posts, sorted alphabetically. */
export const allCategories = derived(blogPosts, ($posts) => {
	const seen = new Map<string, string>(); // slug → display name
	for (const post of $posts) {
		for (const cat of post.categories ?? []) {
			const slug = slugifyCategory(cat);
			if (!seen.has(slug)) seen.set(slug, cat);
		}
	}
	return Array.from(seen.entries())
		.map(([slug, name]) => ({ slug, name }))
		.sort((a, b) => a.name.localeCompare(b.name));
});

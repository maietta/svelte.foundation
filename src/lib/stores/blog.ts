import { writable } from 'svelte/store';

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
	{
		slug: 'getting-started-with-sveltekit',
		title: 'Getting Started with SvelteKit',
		excerpt: 'Learn how to build modern web applications with SvelteKit, from setup to deployment.',
		date: '2024-01-15',
		author: 'John Doe',
		readTime: '5 min read',
		categories: ['Tutorial', 'SvelteKit']
	},
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
		slug: 'seo-tips-for-developers',
		title: 'SEO Tips for Web Developers',
		excerpt:
			'Improve your website visibility with these essential search engine optimization tips.',
		date: '2024-01-05',
		author: 'John Doe',
		readTime: '6 min read',
		categories: ['SEO', 'Marketing']
	},
	{
		slug: 'typescript-with-svelte',
		title: 'Using TypeScript with Svelte',
		excerpt:
			'Get started with TypeScript in your Svelte projects for better type safety and developer experience.',
		date: '2023-12-28',
		author: 'Jane Smith',
		readTime: '8 min read',
		categories: ['Tutorial', 'TypeScript']
	},
	{
		slug: 'building-accessible-websites',
		title: 'Building Accessible Websites',
		excerpt:
			'Learn how to create websites that are accessible to everyone, including users with disabilities.',
		date: '2023-12-20',
		author: 'John Doe',
		readTime: '10 min read',
		categories: ['Accessibility', 'Best Practices']
	},
	{
		slug: 'state-management-in-svelte',
		title: 'State Management in Svelte',
		excerpt: 'Explore different approaches to managing state in your Svelte applications.',
		date: '2023-12-15',
		author: 'Jane Smith',
		readTime: '6 min read',
		categories: ['Tutorial', 'Svelte']
	}
]);

<script lang="ts">
	import BlogIndex from '$lib/layouts/BlogIndex.svelte';
	import CtaSection from '$lib/sections/CtaSection.svelte';
	import { allCategories } from '$lib/stores/blog';
	import { page } from '$app/state';
	import { businessInfo } from '$lib/stores/business';

	const ogImage = $derived(
		`${page.url.origin}/og?${new URLSearchParams({ title: 'Blog', description: 'Latest news, guides, and insights from ' + $businessInfo.name, label: 'Blog' })}`
	);
</script>

<svelte:head>
	<title>Blog | {$businessInfo.name}</title>
	<meta name="description" content="Latest news, guides, and insights from {$businessInfo.name}." />
	<meta property="og:url" content={page.url.href} />
	<meta property="og:title" content="Blog | {$businessInfo.name}" />
	<meta property="og:description" content="Latest news, guides, and insights from {$businessInfo.name}." />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:title" content="Blog | {$businessInfo.name}" />
	<meta name="twitter:description" content="Latest news, guides, and insights from {$businessInfo.name}." />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<BlogIndex />

<CtaSection
	variant="dark"
	title="Ready to start your next project?"
	subtitle="Book a free consultation and let's talk about what we can build together — no obligation, no sales pressure."
	ctaText="Get Your Free Consultation"
	ctaHref="/contact"
/>

<section class="categories-section">
	<div class="categories-inner">
		<h2>Browse by Category</h2>
		<div class="category-chips">
			{#each $allCategories as cat}
				<a href="/blog/category/{cat.slug}" class="category-chip">{cat.name}</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.categories-section {
		padding: 0 24px 64px;
		max-width: 1200px;
		margin: 0 auto;
	}
	.categories-inner {
		border-top: 1px solid #e5e7eb;
		padding-top: 48px;
	}
	.categories-inner h2 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 24px;
	}
	.category-chips {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}
	.category-chip {
		padding: 8px 18px;
		border: 1px solid #d1d5db;
		border-radius: 999px;
		font-size: 0.875rem;
		font-weight: 500;
		color: inherit;
		text-decoration: none;
		transition: background 0.15s, border-color 0.15s;
	}
	.category-chip:hover {
		background: #f3f4f6;
		border-color: #6b7280;
	}
</style>

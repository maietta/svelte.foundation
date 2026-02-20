<script lang="ts">
	import { page } from '$app/stores';
	import { blogPosts, slugifyCategory, categoryFromSlug } from '$lib/stores/blog';
	import { businessInfo } from '$lib/stores/business';
	import BlogIndex from '$lib/layouts/BlogIndex.svelte';

	const categorySlug = $derived($page.params.category);

	const filteredPosts = $derived(
		$blogPosts.filter((p) => (p.categories ?? []).some((c) => slugifyCategory(c) === categorySlug))
	);

	const categoryName = $derived(
		(categorySlug && categoryFromSlug(categorySlug, $blogPosts)) ??
			(categorySlug?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) ?? '')
	);

	const ogImage = $derived(
		`${$page.url.origin}/og?${new URLSearchParams({ title: categoryName + ' Articles', description: 'Browse all ' + categoryName + ' articles on the ' + $businessInfo.name + ' blog.', label: 'Blog' })}`
	);
</script>

<svelte:head>
	<title>{categoryName} Articles | Blog | {$businessInfo.name}</title>
	<meta name="description" content="Browse all {categoryName} articles on the {$businessInfo.name} blog." />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="{categoryName} Articles | Blog | {$businessInfo.name}" />
	<meta property="og:description" content="Browse all {categoryName} articles on the {$businessInfo.name} blog." />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:title" content="{categoryName} Articles | Blog | {$businessInfo.name}" />
	<meta name="twitter:description" content="Browse all {categoryName} articles on the {$businessInfo.name} blog." />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

<BlogIndex
	title={categoryName}
	subtitle="Browse all {categoryName} articles"
	posts={filteredPosts}
/>

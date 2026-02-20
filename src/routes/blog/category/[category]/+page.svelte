<script lang="ts">
	import { page } from '$app/stores';
	import { blogPosts, slugifyCategory, categoryFromSlug } from '$lib/stores/blog';
	import BlogIndex from '$lib/layouts/BlogIndex.svelte';

	const categorySlug = $derived($page.params.category);

	const filteredPosts = $derived(
		$blogPosts.filter((p) => (p.categories ?? []).some((c) => slugifyCategory(c) === categorySlug))
	);

	const categoryName = $derived(
		categoryFromSlug(categorySlug, $blogPosts) ??
			categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
	);
</script>

<svelte:head>
	<title>{categoryName} Articles | Blog</title>
	<meta name="description" content="Browse all {categoryName} articles on our blog." />
</svelte:head>

<BlogIndex
	title={categoryName}
	subtitle="Browse all {categoryName} articles"
	posts={filteredPosts}
/>

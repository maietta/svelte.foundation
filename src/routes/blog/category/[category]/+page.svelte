<script lang="ts">
	import { page } from '$app/stores';
	import { blogPosts, slugifyCategory, categoryFromSlug } from '$lib/stores/blog';
	import { businessInfo } from '$lib/stores/business';
	import BlogIndex from '$lib/layouts/BlogIndex.svelte';
	import PageHead from '$lib/components/PageHead.svelte';

	const categorySlug = $derived($page.params.category);

	const filteredPosts = $derived(
		$blogPosts.filter((p) => (p.categories ?? []).some((c) => slugifyCategory(c) === categorySlug))
	);

	const categoryName = $derived(
		(categorySlug && categoryFromSlug(categorySlug, $blogPosts)) ??
			(categorySlug?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) ?? '')
	);
</script>

<PageHead
	title="{categoryName} Articles"
	description="Browse all {categoryName} articles on the {$businessInfo.name} blog."
	label="Blog"
/>

<BlogIndex
	title={categoryName}
	subtitle="Browse all {categoryName} articles"
	posts={filteredPosts}
/>

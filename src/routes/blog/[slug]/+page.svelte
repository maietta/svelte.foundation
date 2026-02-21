<script lang="ts">
	import { page } from '$app/stores';
	import { blogPosts } from '$lib/stores/blog';
	import { businessInfo } from '$lib/stores/business';
	import BlogPost from '$lib/layouts/BlogPost.svelte';
	import PageHead from '$lib/components/PageHead.svelte';

	const slug = $derived($page.params.slug);
	const post = $derived($blogPosts.find((p) => p.slug === slug));
</script>

<PageHead
	title={post?.title ?? $businessInfo.name + ' Blog'}
	description={post?.excerpt ?? $businessInfo.tagline ?? ''}
	label="Blog"
/>

{#if post}
	{#key slug}
		<BlogPost
			slug={post.slug}
			title={post.title}
			date={post.date}
			author={post.author}
			excerpt={post.excerpt}
			readTime={post.readTime}
			categories={post.categories}
		/>
	{/key}
{:else}
	<div class="not-found">
		<h1>Post Not Found</h1>
		<p>The blog post you're looking for doesn't exist.</p>
		<a href="/blog">← Back to Blog</a>
	</div>
{/if}

<style>
	.not-found {
		padding: 64px 24px;
		text-align: center;
		max-width: 600px;
		margin: 0 auto;
	}
	.not-found h1 {
		font-size: 2rem;
		margin-bottom: 16px;
	}
	.not-found p {
		color: #666;
		margin-bottom: 24px;
	}
	.not-found a {
		color: #333;
	}
</style>

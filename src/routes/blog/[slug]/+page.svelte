<script lang="ts">
	import { page } from '$app/stores';
	import { blogPosts } from '$lib/stores/blog';
	import BlogPost from '$lib/layouts/BlogPost.svelte';

	const slug = $derived($page.params.slug);
	const post = $derived($blogPosts.find((p) => p.slug === slug));

	const ogImage = $derived(
		post
			? `${$page.url.origin}/og?${new URLSearchParams({ title: post.title, description: post.excerpt, label: 'Blog' })}`
			: `${$page.url.origin}/og`
	);
</script>

<svelte:head>
	<title>{post?.title ?? 'Blog Post'} | Blog</title>
	<meta name="description" content={post?.excerpt ?? ''} />
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content="{post?.title ?? 'Blog Post'} | Blog" />
	<meta property="og:description" content={post?.excerpt ?? ''} />
	<meta property="og:image" content={ogImage} />
	<meta name="twitter:title" content="{post?.title ?? 'Blog Post'} | Blog" />
	<meta name="twitter:description" content={post?.excerpt ?? ''} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>

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

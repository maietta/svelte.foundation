<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { blogPosts, slugifyCategory } from '$lib/stores/blog';
	import ShareBar from '$lib/components/ShareBar.svelte';
	import CtaSection from '$lib/sections/CtaSection.svelte';

	interface Props {
		slug?: string;
		title?: string;
		date?: string;
		author?: string;
		excerpt?: string;
		categories?: string[];
		readTime?: string;
		showSidebar?: boolean;
		showRelated?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		slug,
		title = 'Blog Post Title',
		date,
		author,
		excerpt,
		categories,
		readTime,
		showSidebar = true,
		showRelated = true,
		children
	}: Props = $props();

	let measuredReadTime = $state('');
	const computedReadTime = $derived(measuredReadTime || readTime || '');
	let postBody: HTMLElement;

	onMount(() => {
		if (postBody) {
			const words = (postBody.textContent ?? '').trim().split(/\s+/).filter(Boolean).length;
			const minutes = Math.max(1, Math.round(words / 225));
			measuredReadTime = `${minutes} min read`;
		}
	});

	const postsByCategory = $derived.by(() => {
		const cats = categories ?? [];
		return cats.map((cat) => ({
			category: cat,
			posts: $blogPosts
				.filter((p) => p.slug !== slug && (p.categories ?? []).includes(cat))
				.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
		})).filter((g) => g.posts.length > 0);
	});

	const relatedPosts = $derived.by(() => {
		const others = $blogPosts.filter((p) => p.slug !== slug);
		const currentCategories = new Set(categories ?? []);

		const scored = others.map((p) => ({
			post: p,
			score: (p.categories ?? []).filter((c) => currentCategories.has(c)).length
		}));

		scored.sort(
			(a, b) =>
				b.score - a.score ||
				new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
		);

		return scored.slice(0, 3).map((s) => s.post);
	});

	const postsByYear = $derived(
		$blogPosts.reduce(
			(acc, post) => {
				const year = new Date(post.date).getFullYear();
				if (!acc[year]) acc[year] = [];
				acc[year].push(post);
				return acc;
			},
			{} as Record<number, typeof $blogPosts>
		)
	);

	const sortedYears = $derived(Object.keys(postsByYear).map(Number).sort((a, b) => b - a));

	function formatDate(dateStr: string): string {
		const d = new Date(dateStr);
		return d.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<div class="blog-post-layout">
	<article class="blog-post">
		<header class="post-header">
			<h1 style={slug ? `view-transition-name: blog-title-${slug}` : ''}>{title}</h1>
			{#if categories && categories.length > 0}
				<div class="post-categories">
					{#each categories as category, i}
						<a
							href="/blog/category/{slugifyCategory(category)}"
							class="category-tag"
							style={slug && i === 0 ? `view-transition-name: blog-categories-${slug}` : ''}
							>{category}</a
						>
					{/each}
				</div>
			{/if}
			{#if date || author || computedReadTime}
				<div class="post-meta">
					{#if computedReadTime}
						<span class="read-time">{computedReadTime}</span>
					{/if}
					{#if date}
						<time datetime={date} style={slug ? `view-transition-name: blog-date-${slug}` : ''}>{formatDate(date)}</time>
					{/if}
					{#if author}
						<span>by {author}</span>
					{/if}
				</div>
			{/if}
			{#if excerpt}
				<p class="excerpt">{excerpt}</p>
			{/if}
		</header>

		<div class="post-image">
			<div class="image-placeholder">Featured Image</div>
		</div>

		<div class="post-body" bind:this={postBody}>
			{#if children}
				{@render children()}
			{:else}
				<p>Blog post content goes here...</p>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua.
				</p>
				<h2>Section Heading</h2>
				<p>
					Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
					nulla pariatur.
				</p>
				<blockquote>
					<p>This is a blockquote. It can be used to highlight important quotes or callouts.</p>
				</blockquote>
				<p>
					Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
					laudantium.
				</p>
			{/if}
		</div>

		<ShareBar url={$page.url.href} title={title} />

		{#if postsByCategory.length > 0}
			<section class="more-categories">
				<h2>More articles available in the following categories</h2>
				{#each postsByCategory as group}
					<div class="more-cat-group">
						<h3>
							<a href="/blog/category/{slugifyCategory(group.category)}">{group.category}</a>
						</h3>
						<ul class="more-cat-list">
							{#each group.posts as post}
								<li>
									<a href="/blog/{post.slug}">{post.title}</a>
									{#if post.readTime}<span class="more-cat-meta">{post.readTime}</span>{/if}
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</section>
		{/if}
	</article>

	{#if showSidebar}
		<aside class="sidebar">
			{#if showRelated}
				<div class="sidebar-section">
					<h3>In This Category</h3>
					<ul class="related-posts">
						{#each relatedPosts as post}
							<li>
								<a href="/blog/{post.slug}">{post.title}</a>
								<span class="date">{formatDate(post.date)}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/if}

			<div class="archive">
				<h3>Archive</h3>
				{#each sortedYears as year}
					<div class="archive-year">
						<span class="archive-year-label">{year}</span>
						<ul class="archive-list">
							{#each postsByYear[year] as post}
								<li><a href="/blog/{post.slug}">{post.title}</a></li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</aside>
	{/if}
</div>

<CtaSection
	variant="dark"
	title="Ready to start your next project?"
	subtitle="Book a free consultation and let's talk about what we can build together — no obligation, no sales pressure."
	ctaText="Get Your Free Consultation"
	ctaHref="/contact"
/>

<style>
	.blog-post-layout {
		display: grid;
		grid-template-columns: 1fr 300px;
		gap: 48px;
		padding: 64px 24px;
		max-width: 1200px;
		margin: 0 auto;
	}
	.blog-post {
		min-width: 0;
	}
	.post-header {
		margin-bottom: 32px;
	}
	.post-header h1 {
		font-size: 2.5rem;
		font-weight: bold;
		line-height: 1.2;
		margin-bottom: 16px;
	}
	.read-time {
		font-weight: 600;
		color: #374151;
	}
	.post-meta {
		display: flex;
		gap: 16px;
		color: #666;
		font-size: 0.875rem;
		margin-bottom: 16px;
	}
	.post-categories {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-bottom: 16px;
	}
	.category-tag {
		font-size: 0.75rem;
		padding: 4px 8px;
		background: #e0e0e0;
		border-radius: 4px;
		color: inherit;
		text-decoration: none;
	}
	.category-tag:hover {
		background: #c0c0c0;
	}
	.excerpt {
		font-size: 1.25rem;
		color: #666;
		line-height: 1.6;
	}
	.post-image {
		height: 400px;
		background: #e0e0e0;
		margin-bottom: 40px;
		border-radius: 12px;
		overflow: hidden;
	}
	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
		font-size: 1.5rem;
	}
	.post-body {
		font-size: 1.125rem;
		line-height: 1.8;
		color: #333;
	}
	.post-body :global(h2) {
		font-size: 1.75rem;
		font-weight: 600;
		margin: 40px 0 20px;
	}
	.post-body :global(p) {
		margin-bottom: 20px;
	}
	.post-body :global(blockquote) {
		border-left: 4px solid #ccc;
		padding-left: 24px;
		margin: 32px 0;
		font-style: italic;
		color: #666;
	}
	.sidebar {
		display: flex;
		flex-direction: column;
		gap: 32px;
		position: sticky;
		top: 100px;
		align-self: start;
	}
	.sidebar-section {
		padding: 24px;
		border: 2px dashed #999;
		border-radius: 12px;
		background: #fafafa;
	}
	.sidebar-section h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 16px;
	}
	.related-posts {
		list-style: none;
		padding: 0;
	}
	.related-posts li {
		margin-bottom: 16px;
		padding-bottom: 16px;
		border-bottom: 1px solid #eee;
	}
	.related-posts li:last-child {
		border-bottom: none;
		margin-bottom: 0;
		padding-bottom: 0;
	}
	.related-posts a {
		display: block;
		color: inherit;
		text-decoration: none;
		font-weight: 500;
		margin-bottom: 4px;
	}
	.related-posts a:hover {
		text-decoration: underline;
	}
	.related-posts .date {
		font-size: 0.75rem;
		color: #888;
	}
	.archive {
		padding-top: 8px;
	}
	.archive h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 16px;
		color: inherit;
	}
	.archive-year {
		margin-bottom: 20px;
	}
	.archive-year-label {
		display: block;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #9ca3af;
		margin-bottom: 6px;
	}
	.archive-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.archive-list li {
		margin-bottom: 6px;
	}
	.archive-list a {
		font-size: 0.875rem;
		color: inherit;
		text-decoration: none;
		line-height: 1.4;
	}
	.archive-list a:hover {
		text-decoration: underline;
	}
	.more-categories {
		margin-top: 48px;
		padding-top: 32px;
		border-top: 1px solid #e5e7eb;
	}
	.more-categories > h2 {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 24px;
		color: #374151;
	}
	.more-cat-group {
		margin-bottom: 24px;
	}
	.more-cat-group h3 {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #9ca3af;
		margin-bottom: 8px;
	}
	.more-cat-group h3 a {
		color: inherit;
		text-decoration: none;
	}
	.more-cat-group h3 a:hover {
		text-decoration: underline;
	}
	.more-cat-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.more-cat-list a {
		color: inherit;
		text-decoration: none;
		font-size: 0.9375rem;
	}
	.more-cat-list a:hover {
		text-decoration: underline;
	}
	.more-cat-meta {
		margin-left: 8px;
		font-size: 0.75rem;
		color: #9ca3af;
	}
	@media (max-width: 900px) {
		.blog-post-layout {
			grid-template-columns: 1fr;
		}
		.post-header h1 {
			font-size: 2rem;
		}
		.post-image {
			height: 250px;
		}
	}
</style>

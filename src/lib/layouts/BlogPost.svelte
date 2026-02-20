<script lang="ts">
	import { blogPosts } from '$lib/stores/blog';

	interface Props {
		slug?: string;
		title?: string;
		date?: string;
		author?: string;
		excerpt?: string;
		categories?: string[];
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
		showSidebar = true,
		showRelated = true,
		children
	}: Props = $props();

	const relatedPosts = $derived($blogPosts.slice(0, 3));

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
						<span
							class="category-tag"
							style={slug && i === 0 ? `view-transition-name: blog-categories-${slug}` : ''}
							>{category}</span
						>
					{/each}
				</div>
			{/if}
			{#if date || author}
				<div class="post-meta">
					{#if date}
						<time datetime={date} style={slug ? `view-transition-name: blog-date-${slug}` : ''}
							>{formatDate(date)}</time
						>
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

		<div class="post-body">
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
	</article>

	{#if showSidebar}
		<aside class="sidebar">
			<div class="sidebar-section">
				<h3>Categories</h3>
				<ul class="category-list">
					<li><a href="/blog/category/tutorial">Tutorials</a></li>
					<li><a href="/blog/category/news">News</a></li>
					<li><a href="/blog/category/guides">Guides</a></li>
					<li><a href="/blog/category/case-studies">Case Studies</a></li>
				</ul>
			</div>

			{#if showRelated}
				<div class="sidebar-section">
					<h3>Related Posts</h3>
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
		</aside>
	{/if}
</div>

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
	.category-list {
		list-style: none;
		padding: 0;
	}
	.category-list li {
		margin-bottom: 8px;
	}
	.category-list a {
		color: inherit;
		text-decoration: none;
	}
	.category-list a:hover {
		text-decoration: underline;
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

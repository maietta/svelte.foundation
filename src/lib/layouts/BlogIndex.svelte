<script lang="ts">
	import { blogPosts, type BlogPost } from '$lib/stores/blog';

	interface Props {
		title?: string;
		subtitle?: string;
		showDate?: boolean;
		showAuthor?: boolean;
		showExcerpt?: boolean;
		showCategories?: boolean;
		columns?: 2 | 3;
		posts?: BlogPost[];
	}

	let {
		title = 'Our Blog',
		subtitle = 'Latest news and insights',
		showDate = true,
		showAuthor = true,
		showExcerpt = true,
		showCategories = true,
		columns = 2,
		posts
	}: Props = $props();

	const displayPosts = $derived(posts || $blogPosts);

	function formatDate(dateStr: string): string {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<section class="blog-index">
	<div class="section-header">
		<h1>{title}</h1>
		{#if subtitle}
			<p>{subtitle}</p>
		{/if}
	</div>

	<div class="posts-grid cols-{columns}">
		{#each displayPosts as post}
			<article class="post-card">
				<div class="post-image">
					<div class="image-placeholder">Post Image</div>
				</div>
				<div class="post-content">
					{#if showCategories && post.categories}
						<div class="post-categories">
							{#each post.categories as category, i}
								<span
									class="category-tag"
									style={i === 0 ? `view-transition-name: blog-categories-${post.slug}` : ''}
									>{category}</span
								>
							{/each}
						</div>
					{/if}
					<h2>
						<a href="/blog/{post.slug}" style="view-transition-name: blog-title-{post.slug}"
							>{post.title}</a
						>
					</h2>
					{#if showExcerpt}
						<p class="excerpt">{post.excerpt}</p>
					{/if}
					<div class="post-meta">
						{#if showDate}
							<span class="date" style="view-transition-name: blog-date-{post.slug}"
								>{formatDate(post.date)}</span
							>
						{/if}
						{#if showAuthor && post.author}
							<span class="author">by {post.author}</span>
						{/if}
						{#if post.readTime}
							<span class="read-time">{post.readTime}</span>
						{/if}
					</div>
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	.blog-index {
		padding: 64px 24px;
		max-width: 1200px;
		margin: 0 auto;
	}
	.section-header {
		text-align: center;
		margin-bottom: 48px;
	}
	.section-header h1 {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 16px;
	}
	.section-header p {
		font-size: 1.25rem;
		color: #666;
	}
	.posts-grid {
		display: grid;
		gap: 32px;
	}
	.cols-2 {
		grid-template-columns: repeat(2, 1fr);
	}
	.cols-3 {
		grid-template-columns: repeat(3, 1fr);
	}
	.post-card {
		border: 2px dashed #999;
		border-radius: 12px;
		overflow: hidden;
		background: #fafafa;
	}
	.post-image {
		height: 200px;
		background: #e0e0e0;
	}
	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
		font-size: 1.125rem;
	}
	.post-content {
		padding: 24px;
	}
	.post-categories {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
		margin-bottom: 12px;
	}
	.category-tag {
		font-size: 0.75rem;
		padding: 4px 8px;
		background: #e0e0e0;
		border-radius: 4px;
	}
	.post-content h2 {
		font-size: 1.25rem;
		font-weight: 600;
		margin-bottom: 12px;
		line-height: 1.3;
	}
	.post-content h2 a {
		color: inherit;
		text-decoration: none;
	}
	.post-content h2 a:hover {
		text-decoration: underline;
	}
	.excerpt {
		color: #666;
		line-height: 1.6;
		margin-bottom: 16px;
	}
	.post-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		font-size: 0.875rem;
		color: #888;
	}
	@media (max-width: 768px) {
		.posts-grid {
			grid-template-columns: 1fr !important;
		}
	}
</style>

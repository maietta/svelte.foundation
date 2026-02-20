<script lang="ts">
	interface Project {
		title: string;
		description?: string;
		image?: string;
		tags?: string[];
		href?: string;
		client?: string;
		year?: string | number;
	}

	interface Props {
		title?: string;
		subtitle?: string;
		projects?: Project[];
		tags?: string[];
	}

	let {
		title = 'Our Work',
		subtitle = 'A selection of projects we are proud of.',
		projects = [],
		tags = []
	}: Props = $props();

	let activeTag = $state<string | null>(null);

	const allTags = $derived(
		tags.length > 0
			? tags
			: [...new Set(projects.flatMap((p) => p.tags ?? []))]
	);

	const filtered = $derived(
		activeTag ? projects.filter((p) => p.tags?.includes(activeTag!)) : projects
	);
</script>

<section class="portfolio-section">
	<div class="section-header">
		<h1>{title}</h1>
		{#if subtitle}
			<p>{subtitle}</p>
		{/if}
	</div>

	{#if allTags.length > 0}
		<div class="tag-filters">
			<button
				type="button"
				class="tag-btn"
				class:active={activeTag === null}
				onclick={() => (activeTag = null)}
			>All</button>
			{#each allTags as tag}
				<button
					type="button"
					class="tag-btn"
					class:active={activeTag === tag}
					onclick={() => (activeTag = tag)}
				>{tag}</button>
			{/each}
		</div>
	{/if}

	<div class="projects-grid">
		{#each filtered as project}
			<article class="project-card">
				<div class="project-image">
					{#if project.image}
						<img src={project.image} alt={project.title} />
					{:else}
						<div class="image-placeholder">
							<span>{project.title[0]}</span>
						</div>
					{/if}
				</div>
				<div class="project-info">
					<div class="project-meta">
						{#if project.client}<span class="client">{project.client}</span>{/if}
						{#if project.year}<span class="year">{project.year}</span>{/if}
					</div>
					<h2>{project.title}</h2>
					{#if project.description}
						<p>{project.description}</p>
					{/if}
					{#if project.tags && project.tags.length > 0}
						<div class="project-tags">
							{#each project.tags as tag}
								<span class="badge">{tag}</span>
							{/each}
						</div>
					{/if}
					{#if project.href}
						<a href={project.href} class="project-link">View Project →</a>
					{/if}
				</div>
			</article>
		{/each}
	</div>
</section>

<style>
	.portfolio-section {
		padding: 64px 24px;
		max-width: 1100px;
		margin: 0 auto;
	}
	.section-header {
		text-align: center;
		margin-bottom: 40px;
	}
	.section-header h1 {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 12px;
	}
	.section-header p {
		font-size: 1.125rem;
		opacity: 0.6;
	}
	.tag-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		justify-content: center;
		margin-bottom: 40px;
	}
	.tag-btn {
		padding: 6px 18px;
		border-radius: 99px;
		border: 1px solid oklch(var(--b3));
		background: oklch(var(--b1));
		color: oklch(var(--bc));
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s;
	}
	.tag-btn:hover,
	.tag-btn.active {
		background: oklch(var(--n));
		color: oklch(var(--nc));
		border-color: oklch(var(--n));
	}
	.projects-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 28px;
	}
	@media (max-width: 900px) {
		.projects-grid { grid-template-columns: repeat(2, 1fr); }
	}
	@media (max-width: 560px) {
		.projects-grid { grid-template-columns: 1fr; }
	}
	.project-card {
		border: 1px solid oklch(var(--b3));
		border-radius: var(--radius-box);
		overflow: hidden;
		background: oklch(var(--b1));
		display: flex;
		flex-direction: column;
		transition: box-shadow 0.2s;
	}
	.project-card:hover {
		box-shadow: 0 4px 20px oklch(var(--bc)/0.08);
	}
	.project-image {
		aspect-ratio: 16/10;
		overflow: hidden;
		background: oklch(var(--b2));
	}
	.project-image img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.image-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 3rem;
		font-weight: 700;
		opacity: 0.2;
	}
	.project-info {
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex: 1;
	}
	.project-meta {
		display: flex;
		gap: 12px;
		font-size: 0.75rem;
		opacity: 0.5;
		font-weight: 500;
	}
	.project-info h2 {
		font-size: 1rem;
		font-weight: 700;
		margin: 0;
	}
	.project-info p {
		font-size: 0.875rem;
		opacity: 0.65;
		line-height: 1.5;
		margin: 0;
	}
	.project-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.badge {
		display: inline-block;
		padding: 2px 10px;
		background: oklch(var(--b3));
		border-radius: 99px;
		font-size: 0.7rem;
		font-weight: 600;
	}
	.project-link {
		margin-top: 4px;
		font-size: 0.875rem;
		font-weight: 600;
		color: oklch(var(--p));
		text-decoration: none;
	}
	.project-link:hover {
		text-decoration: underline;
	}
</style>

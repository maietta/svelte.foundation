<script lang="ts">
	interface FaqItem {
		question: string;
		answer: string;
	}

	interface FaqCategory {
		category: string;
		items: FaqItem[];
	}

	interface Props {
		title?: string;
		subtitle?: string;
		categories?: FaqCategory[];
		items?: FaqItem[];
	}

	let {
		title = 'Frequently Asked Questions',
		subtitle = 'Everything you need to know.',
		categories = [],
		items = []
	}: Props = $props();

	// If no categories, wrap flat items into one anonymous category
	const allCategories: FaqCategory[] = $derived(
		categories.length > 0
			? categories
			: items.length > 0
				? [{ category: '', items }]
				: []
	);

	let openItems = $state<Set<string>>(new Set());

	function toggle(key: string) {
		const next = new Set(openItems);
		if (next.has(key)) next.delete(key);
		else next.add(key);
		openItems = next;
	}
</script>

<section class="faq-section">
	<div class="section-header">
		<h1>{title}</h1>
		{#if subtitle}
			<p>{subtitle}</p>
		{/if}
	</div>

	{#each allCategories as cat, ci}
		{#if cat.category}
			<h2 class="cat-heading">{cat.category}</h2>
		{/if}
		<div class="faq-list">
			{#each cat.items as item, qi}
				{@const key = `${ci}-${qi}`}
				{@const open = openItems.has(key)}
				<div class="faq-item" class:open>
					<button
						class="faq-question"
						onclick={() => toggle(key)}
						aria-expanded={open}
						type="button"
					>
						<span>{item.question}</span>
						<span class="faq-icon" aria-hidden="true">{open ? '−' : '+'}</span>
					</button>
					{#if open}
						<div class="faq-answer">
							<p>{item.answer}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</section>

<style>
	.faq-section {
		padding: 64px 24px;
		max-width: 800px;
		margin: 0 auto;
	}
	.section-header {
		text-align: center;
		margin-bottom: 56px;
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
	.cat-heading {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 40px 0 16px;
		padding-bottom: 8px;
		border-bottom: 1px solid oklch(var(--b3));
	}
	.faq-list {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}
	.faq-item {
		border: 1px solid oklch(var(--b3));
		border-radius: var(--radius-box);
		overflow: hidden;
		background: oklch(var(--b1));
	}
	.faq-item.open {
		border-color: oklch(var(--p)/0.4);
	}
	.faq-question {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 18px 20px;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		font-size: 0.95rem;
		font-weight: 600;
		color: oklch(var(--bc));
	}
	.faq-question:hover {
		background: oklch(var(--b2));
	}
	.faq-icon {
		font-size: 1.25rem;
		font-weight: 300;
		flex-shrink: 0;
		color: oklch(var(--p));
	}
	.faq-answer {
		padding: 0 20px 18px;
		font-size: 0.9rem;
		line-height: 1.7;
		opacity: 0.75;
	}
	.faq-answer p {
		margin: 0;
	}
</style>

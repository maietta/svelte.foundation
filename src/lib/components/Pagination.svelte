<script lang="ts">
	interface Props {
		currentPage: number;
		totalPages: number;
		getHref: (page: number) => string;
	}
	let { currentPage, totalPages, getHref }: Props = $props();

	const pages = $derived(
		Array.from({ length: totalPages }, (_, i) => i + 1).filter(
			(p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2
		)
	);

	// Insert ellipsis markers between non-consecutive pages
	const items = $derived(
		pages.reduce<(number | '...')[]>((acc, page, i) => {
			if (i > 0 && page - (pages[i - 1] as number) > 1) acc.push('...');
			acc.push(page);
			return acc;
		}, [])
	);
</script>

{#if totalPages > 1}
	<nav class="pagination" aria-label="Pagination">
		<a
			class="page-btn"
			class:disabled={currentPage === 1}
			href={currentPage === 1 ? undefined : getHref(currentPage - 1)}
			aria-label="Previous page"
			aria-disabled={currentPage === 1}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
		</a>

		{#each items as item}
			{#if item === '...'}
				<span class="ellipsis">…</span>
			{:else}
				<a
					class="page-btn"
					class:active={item === currentPage}
					href={item === currentPage ? undefined : getHref(item)}
					aria-label="Page {item}"
					aria-current={item === currentPage ? 'page' : undefined}
				>{item}</a>
			{/if}
		{/each}

		<a
			class="page-btn"
			class:disabled={currentPage === totalPages}
			href={currentPage === totalPages ? undefined : getHref(currentPage + 1)}
			aria-label="Next page"
			aria-disabled={currentPage === totalPages}
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
		</a>
	</nav>
{/if}

<style>
	.pagination {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		margin-top: 48px;
	}
	.page-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 36px;
		height: 36px;
		padding: 0 10px;
		border-radius: 6px;
		font-size: 0.875rem;
		font-weight: 500;
		color: #374151;
		background: #f3f4f6;
		border: 1px solid #e5e7eb;
		text-decoration: none;
		transition: background 0.15s, color 0.15s, border-color 0.15s;
	}
	.page-btn:hover:not(.active):not(.disabled) {
		background: #e5e7eb;
	}
	.page-btn.active {
		background: #1a1a1a;
		color: #fff;
		border-color: #1a1a1a;
		pointer-events: none;
	}
	.page-btn.disabled {
		opacity: 0.35;
		pointer-events: none;
	}
	.ellipsis {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 36px;
		height: 36px;
		color: #9ca3af;
		font-size: 0.875rem;
	}
</style>

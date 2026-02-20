<script lang="ts">
	import CtaSection from '$lib/sections/CtaSection.svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="full-width">
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
	.full-width {
		width: 100%;
		max-width: 100%;
		padding: 0;
	}
</style>

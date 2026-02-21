<script lang="ts">
	import FullWidth from '$lib/layouts/FullWidth.svelte';
	import PageHead from '$lib/components/PageHead.svelte';
</script>

<PageHead
	title="Full-Width Layout"
	description="Full-width layout demo."
	noindex={true}
/>

<FullWidth>
	<section class="hero-skeleton">
		<div class="h-12 w-2/3 skeleton"></div>
		<div class="mt-4 h-6 w-1/2 skeleton"></div>
		<div class="mt-8 h-32 w-full skeleton"></div>
	</section>

	<section class="content-skeleton">
		<div class="mb-8 h-8 w-1/4 skeleton"></div>
		<div class="mb-2 h-4 w-full skeleton"></div>
		<div class="mb-2 h-4 w-full skeleton"></div>
		<div class="mb-8 h-4 w-3/4 skeleton"></div>
		<div class="grid grid-cols-3 gap-4">
			<div class="h-48 skeleton"></div>
			<div class="h-48 skeleton"></div>
			<div class="h-48 skeleton"></div>
		</div>
	</section>
</FullWidth>

<style>
	.hero-skeleton,
	.content-skeleton {
		max-width: 1200px;
		margin: 0 auto;
		padding: 64px 24px;
	}
	.hero-skeleton {
		text-align: center;
	}
	.content-skeleton {
		max-width: 900px;
	}
</style>

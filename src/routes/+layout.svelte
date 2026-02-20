<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { businessInfo } from '$lib/stores/business';

	let { children, data } = $props();

	const defaultOgImage = $derived(`${$page.url.origin}/og`);

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={$businessInfo.name} />
	<meta property="og:image" content={defaultOgImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content={defaultOgImage} />
</svelte:head>

<div data-theme="corporate">
	<div class="layout-container">
		<Header />
		<main>
			{@render children()}
		</main>
		<Footer url={data.url} />
	</div>
</div>

<style>
	.layout-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
	}
	main {
		flex-grow: 1;
		position: relative;
		z-index: 1;
		background: transparent;
	}
	:global(.wireframe-header) {
		position: relative;
		z-index: 10;
	}
	:global(.wireframe-footer) {
		position: relative;
		z-index: 10;
	}
</style>

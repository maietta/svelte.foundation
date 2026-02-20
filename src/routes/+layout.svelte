<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children, data } = $props();

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

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

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

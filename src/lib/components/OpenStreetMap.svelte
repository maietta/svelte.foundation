<script lang="ts">
	import { onMount, onDestroy, tick } from 'svelte';
	import { browser } from '$app/environment';
	import '$lib/leaflet.css';

	interface Props {
		/** Full address string passed to Nominatim for geocoding, e.g. "464 Main St, Janesville, CA 96114" */
		query: string;
		/** Optional WGS-84 latitude — skips Nominatim geocoding when provided with lon */
		lat?: number;
		/** Optional WGS-84 longitude — skips Nominatim geocoding when provided with lat */
		lon?: number;
		zoom?: number;
		height?: string;
		class?: string;
	}

	let { query, lat: latProp, lon: lonProp, zoom = 15, height = '360px', class: className = '' }: Props = $props();

	let container: HTMLDivElement;
	let map: import('leaflet').Map | null = null;
	let status: 'loading' | 'ready' | 'error' = $state('loading');

	onMount(async () => {
		if (!browser) return;

		const L = (await import('leaflet')).default;

		// Fix default marker icon path broken by bundlers
		// @ts-expect-error _getIconUrl is a private method we need to clear
		delete L.Icon.Default.prototype._getIconUrl;
		L.Icon.Default.mergeOptions({
			iconUrl: '/leaflet/images/marker-icon.png',
			iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
			shadowUrl: '/leaflet/images/marker-shadow.png'
		});

		// Use explicit coordinates if provided, otherwise geocode via Nominatim
		let lat: number, lon: number;
		if (latProp !== undefined && lonProp !== undefined) {
			lat = latProp;
			lon = lonProp;
		} else {
			try {
				const res = await fetch(
					`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`,
					{
						headers: {
							'Accept-Language': 'en',
							'User-Agent': 'svelte.foundation/1.0'
						}
					}
				);
				const results = await res.json();
				if (!results.length) throw new Error('No results');
				lat = parseFloat(results[0].lat);
				lon = parseFloat(results[0].lon);
			} catch {
				status = 'error';
				return;
			}
		}

		map = L.map(container, { scrollWheelZoom: false, attributionControl: true }).setView([lat, lon], zoom);
		map.attributionControl.setPrefix('');

		L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
			maxZoom: 19
		}).addTo(map);

		L.marker([lat, lon]).addTo(map).bindPopup(query).openPopup();

		status = 'ready';
		// Container was hidden during init — recalculate tile coverage now that it's visible
		await tick();
		map.invalidateSize();
	});

	onDestroy(() => {
		map?.remove();
		map = null;
	});
</script>

<div class="osm-wrapper {className}" style="height: {height};">
	{#if status === 'loading'}
		<div class="osm-placeholder">
			<span class="loading loading-spinner loading-md opacity-40"></span>
		</div>
	{:else if status === 'error'}
		<div class="osm-placeholder">
			<p class="text-sm opacity-50">Map unavailable</p>
		</div>
	{/if}
	<div bind:this={container} class="osm-map" class:hidden={status !== 'ready'}></div>
</div>

<style>
	.osm-wrapper {
		position: relative;
		width: 100%;
		border-radius: var(--rounded-box, 0.5rem);
		overflow: hidden;
	}
	.osm-map {
		width: 100%;
		height: 100%;
	}
	.osm-placeholder {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: oklch(var(--b2));
	}
	.hidden {
		visibility: hidden;
	}
	.osm-wrapper :global(.leaflet-attribution-flag) {
		display: none;
	}
</style>

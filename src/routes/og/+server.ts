import { ImageResponse } from '@ethercorps/sveltekit-og';
import { readFileSync } from 'fs';
import { dev } from '$app/environment';
import { get } from 'svelte/store';
import { businessInfo } from '$lib/stores/business';
import OgCard from '$lib/components/og/OgCard.svelte';
import type { RequestHandler } from '@sveltejs/kit';

// Cached at module load — not re-read on every request
const fontData = readFileSync(
	dev ? 'static/fonts/geist-latin.woff2' : 'build/client/fonts/geist-latin.woff2'
).buffer as ArrayBuffer;

export const GET: RequestHandler = async ({ url }) => {
	const info = get(businessInfo);

	const title = url.searchParams.get('title') || info.name;
	const description = url.searchParams.get('description') || (info.tagline ?? '');
	const label = url.searchParams.get('label') || '';
	const site = url.searchParams.get('site') || info.name;

	return new ImageResponse(
		OgCard,
		{
			width: 1200,
			height: 630,
			fonts: [{ name: 'Geist', data: fontData, weight: 400, style: 'normal' }]
		},
		{ title, description, label, site }
	);
};

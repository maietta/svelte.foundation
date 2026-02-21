<script lang="ts">
	import { page } from '$app/stores';
	import { businessInfo } from '$lib/stores/business';

	interface Props {
		/** Page-specific title. Rendered as "{title} | {businessInfo.name}" unless noSuffix is true. */
		title: string;
		/** Meta description and og:description content. */
		description?: string;
		/** Label badge shown on the auto-generated OG image card (e.g. "Blog", "Services"). */
		label?: string;
		/** Override the auto-generated OG image URL entirely. */
		ogImage?: string;
		/** Use title as-is — do not append "| BusinessName". Useful for dynamic pages that build their own title strings. */
		noSuffix?: boolean;
		/** Add `noindex, nofollow` robots meta. Use for internal/demo pages. */
		noindex?: boolean;
	}

	let {
		title,
		description = '',
		label,
		ogImage,
		noSuffix = false,
		noindex = false
	}: Props = $props();

	const fullTitle = $derived(noSuffix ? title : `${title} | ${$businessInfo.name}`);

	const imageUrl = $derived(
		ogImage ??
			`${$page.url.origin}/og?${new URLSearchParams({
				title,
				...(description ? { description } : {}),
				...(label ? { label } : {})
			})}`
	);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
	<meta property="og:url" content={$page.url.href} />
	<meta property="og:title" content={fullTitle} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	<meta property="og:image" content={imageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	{#if description}
		<meta name="twitter:description" content={description} />
	{/if}
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>

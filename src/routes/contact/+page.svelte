<script lang="ts">
	import ContactPage from '$lib/layouts/ContactPage.svelte';
	import type { PageData, ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Contact Us</title>
	<meta name="description" content="Get in touch with us" />
</svelte:head>

<ContactPage {data} form={form ?? undefined} />

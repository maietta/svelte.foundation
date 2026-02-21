<script lang="ts">
	import ContactPage from '$lib/layouts/ContactPage.svelte';
	import PageHead from '$lib/components/PageHead.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<PageHead
	title="Contact Us"
	description="Get in touch with our team. We're happy to answer questions, provide a quote, or schedule a free consultation."
/>

<ContactPage {data} form={form ?? undefined} />

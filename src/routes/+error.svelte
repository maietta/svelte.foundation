<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} — Page not found</title>
</svelte:head>

<div class="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
	<p class="text-9xl font-black opacity-10 select-none">{$page.status}</p>

	<h1 class="-mt-8 text-3xl font-bold text-base-content">
		{#if $page.status === 404}
			Page not found
		{:else}
			Something went wrong
		{/if}
	</h1>

	<p class="mt-3 max-w-md text-base opacity-60">
		{#if $page.status === 404}
			The page you are looking for does not exist or has been moved.
		{:else}
			{$page.error?.message ?? 'An unexpected error occurred. Please try again.'}
		{/if}
	</p>

	<div class="mt-8 flex flex-wrap gap-3 justify-center">
		<a href="/" class="btn btn-primary">Go home</a>
		<button type="button" class="btn btn-ghost" onclick={() => history.back()}>Go back</button>
	</div>
</div>

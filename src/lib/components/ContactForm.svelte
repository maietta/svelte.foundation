<script lang="ts">
	import { enhance } from '$app/forms';
	import { browser } from '$app/environment';
	import { businessInfo } from '$lib/stores/business';

	// Import on client only — the widget is a custom element that needs window.customElements
	if (browser) {
		import('altcha');
	}

	interface FormProps {
		success?: boolean;
		error?: string;
		name?: string;
		email?: string;
		message?: string;
	}

	interface Props {
		form?: FormProps;
		data?: { altchaChallenge?: object };
	}

	let { data }: Props = $props();

	let altchaEl: HTMLElement | null = $state(null);
	let submitting = $state(false);

	// Local result — driven by the enhance callback, no prop drilling needed
	let result = $state<{ success: boolean; error?: string } | null>(null);

	// Controlled field state
	let nameVal = $state('');
	let emailVal = $state('');
	let messageVal = $state('');

	function fillTestData() {
		nameVal = 'John Doe';
		emailVal = 'nick@premoweb.com';
		messageVal = 'This is a test message sent to verify the contact form is working correctly.';
	}

	function resetForm() {
		nameVal = '';
		emailVal = '';
		messageVal = '';
		result = null;
		(altchaEl as any)?.reset?.();
	}
</script>

<div class="card mx-auto w-full max-w-md bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title justify-center text-2xl">Contact Us</h2>
		<p class="mb-4 text-center text-base-content/70">Get in touch with {$businessInfo.name}</p>

		{#if result?.success}
			<div class="alert alert-success flex-col items-start gap-2 py-6">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8 shrink-0"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<div>
					<h3 class="font-bold text-lg">Message sent!</h3>
					<p class="mt-1 text-sm">Thanks for reaching out — we'll get back to you shortly.</p>
				</div>
				<button class="btn btn-ghost btn-sm mt-2" onclick={resetForm}>
					Send another message
				</button>
			</div>
		{:else}
			{#if result?.error}
				<div class="alert alert-error">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 shrink-0"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<div>
						<h3 class="font-bold">Couldn't send your message</h3>
						<p class="text-sm">{result.error ?? 'Something went wrong. Please try again.'}</p>
					</div>
				</div>
			{/if}

			<form
				method="POST"
				use:enhance={() => {
					submitting = true;
					result = null;
					return async ({ result: actionResult }) => {
						submitting = false;
						if (actionResult.type === 'success') {
							result = { success: true };
						} else if (actionResult.type === 'failure') {
							const d = actionResult.data as FormProps | undefined;
							result = { success: false, error: d?.error };
							if (d?.name !== undefined) nameVal = d.name ?? '';
							if (d?.email !== undefined) emailVal = d.email ?? '';
							if (d?.message !== undefined) messageVal = d.message ?? '';
						(altchaEl as any)?.reset?.();
						} else {
							result = { success: false, error: 'An unexpected error occurred. Please try again.' };
						}
					};
				}}
			>
				<fieldset class="fieldset">
					<label class="fieldset-label" for="name">Name *</label>
					<input
						id="name"
						name="name"
						type="text"
						bind:value={nameVal}
						class="input-bordered input w-full"
						required
						placeholder="Your full name"
					/>
				</fieldset>

				<fieldset class="fieldset">
					<label class="fieldset-label" for="email">Email *</label>
					<input
						id="email"
						name="email"
						type="email"
						bind:value={emailVal}
						class="input-bordered input w-full"
						required
						placeholder="your.email@example.com"
					/>
				</fieldset>

				<fieldset class="fieldset">
					<label class="fieldset-label" for="phone">Phone</label>
					<input
						id="phone"
						name="phone"
						type="tel"
						class="input-bordered input w-full"
						placeholder="(555) 123-4567"
					/>
				</fieldset>

				<fieldset class="fieldset">
					<label class="fieldset-label" for="message">Message *</label>
					<textarea
						id="message"
						name="message"
						rows="4"
						class="textarea-bordered textarea w-full"
						required
						placeholder="Tell us how we can help..."
						bind:value={messageVal}
					></textarea>
				</fieldset>

				<div class="mt-4">
					<altcha-widget
						bind:this={altchaEl}
						challengejson={data?.altchaChallenge ? JSON.stringify(data.altchaChallenge) : undefined}
						name="altcha-response"
						auto="onsubmit"
						hidefooter={true}
					></altcha-widget>
				</div>

				<button type="submit" class="btn mt-4 w-full btn-primary" disabled={submitting}>
					{#if submitting}
						<span class="loading loading-spinner"></span>
						Sending...
					{:else}
						Send Message
					{/if}
				</button>

				<button
					type="button"
					onclick={fillTestData}
					class="btn btn-ghost btn-sm mt-2 w-full opacity-50 hover:opacity-100"
				>
					Fill test data
				</button>
			</form>
		{/if}
	</div>
</div>

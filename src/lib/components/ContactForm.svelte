<script lang="ts">
	import { enhance } from '$app/forms';
	import { onMount } from 'svelte';
	import { businessInfo } from '$lib/stores/business';

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

	let { form, data }: Props = $props();

	let formReady = $state(false);
	let altchaWidget: any = $state(null);
	let submitting = $state(false);

	onMount(async () => {
		if (data?.altchaChallenge) {
			await import('altcha/altcha.css');
			const AltchaModule = await import('altcha');
			const Altcha = (AltchaModule as any).default || AltchaModule;

			const widget = document.getElementById('altcha-widget') as HTMLElement;
			if (widget) {
				altchaWidget = new Altcha({
					challengejson: JSON.stringify(data.altchaChallenge),
					auto: 'onsubmit',
					hideFooter: true
				});
				widget.appendChild(altchaWidget);
			}
		}

		formReady = true;
	});

	function handleReset() {
		if (altchaWidget) {
			altchaWidget.reset();
		}
	}
</script>

<div class="card mx-auto w-full max-w-md bg-base-100 shadow-xl">
	<div class="card-body">
		<h2 class="card-title justify-center text-2xl">Contact Us</h2>
		<p class="mb-4 text-center text-base-content/70">Get in touch with {$businessInfo.name}</p>

		{#if form?.success}
			<div class="alert alert-success">
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
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<div>
					<h3 class="font-bold">Thank you for your message!</h3>
					<p class="text-sm">We'll get back to you soon.</p>
				</div>
			</div>
		{:else if !formReady}
			<div class="flex flex-col items-center py-8">
				<span class="loading loading-lg loading-spinner"></span>
				<p class="mt-4">Loading security verification...</p>
			</div>
		{:else}
			{#if form?.error}
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
						<h3 class="font-bold">Error!</h3>
						<p class="text-sm">{form.error}</p>
					</div>
				</div>
			{/if}

			<form
				method="POST"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update();
						submitting = false;
						if (form?.success) {
							handleReset();
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
						value={form?.name ?? ''}
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
						value={form?.email ?? ''}
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
						placeholder="Tell us how we can help...">{form?.message ?? ''}</textarea
					>
				</fieldset>

				<button type="submit" class="btn mt-4 w-full btn-primary" disabled={submitting}>
					{#if submitting}
						<span class="loading loading-spinner"></span>
						Sending...
					{:else}
						Send Message
					{/if}
				</button>
			</form>
		{/if}
	</div>
</div>

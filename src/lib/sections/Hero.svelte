<script lang="ts">
	import { businessInfo } from '$lib/stores/business';

	interface Props {
		title?: string;
		subtitle?: string;
		ctaText?: string;
		ctaHref?: string;
		showBusinessInfo?: boolean;
	}

	let {
		title = 'Welcome to Our Website',
		subtitle = 'We provide professional services to help your business grow.',
		ctaText = 'Get Started',
		ctaHref = '/contact',
		showBusinessInfo = false
	}: Props = $props();
</script>

<section class="hero min-h-[70vh] bg-base-200">
	<div class="hero-content mx-auto grid max-w-6xl items-center gap-8 px-4 lg:grid-cols-2">
		<div class="text-center lg:text-left">
			<h1 class="text-5xl font-bold text-base-content">{title}</h1>
			<p class="py-6 text-lg text-base-content/70">{subtitle}</p>
			<a href={ctaHref} class="btn px-8 text-lg btn-primary">{ctaText}</a>
			{#if showBusinessInfo}
				<div class="mt-8 border-t border-base-content/20 pt-6">
					<p class="text-base-content/80">
						<strong>Phone:</strong>
						<a href="tel:{$businessInfo.phone}" class="link link-primary">{$businessInfo.phone}</a>
					</p>
					<p class="text-base-content/80">
						<strong>Email:</strong>
						<a href="mailto:{$businessInfo.email}" class="link link-primary"
							>{$businessInfo.email}</a
						>
					</p>
				</div>
			{/if}
		</div>
		<div class="hidden lg:block">
			<div
				class="placeholder flex h-80 items-center justify-center rounded-2xl border-2 border-dashed border-base-content/30 bg-base-300"
			>
				<span class="text-2xl text-base-content/40">Hero Image</span>
			</div>
		</div>
	</div>
</section>

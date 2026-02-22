<script lang="ts">
	import { businessInfo } from '$lib/stores/business';
	import { navigationItems } from '$lib/stores/navigation';
	const currentYear = new Date().getFullYear();

	interface UrlInfo {
		hostname: string;
		protocol: string;
		port: string;
		href: string;
	}

	let { url }: { url?: UrlInfo } = $props();

	const footerNavItems = $derived($navigationItems.filter((item) => item.showOnFooter));

let poweredByHref = $state('');

$effect(() => {
	poweredByHref = `${url?.protocol ?? 'https:'}//premoweb.com/?utm_source=${encodeURIComponent(
        $businessInfo.name
    )}&utm_medium=referral&utm_campaign=client-footer&utm_content=${encodeURIComponent(url?.href ?? '')}`;
});
</script>

<footer class="mt-auto footer bg-base-200 text-base-content">
	<div class="mx-auto w-full max-w-7xl px-6 py-10">
		<!-- Top: 4-column layout -->
		<div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-8">

			<!-- Brand & tagline -->
			<div class="flex flex-col gap-3">
				<a href="/" class="text-xl font-bold text-base-content">{$businessInfo.name}</a>
				{#if $businessInfo.tagline}
					<p class="text-sm opacity-70 leading-relaxed">{$businessInfo.tagline}</p>
				{/if}
			</div>

			<!-- Navigation links -->
			<nav aria-label="Footer navigation">
				<h3 class="mb-3 text-xs font-semibold uppercase tracking-widest opacity-60">Pages</h3>
				<ul class="flex flex-col gap-2">
					{#each footerNavItems as item}
						<li><a href={item.href} class="link link-hover text-sm">{item.label}</a></li>
					{/each}
				</ul>
			</nav>

			<!-- Legal links -->
			<nav aria-label="Legal">
				<h3 class="mb-3 text-xs font-semibold uppercase tracking-widest opacity-60">Legal</h3>
				<ul class="flex flex-col gap-2">
					<li><a href="/privacy" class="link link-hover text-sm">Privacy Policy</a></li>
					<li><a href="/terms" class="link link-hover text-sm">Terms of Service</a></li>
					<li><a href="/dmca" class="link link-hover text-sm">DMCA Policy</a></li>				<li><a href="/ccpa" class="link link-hover text-sm">CCPA Notice</a></li>					<li><a href="/contact" class="link link-hover text-sm">Contact</a></li>
				</ul>
			</nav>

			<!-- Business contact info -->
			<div>
				<h3 class="mb-3 text-xs font-semibold uppercase tracking-widest opacity-60">Contact</h3>
				<ul class="flex flex-col gap-2 text-sm">
					<li>
						<a href="tel:{$businessInfo.phone}" class="link link-hover">{$businessInfo.phone}</a>
					</li>
					{#if $businessInfo.fax}
					<li class="opacity-70">Fax: {$businessInfo.fax}</li>
					{/if}
					<li>
						<a href="mailto:{$businessInfo.email}" class="link link-hover">{$businessInfo.email}</a>
					</li>
					{#each $businessInfo.addresses as addr}
						<li class="leading-relaxed">
							<span class="font-semibold">{addr.name}</span><br />
							<span class="opacity-70">{addr.street}<br />{addr.city}, {addr.state} {addr.zip}</span>
						</li>
					{/each}
				</ul>
			</div>

		</div>
	</div>

	<!-- Bottom bar -->
	<div class="w-full border-t border-base-300 bg-base-200">
		<div class="mx-auto w-full max-w-7xl px-6 py-4 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:py-3 sm:gap-0">
			<!-- Copyright + legal links -->
			<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
				<span class="opacity-80">© {currentYear} {$businessInfo.name}. All rights reserved.</span>
				<div class="flex flex-wrap gap-x-3 gap-y-1 opacity-60">
					<a href="/dmca" class="link link-hover">DMCA</a>
					<a href="/ccpa" class="link link-hover">CCPA</a>
					<a href="/gdpr" class="link link-hover">GDPR</a>
					<a href="/accessibility" class="link link-hover">Accessibility</a>
				</div>
			</div>
			<!-- Powered by -->
			<div class="opacity-60 sm:opacity-100">
				<a href={poweredByHref} target="_blank" rel="noopener noreferrer" class="link link-hover">
					Powered by PremoWeb LLC
				</a>
			</div>
		</div>
	</div>
</footer>

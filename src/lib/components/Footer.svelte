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
</script>

<footer
	class="footer-center mt-auto footer border-t border-base-300 bg-base-200 p-10 text-base-content"
>
	<nav>
		<div class="grid grid-flow-col gap-4">
			{#each footerNavItems as item}
				<a href={item.href} class="link link-hover">{item.label}</a>
			{/each}
		</div>
	</nav>
	<nav>
		<div class="grid grid-flow-col gap-4">
			<a class="link link-hover">Privacy Policy</a>
			<a class="link link-hover">Terms of Service</a>
			<a href="/contact" class="link link-hover">Contact</a>
		</div>
	</nav>
	<aside>
		<p>© {currentYear} {$businessInfo.name}. All rights reserved.</p>
		<p>
			<a
				href="{url?.protocol}//premoweb.com/?utm_source={encodeURIComponent(
					$businessInfo.name
				)}&utm_medium=referral&utm_campaign=client-footer&utm_content={encodeURIComponent(
					url?.href ?? ''
				)}"
				class="link link-hover"
			>
				Powered by PremoWeb LLC
			</a>
		</p>
	</aside>
</footer>

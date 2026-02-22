<script lang="ts">
	import { businessInfo } from '$lib/stores/business';
	import { navigationItems } from '$lib/stores/navigation';
	import { slide, fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page, navigating } from '$app/state';


	const userTimezone = browser ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';

	let scrollY = $state(0);
	let isScrolled = $derived(scrollY > 50);
	let layoutDropdownOpen = $state(false);
	let mobileMenuOpen = $state(false);
	let mobileLayoutsOpen = $state(false);
	const headerNavItems = $derived($navigationItems.filter((item) => item.showOnHeader));
	// Use navigating.to during navigation so the indicator moves immediately on click,
	// before the page transition finishes.
	const activePath = $derived(navigating.to?.url.pathname ?? page.url.pathname);
	const layoutOnlyPaths = ['/fullwidth', '/pricing', '/team', '/portfolio', '/dashboard', '/timeline'];
	const isLayoutsActive = $derived(layoutOnlyPaths.some((p) => activePath === p || activePath.startsWith(p + '/')));

	function isActive(href: string): boolean {
		if (href === '/') return activePath === '/';
		return activePath === href || activePath.startsWith(href + '/');
	}

	// sliding nav indicator
	let navEl: HTMLElement | null = $state(null);
	let navLinkEls: (HTMLElement | null)[] = $state([]);
	let layoutsBtnEl: HTMLElement | null = $state(null);
	let faqLinkEl: HTMLElement | null = $state(null);
	let indicatorLeft = $state(0);
	let indicatorWidth = $state(0);
	let indicatorTop = $state(0);
	let indicatorHeight = $state(0);
	let indicatorVisible = $state(false);
	let indicatorMounted = $state(false);

	// Reactively resolve which element should have the pill — no DOM querying needed
	const activeNavEl = $derived.by(() => {
		const activeIdx = headerNavItems.findIndex((item) => isActive(item.href));
		if (activeIdx >= 0) return navLinkEls[activeIdx] ?? null;
		if (isLayoutsActive) return layoutsBtnEl;
		if (isActive('/faq')) return faqLinkEl;
		return null;
	});

	function updateIndicator() {
		const el = activeNavEl;
		if (!el || !navEl) { indicatorVisible = false; return; }
		const navRect = navEl.getBoundingClientRect();
		const elRect = el.getBoundingClientRect();
		indicatorLeft = elRect.left - navRect.left;
		indicatorWidth = elRect.width;
		indicatorTop = elRect.top - navRect.top;
		indicatorHeight = elRect.height;
		indicatorVisible = true;
	}

	// $effect re-runs whenever activeNavEl changes (i.e. on every navigation),
	// replacing the afterNavigate + querySelector approach entirely.
	$effect(() => {
		const el = activeNavEl;
		const raf = requestAnimationFrame(() => {
			if (!el || !navEl) { indicatorVisible = false; }
			else { updateIndicator(); }
			indicatorMounted = true;
		});
		return () => cancelAnimationFrame(raf);
	});

	function toggleLayoutDropdown() {
		layoutDropdownOpen = !layoutDropdownOpen;
	}

	function closeLayoutDropdown() {
		layoutDropdownOpen = false;
	}

	function openMobileMenu() {
		mobileMenuOpen = true;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
		mobileLayoutsOpen = false;
	}

	function toggleMobileLayouts() {
		mobileLayoutsOpen = !mobileLayoutsOpen;
	}

	// Auto-close mobile menu when a navigation starts
	$effect(() => {
		if (navigating.to) closeMobileMenu();
	});

	function handleDocumentClick(event: MouseEvent) {
		const target = event.target as Element;
		if (!target.closest('.mega-menu-container') && layoutDropdownOpen) {
			closeLayoutDropdown();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
	    if (event.key === 'Escape' && layoutDropdownOpen) closeLayoutDropdown();
	}

	onMount(() => {
		const handleScroll = () => { scrollY = window.scrollY; };
		const onResize = () => requestAnimationFrame(updateIndicator);
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', onResize, { passive: true });
		document.addEventListener('keydown', handleKeydown);
		document.addEventListener('click', handleDocumentClick);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', onResize);
			document.removeEventListener('click', handleDocumentClick);
			document.removeEventListener('keydown', handleKeydown);
		};
	});

	function formatTimeInTimezone(time: string, fromTz: string, toTz: string): string {
		const [timeStr, period] = time.split(' ');
		const [hours, minutes] = timeStr.split(':').map(Number);
		let hour24 = hours;
		if (period === 'PM' && hours !== 12) hour24 += 12;
		if (period === 'AM' && hours === 12) hour24 = 0;

		const date = new Date();
		date.setHours(hour24, minutes, 0, 0);

		const formatter = new Intl.DateTimeFormat('en-US', {
			timeZone: toTz,
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		});

		return formatter.format(date);
	}

	function getTodayHours(): string {
		const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		const today = days[new Date().getDay()];
		const hours = $businessInfo.hours[today];
		if (hours?.closed) return 'Closed';

		const openTime = formatTimeInTimezone(hours!.open!, $businessInfo.timezone, userTimezone);
		const closeTime = formatTimeInTimezone(hours!.close!, $businessInfo.timezone, userTimezone);
		const tzAbbr =
			new Intl.DateTimeFormat('en-US', { timeZone: userTimezone, timeZoneName: 'short' })
				.formatToParts()
				.find((p) => p.type === 'timeZoneName')?.value || userTimezone;
		return `${openTime} - ${closeTime} ${tzAbbr}`;
	}
</script>

<header class="sticky top-0 z-50">
	<div
		class="border-b border-base-300 bg-base-200 transition-all duration-300"
		style="padding-top: {isScrolled ? '0.25rem' : '1rem'}; padding-bottom: {isScrolled ? '0.25rem' : '1rem'};"
	>
		<div class="mx-auto flex max-w-7xl items-center justify-between px-6">
			<div>
				<a href="/" class="text-xl font-bold text-base-content">
					{$businessInfo.name}
				</a>
				{#if $businessInfo.tagline}
					<p
						class="overflow-hidden text-sm transition-all duration-300"
						style="max-height: {isScrolled ? '0' : '2rem'}; opacity: {isScrolled ? '0' : '0.6'}; margin-top: {isScrolled ? '0' : '0.25rem'};"
					>
						{$businessInfo.tagline}
					</p>
				{/if}
			</div>
			<div class="flex items-center gap-4">
				<div class="hidden flex-col items-end sm:flex">
					<span class="text-xs opacity-60">Call Us Today</span>
					<a href="tel:{$businessInfo.phone}" class="text-sm font-bold">{$businessInfo.phone}</a>
				</div>
			</div>
		</div>
	</div>

	<nav
		class="relative z-40 border-b border-base-300 bg-base-100  shadow-sm transition-all duration-300"
		class:py-1={isScrolled}
		class:py-2={!isScrolled}
	>
		<div class="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
<div class="flex items-center gap-2">
				<!-- Mobile hamburger -->
				<button
					type="button"
					class="btn btn-ghost btn-sm lg:hidden"
					aria-label="Open navigation menu"
					onclick={openMobileMenu}
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
					</svg>
				</button>

				<ul bind:this={navEl} class="nav-pill-host menu menu-horizontal hidden lg:flex pl-0 gap-1 relative">
					<!-- sliding active indicator -->
					{#if indicatorVisible}
						<span
							aria-hidden="true"
							class="pointer-events-none absolute rounded-btn bg-neutral z-0"
							style="left:{indicatorLeft}px; width:{indicatorWidth}px; top:{indicatorTop}px; height:{indicatorHeight}px; transition:{indicatorMounted ? 'left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)' : 'none'};"
						></span>
					{/if}
					{#each headerNavItems as item, i}
						<li class="z-10"><a href={item.href} bind:this={navLinkEls[i]} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</a></li>
					{/each}
					<li class="mega-menu-container relative z-10">
						<button type="button" class="btn btn-ghost btn-sm" bind:this={layoutsBtnEl} aria-current={isLayoutsActive ? 'page' : undefined} onclick={toggleLayoutDropdown}>
							Layouts
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 transition-transform"
								class:rotate-180={layoutDropdownOpen}
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>
					</li>
					<li class="z-10"><a href="/faq" bind:this={faqLinkEl} aria-current={isActive('/faq') ? 'page' : undefined}>FAQ</a></li>
				</ul>
			</div>

			<div class="flex items-center gap-4">
				<span class="hidden text-sm md:inline-block">Hours: {getTodayHours()}</span>
			</div>
		</div>

		{#if layoutDropdownOpen}
			<div
				transition:slide={{ duration: 250 }}
				class="mega-menu-container absolute top-full left-0 right-0 z-40 border-b border-base-300 bg-base-100 shadow-xl"
			>
			<div class="mx-auto max-w-7xl">
		<!-- Header -->
		<div class="flex items-center justify-between border-b border-base-300 px-6 py-3">
			<div>
				<span class="font-semibold text-base-content">Browse Layouts</span>
				<span class="ml-2 text-xs opacity-50">14 pre-built page templates</span>
			</div>
			<button
				type="button"
				class="btn btn-ghost btn-sm btn-circle"
				aria-label="Close layouts menu"
				onclick={closeLayoutDropdown}
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>

		<!-- Grid -->
		<div class="grid grid-cols-5 gap-0 divide-x divide-base-300 px-2 py-4">

			<!-- Landing -->
			<div class="px-4">
				<p class="mb-2 text-xs font-semibold uppercase tracking-wider opacity-40">Landing</p>
				<ul class="space-y-1">
					<li>
						<a
							href="/"
							onclick={closeLayoutDropdown}
							class="block rounded-lg px-3 py-2 transition-colors hover:bg-base-200"
							class:bg-base-200={page.url.pathname === '/'}
						>
							<div class="text-sm font-medium text-base-content">FrontPage</div>
							<div class="text-xs opacity-50">Hero, feature cards &amp; CTA</div>
						</a>
					</li>
					<li>
						<a
							href="/services/responsive-design-best-practices"
							onclick={closeLayoutDropdown}
							class="block rounded-lg px-3 py-2 transition-colors hover:bg-base-200"
							class:bg-base-200={page.url.pathname === '/services/responsive-design-best-practices'}
						>
							<div class="text-sm font-medium text-base-content">SplitHero</div>
							<div class="text-xs opacity-50">50/50 text &amp; image sections</div>
						</a>
					</li>
				</ul>
			</div>

			<!-- Blog -->
			<div class="px-4">
				<p class="mb-2 text-xs font-semibold uppercase tracking-wider opacity-40">Blog</p>
				<ul class="space-y-1">
					<li>
						<a
							href="/blog"
							onclick={closeLayoutDropdown}
							class="block rounded-lg px-3 py-2 transition-colors hover:bg-base-200"
							class:bg-base-200={page.url.pathname === '/blog'}
						>
							<div class="text-sm font-medium text-base-content">BlogIndex</div>
							<div class="text-xs opacity-50">Article grid with pagination</div>
						</a>
					</li>
					<li>
						<a
							href="/blog/getting-started-with-sveltekit"
							onclick={closeLayoutDropdown}
							class="block rounded-lg px-3 py-2 transition-colors hover:bg-base-200"
							class:bg-base-200={page.url.pathname === '/blog/getting-started-with-sveltekit'}
						>
							<div class="text-sm font-medium text-base-content">BlogPost</div>
							<div class="text-xs opacity-50">Single article with sidebar</div>
						</a>
					</li>
				</ul>
			</div>

			<!-- Content -->
			<div class="px-4">
				<p class="mb-2 text-xs font-semibold uppercase tracking-wider opacity-40">Content</p>
				<ul class="space-y-1">
					<li>
						<a
							href="/about"
							onclick={closeLayoutDropdown}
							class="block rounded-lg px-3 py-2 transition-colors hover:bg-base-200"
							class:bg-base-200={page.url.pathname === '/about'}
						>
							<div class="text-sm font-medium text-base-content">TwoColumn</div>
							<div class="text-xs opacity-50">Sticky sidebar &amp; main content</div>
						</a>
					</li>
					<li>
						<a
							href="/fullwidth"
							onclick={closeLayoutDropdown}
							class="block rounded-lg px-3 py-2 transition-colors hover:bg-base-200"
							class:bg-base-200={page.url.pathname === '/fullwidth'}
						>
							<div class="text-sm font-medium text-base-content">FullWidth</div>
							<div class="text-xs opacity-50">Edge-to-edge, no sidebars</div>
						</a>
					</li>
				</ul>
			</div>

			<!-- Business -->
			<div class="px-4">
				<p class="mb-2 text-xs font-semibold uppercase tracking-wider opacity-40">Business</p>
				<ul class="space-y-1">
					<li>
						<a
							href="/services"
							onclick={closeLayoutDropdown}
							class="block rounded-lg px-3 py-2 transition-colors hover:bg-base-200"
							class:bg-base-200={page.url.pathname === '/services'}
						>
							<div class="text-sm font-medium text-base-content">ServicesGrid</div>
							<div class="text-xs opacity-50">Icon, title &amp; description cards</div>
						</a>
					</li>
					<li>
						<a
							href="/contact"
							onclick={closeLayoutDropdown}
							class="block rounded-lg px-3 py-2 transition-colors hover:bg-base-200"
							class:bg-base-200={page.url.pathname === '/contact'}
						>
							<div class="text-sm font-medium text-base-content">ContactPage</div>
							<div class="text-xs opacity-50">Form with contact info split</div>
						</a>
					</li>
				</ul>
			</div>

			<!-- More -->
			<div class="px-4">
				<p class="mb-2 text-xs font-semibold uppercase tracking-wider opacity-40">More</p>
				<ul class="space-y-1">
					<li>
						<a
							href="/pricing"
							onclick={closeLayoutDropdown}
							class="block rounded-lg px-3 py-2 transition-colors hover:bg-base-200"
							class:bg-base-200={page.url.pathname === '/pricing'}
						>
							<div class="text-sm font-medium text-base-content">Pricing</div>
							<div class="text-xs opacity-50">Tiered plans with feature lists</div>
						</a>
					</li>
					<li>
						<a
							href="/team"
							onclick={closeLayoutDropdown}
							class="block rounded-lg px-3 py-2 transition-colors hover:bg-base-200"
							class:bg-base-200={page.url.pathname === '/team'}
						>
							<div class="text-sm font-medium text-base-content">Team</div>
							<div class="text-xs opacity-50">Member cards with social links</div>
						</a>
					</li>
					<li>
						<a
							href="/faq"
							onclick={closeLayoutDropdown}
							class="block rounded-lg px-3 py-2 transition-colors hover:bg-base-200"
							class:bg-base-200={page.url.pathname === '/faq'}
						>
							<div class="text-sm font-medium text-base-content">FAQ</div>
							<div class="text-xs opacity-50">Categorised accordion questions</div>
						</a>
					</li>
					<li>
						<a
							href="/portfolio"
							onclick={closeLayoutDropdown}
							class="block rounded-lg px-3 py-2 transition-colors hover:bg-base-200"
							class:bg-base-200={page.url.pathname === '/portfolio'}
						>
							<div class="text-sm font-medium text-base-content">Portfolio</div>
							<div class="text-xs opacity-50">Filterable project grid</div>
						</a>
					</li>
					<li>
						<a
							href="/dashboard"
							onclick={closeLayoutDropdown}
							class="block rounded-lg px-3 py-2 transition-colors hover:bg-base-200"
							class:bg-base-200={page.url.pathname === '/dashboard'}
						>
							<div class="text-sm font-medium text-base-content">Dashboard</div>
							<div class="text-xs opacity-50">Sidebar, stats &amp; data table</div>
						</a>
					</li>
					<li>
						<a
							href="/timeline"
							onclick={closeLayoutDropdown}
							class="block rounded-lg px-3 py-2 transition-colors hover:bg-base-200"
							class:bg-base-200={page.url.pathname === '/timeline'}
						>
							<div class="text-sm font-medium text-base-content">Timeline</div>
							<div class="text-xs opacity-50">Vertical event &amp; milestone list</div>
						</a>
					</li>
				</ul>
			</div>
		</div>

			<!-- Footer -->
			<div class="border-t border-base-300 px-6 py-2.5 text-xs opacity-40">
				All layouts use SvelteKit + DaisyUI v5 + Tailwind CSS
			</div>
		</div><!-- /max-w-7xl -->
		</div><!-- /mega-menu-container -->
		{/if}
	</nav>

	<!-- Mobile drawer -->
	{#if mobileMenuOpen}
		<!-- Backdrop -->
		<div
			class="fixed inset-0 z-50 bg-black/50"
			transition:fade={{ duration: 200 }}
			aria-hidden="true"
			onclick={closeMobileMenu}
		></div>

		<!-- Slide-in panel -->
		<div
			class="fixed top-0 left-0 z-50 flex h-full w-80 max-w-[90vw] flex-col bg-base-100 shadow-2xl"
			transition:fly={{ x: -320, duration: 300, easing: cubicOut }}
			role="dialog"
			aria-modal="true"
			aria-label="Navigation"
		>
			<!-- Drawer header -->
			<div class="flex items-center justify-between border-b border-base-300 px-4 py-4">
				<a href="/" class="text-lg font-bold text-base-content" onclick={closeMobileMenu}>
					{$businessInfo.name}
				</a>
				<button
					type="button"
					class="btn btn-ghost btn-sm btn-circle"
					aria-label="Close menu"
					onclick={closeMobileMenu}
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>

			<!-- Nav links -->
			<nav class="flex-1 overflow-y-auto px-2 py-3">
				<ul class="menu w-full p-0 gap-0.5">
					{#each headerNavItems as item}
						<li>
							<a
								href={item.href}
								class:menu-active={isActive(item.href)}
								onclick={closeMobileMenu}
							>
								{item.label}
							</a>
						</li>
					{/each}

					<!-- Layouts accordion -->
					<li>
						<button
							type="button"
							class="justify-between"
							class:menu-active={isLayoutsActive}
							onclick={toggleMobileLayouts}
						>
							Layouts
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 transition-transform"
								class:rotate-180={mobileLayoutsOpen}
								fill="none" viewBox="0 0 24 24" stroke="currentColor"
							>
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
							</svg>
						</button>
						{#if mobileLayoutsOpen}
							<ul transition:slide={{ duration: 200 }} class="pl-2">
								<li><a href="/" class:menu-active={page.url.pathname === '/'} onclick={closeMobileMenu}>FrontPage</a></li>
								<li><a href="/services/responsive-design-best-practices" class:menu-active={page.url.pathname === '/services/responsive-design-best-practices'} onclick={closeMobileMenu}>SplitHero</a></li>
								<li><a href="/blog" class:menu-active={isActive('/blog')} onclick={closeMobileMenu}>BlogIndex</a></li>
								<li><a href="/blog/getting-started-with-sveltekit" class:menu-active={page.url.pathname === '/blog/getting-started-with-sveltekit'} onclick={closeMobileMenu}>BlogPost</a></li>
								<li><a href="/about" class:menu-active={page.url.pathname === '/about'} onclick={closeMobileMenu}>TwoColumn</a></li>
								<li><a href="/fullwidth" class:menu-active={page.url.pathname === '/fullwidth'} onclick={closeMobileMenu}>FullWidth</a></li>
								<li><a href="/services" class:menu-active={isActive('/services')} onclick={closeMobileMenu}>ServicesGrid</a></li>
								<li><a href="/contact" class:menu-active={page.url.pathname === '/contact'} onclick={closeMobileMenu}>ContactPage</a></li>
								<li><a href="/pricing" class:menu-active={page.url.pathname === '/pricing'} onclick={closeMobileMenu}>Pricing</a></li>
								<li><a href="/team" class:menu-active={page.url.pathname === '/team'} onclick={closeMobileMenu}>Team</a></li>
								<li><a href="/portfolio" class:menu-active={page.url.pathname === '/portfolio'} onclick={closeMobileMenu}>Portfolio</a></li>
								<li><a href="/dashboard" class:menu-active={page.url.pathname === '/dashboard'} onclick={closeMobileMenu}>Dashboard</a></li>
								<li><a href="/timeline" class:menu-active={page.url.pathname === '/timeline'} onclick={closeMobileMenu}>Timeline</a></li>
							</ul>
						{/if}
					</li>

					<li>
						<a href="/faq" class:menu-active={isActive('/faq')} onclick={closeMobileMenu}>FAQ</a>
					</li>
				</ul>
			</nav>

			<!-- Drawer footer -->
			<div class="border-t border-base-300 px-4 py-4">
				<p class="text-xs opacity-60">Call Us Today</p>
				<a href="tel:{$businessInfo.phone}" class="font-bold text-base-content">{$businessInfo.phone}</a>
				<p class="mt-2 text-xs opacity-60">Hours: {getTodayHours()}</p>
			</div>
		</div>
	{/if}

</header>

<style>
	/* Style aria-current links/buttons on desktop nav — sliding pill provides the background */
	.nav-pill-host :where(li > a[aria-current="page"], li > button[aria-current="page"]) {
		background-color: transparent !important;
		background-image: none !important;
		box-shadow: none !important;
		color: var(--color-neutral-content);
	}
</style>
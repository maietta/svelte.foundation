<script lang="ts">
	import { businessInfo } from '$lib/stores/business';
	import { navigationItems } from '$lib/stores/navigation';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { afterNavigate } from '$app/navigation';

	const userTimezone = browser ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';

	let scrollY = $state(0);
	let isScrolled = $derived(scrollY > 50);
	let layoutDropdownOpen = $state(false);
	const headerNavItems = $derived($navigationItems.filter((item) => item.showOnHeader));
	const currentPath = $derived($page.url.pathname);
	const layoutOnlyPaths = ['/fullwidth', '/pricing', '/team', '/portfolio', '/dashboard', '/timeline'];
	const isLayoutsActive = $derived(layoutOnlyPaths.some((p) => currentPath === p || currentPath.startsWith(p + '/')));

	function isActive(href: string): boolean {
		if (href === '/') return currentPath === '/';
		return currentPath === href || currentPath.startsWith(href + '/');
	}

	// sliding nav indicator
	let navEl: HTMLElement | null = $state(null);
	let indicatorLeft = $state(0);
	let indicatorWidth = $state(0);
	let indicatorTop = $state(0);
	let indicatorHeight = $state(0);
	let indicatorVisible = $state(false);
	let indicatorMounted = $state(false);

	function updateIndicator() {
		if (!navEl) return;
		const activeEl = navEl.querySelector<HTMLElement>('a.menu-active, button.btn-active');
		if (activeEl) {
			const navRect = navEl.getBoundingClientRect();
			const elRect = activeEl.getBoundingClientRect();
			indicatorLeft = elRect.left - navRect.left;
			indicatorWidth = elRect.width;
			indicatorTop = elRect.top - navRect.top;
			indicatorHeight = elRect.height;
			indicatorVisible = true;
		} else {
			indicatorVisible = false;
		}
	}

	// afterNavigate fires after the page has fully settled — no mid-transition measurements
	afterNavigate(() => {
		requestAnimationFrame(() => {
			updateIndicator();
			// On the very first call indicatorMounted is false (no transition),
			// on subsequent navigations it's already true (pill slides).
			indicatorMounted = true;
		});
	});

	let headerEl: HTMLElement | null = null;
	let megaTop = $state(0);

	function updateMegaTop() {
		if (headerEl) {
			megaTop = Math.ceil(headerEl.getBoundingClientRect().height);
		} else {
			megaTop = 0;
		}
	}

	function toggleLayoutDropdown() {
		layoutDropdownOpen = !layoutDropdownOpen;
	}

	function closeLayoutDropdown() {
		layoutDropdownOpen = false;
	}

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
		let transitionTimer: ReturnType<typeof setTimeout>;
		const handleScroll = () => {
			scrollY = window.scrollY;
			updateMegaTop();
			// also update after transition completes (300ms duration)
			clearTimeout(transitionTimer);
			transitionTimer = setTimeout(updateMegaTop, 320);
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', updateMegaTop, { passive: true });
		window.addEventListener('resize', updateIndicator, { passive: true });
		document.addEventListener('keydown', handleKeydown);
		// set initial top
		updateMegaTop();
		document.addEventListener('click', handleDocumentClick);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', updateMegaTop);
			window.removeEventListener('resize', updateIndicator);
			document.removeEventListener('click', handleDocumentClick);
			document.removeEventListener('keydown', handleKeydown);
			clearTimeout(transitionTimer);
		};
	});

	$effect(() => {
		// re-run whenever isScrolled flips so megaTop stays current
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		isScrolled;
		if (headerEl) {
			updateMegaTop();
			// catch the end of the 300ms CSS transition
			const t = setTimeout(updateMegaTop, 320);
			return () => clearTimeout(t);
		}
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

<header bind:this={headerEl} class="sticky top-0 z-50">
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
			<div class="flex items-center gab-4">
				<div class="dropdown">
					<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</div>
					<ul
						tabindex="0"
						role="menu"
						class="dropdown-content menu z-1 mt-3 w-52 menu-sm rounded-box bg-base-100 p-2 shadow"
					>
						{#each headerNavItems as item}
					<li><a href={item.href} class:menu-active={isActive(item.href)}>{item.label}</a></li>
				{/each}
					<li><a href="/" class:menu-active={currentPath === '/'}>FrontPage</a></li>
					<li><a href="/blog" class:menu-active={isActive('/blog')}>BlogIndex</a></li>
					<li><a href="/blog/getting-started-with-sveltekit" class:menu-active={currentPath === '/blog/getting-started-with-sveltekit'}>BlogPost</a></li>
					<li><a href="/services" class:menu-active={isActive('/services')}>ServicesGrid</a></li>
					<li><a href="/services/responsive-design-best-practices" class:menu-active={currentPath === '/services/responsive-design-best-practices'}>SplitHero</a></li>
					<li><a href="/about" class:menu-active={currentPath === '/about'}>TwoColumn</a></li>
					<li><a href="/contact" class:menu-active={currentPath === '/contact'}>ContactPage</a></li>
					<li><a href="/fullwidth" class:menu-active={currentPath === '/fullwidth'}>FullWidth</a></li>
					<li><a href="/pricing" class:menu-active={currentPath === '/pricing'}>Pricing</a></li>
					<li><a href="/team" class:menu-active={currentPath === '/team'}>Team</a></li>
					<li><a href="/faq" class:menu-active={currentPath === '/faq'}>FAQ</a></li>
					<li><a href="/portfolio" class:menu-active={currentPath === '/portfolio'}>Portfolio</a></li>
					<li><a href="/dashboard" class:menu-active={currentPath === '/dashboard'}>Dashboard</a></li>
					<li><a href="/timeline" class:menu-active={currentPath === '/timeline'}>Timeline</a></li>
					</ul>
				</div>

				<ul bind:this={navEl} class="nav-pill-host menu menu-horizontal hidden lg:flex pl-0 gap-1 relative">
					<!-- sliding active indicator -->
					{#if indicatorVisible}
						<span
							aria-hidden="true"
							class="pointer-events-none absolute rounded-btn bg-neutral z-0"
							style="left:{indicatorLeft}px; width:{indicatorWidth}px; top:{indicatorTop}px; height:{indicatorHeight}px; transition:{indicatorMounted ? 'left 0.3s cubic-bezier(0.4,0,0.2,1), width 0.3s cubic-bezier(0.4,0,0.2,1)' : 'none'};"
						></span>
					{/if}
					{#each headerNavItems as item}
						<li class="z-10"><a href={item.href} class:menu-active={isActive(item.href)}>{item.label}</a></li>
					{/each}
					<li class="mega-menu-container relative z-10">
						<button type="button" class="btn btn-ghost btn-sm" class:btn-active={isLayoutsActive} onclick={toggleLayoutDropdown}>
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
					<li class="z-10"><a href="/faq" class:menu-active={isActive('/faq')}>FAQ</a></li>
				</ul>
			</div>

			<div class="flex items-center gap-4">
				<span class="hidden text-sm md:inline-block">Hours: {getTodayHours()}</span>
			</div>
		</div>
	</nav>

</header>


{#if layoutDropdownOpen}
	<div
		role="dialog"
		tabindex="0"
		class="mega-menu-container fixed inset-x-0 z-40 mx-auto max-w-7xl border border-base-300 bg-base-100 shadow-xl"
		style="top: {megaTop}px;"
		onclick={(e) => e.stopPropagation()}
		onkeydown={(e) => e.key === 'Escape' && closeLayoutDropdown()}
	>
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
							class:bg-base-200={currentPath === '/'}
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
							class:bg-base-200={currentPath === '/services/responsive-design-best-practices'}
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
							class:bg-base-200={currentPath === '/blog'}
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
							class:bg-base-200={currentPath === '/blog/getting-started-with-sveltekit'}
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
							class:bg-base-200={currentPath === '/about'}
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
							class:bg-base-200={currentPath === '/fullwidth'}
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
							class:bg-base-200={currentPath === '/services'}
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
							class:bg-base-200={currentPath === '/contact'}
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
							class:bg-base-200={currentPath === '/pricing'}
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
							class:bg-base-200={currentPath === '/team'}
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
							class:bg-base-200={currentPath === '/faq'}
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
							class:bg-base-200={currentPath === '/portfolio'}
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
							class:bg-base-200={currentPath === '/dashboard'}
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
							class:bg-base-200={currentPath === '/timeline'}
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
	</div>
{/if}

<style>
	/* Suppress DaisyUI's menu-active background on desktop nav — our sliding pill provides it */
	.nav-pill-host :where(li > a.menu-active) {
		background-color: transparent !important;
		background-image: none !important;
		box-shadow: none !important;
		color: var(--color-neutral-content);
	}
</style>
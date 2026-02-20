<script lang="ts">
	import { businessInfo } from '$lib/stores/business';
	import { navigationItems } from '$lib/stores/navigation';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const userTimezone = browser ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';

	let scrollY = $state(0);
	let isScrolled = $derived(scrollY > 50);
	let layoutDropdownOpen = $state(false);
	const headerNavItems = $derived($navigationItems.filter((item) => item.showOnHeader));

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

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		document.addEventListener('click', handleDocumentClick);
		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('click', handleDocumentClick);
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
		class="border-b border-base-300 bg-base-200 px-4 transition-all duration-300"
		class:hidden={isScrolled}
	>
		<div class="mx-auto flex h-12 max-w-7xl items-center justify-between">
			<a href="/" class="text-xl font-bold text-base-content">
				{$businessInfo.name}
			</a>
			<div class="flex items-center gap-4">
				<div class="hidden flex-col items-end sm:flex">
					<span class="text-xs opacity-60">Call Us Today</span>
					<a href="tel:{$businessInfo.phone}" class="text-sm font-bold">{$businessInfo.phone}</a>
				</div>
			</div>
		</div>
	</div>

	<nav
		class="relative z-40 border-b border-base-300 bg-base-100 px-4 shadow-sm transition-all duration-300"
		class:py-2={isScrolled}
		class:py-3={!isScrolled}
	>
		<div class="mx-auto flex h-16 max-w-7xl items-center justify-between">
			<div class="flex items-center gap-4">
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
						class="dropdown-content menu z-[1] mt-3 w-52 menu-sm rounded-box bg-base-100 p-2 shadow"
					>
						{#each headerNavItems as item}
							<li><a href={item.href}>{item.label}</a></li>
						{/each}
						<li><a href="/">FrontPage</a></li>
						<li><a href="/blog">BlogIndex</a></li>
						<li><a href="/blog/getting-started-with-sveltekit">BlogPost</a></li>
						<li><a href="/services">ServicesGrid</a></li>
						<li><a href="/services/responsive-design-best-practices">SplitHero</a></li>
						<li><a href="/about">TwoColumn</a></li>
						<li><a href="/contact">ContactPage</a></li>
						<li><a href="/fullwidth">FullWidth</a></li>
					</ul>
				</div>

				<ul class="menu menu-horizontal hidden px-1 lg:flex">
					{#each headerNavItems as item}
						<li><a href={item.href}>{item.label}</a></li>
					{/each}
					<li class="mega-menu-container relative">
						<button type="button" class="btn btn-ghost btn-sm" onclick={toggleLayoutDropdown}>
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
				</ul>
			</div>

			<div class="flex items-center gap-4">
				<span class="hidden text-sm md:inline-block">Hours: {getTodayHours()}</span>
			</div>
		</div>
	</nav>

	{#if layoutDropdownOpen}
		<div
			class="mega-menu-container fixed inset-x-0 z-30 mx-auto max-w-7xl border border-base-300 bg-base-100 p-6 shadow-xl"
			style="top: {isScrolled ? '68px' : '76px'};"
		>
			<div class="mx-auto grid max-w-7xl grid-cols-4 gap-6">
				<div>
					<h3 class="mb-2 font-bold text-base-content">Home Pages</h3>
					<ul class="space-y-2">
						<li>
							<a href="/" class="link link-primary" onclick={closeLayoutDropdown}>FrontPage</a>
						</li>
						<li>
							<a href="/services" class="link link-primary" onclick={closeLayoutDropdown}
								>Services</a
							>
						</li>
					</ul>
					<p class="mt-2 text-xs opacity-60">Landing pages for your business</p>
				</div>
				<div>
					<h3 class="mb-2 font-bold text-base-content">Content Pages</h3>
					<ul class="space-y-2">
						<li>
							<a href="/about" class="link link-primary" onclick={closeLayoutDropdown}>TwoColumn</a>
						</li>
						<li>
							<a href="/fullwidth" class="link link-primary" onclick={closeLayoutDropdown}
								>FullWidth</a
							>
						</li>
					</ul>
					<p class="mt-2 text-xs opacity-60">Standard content layouts</p>
				</div>
				<div>
					<h3 class="mb-2 font-bold text-base-content">Blog</h3>
					<ul class="space-y-2">
						<li>
							<a href="/blog" class="link link-primary" onclick={closeLayoutDropdown}>BlogIndex</a>
						</li>
						<li>
							<a
								href="/blog/getting-started-with-sveltekit"
								class="link link-primary"
								onclick={closeLayoutDropdown}>BlogPost</a
							>
						</li>
					</ul>
					<p class="mt-2 text-xs opacity-60">Blog listing and posts</p>
				</div>
				<div>
					<h3 class="mb-2 font-bold text-base-content">Services</h3>
					<ul class="space-y-2">
						<li>
							<a href="/services" class="link link-primary" onclick={closeLayoutDropdown}
								>ServicesGrid</a
							>
						</li>
						<li>
							<a
								href="/services/responsive-design-best-practices"
								class="link link-primary"
								onclick={closeLayoutDropdown}>SplitHero</a
							>
						</li>
					</ul>
					<p class="mt-2 text-xs opacity-60">Service showcase layouts</p>
				</div>
			</div>
		</div>
	{/if}
</header>

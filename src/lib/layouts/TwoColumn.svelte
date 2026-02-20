<script lang="ts">
	import { page } from '$app/stores';

	interface SidebarItem {
		label: string;
		href: string;
		children?: SidebarItem[];
	}

	interface Props {
		sidebarTitle?: string;
		sidebarItems?: SidebarItem[];
		showSidebar?: boolean;
		sidebarSticky?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		sidebarTitle = 'Navigation',
		sidebarItems = [],
		showSidebar = true,
		sidebarSticky = true,
		children
	}: Props = $props();

	const currentPath = $derived($page.url.pathname);
</script>

<div class="two-column">
	{#if showSidebar && sidebarItems.length > 0}
		<aside class="sidebar" class:sticky={sidebarSticky}>
			{#if sidebarTitle}
				<h3>{sidebarTitle}</h3>
			{/if}
			<nav class="sidebar-nav">
				<ul>
					{#each sidebarItems as item}
						<li>
							<a
								href={item.href}
								class:active={currentPath === item.href || currentPath.startsWith(item.href + '/')}
							>
								{item.label}
							</a>
							{#if item.children && item.children.length > 0}
								<ul class="sub-nav">
									{#each item.children as child}
										<li>
											<a href={child.href} class:active={currentPath === child.href}>
												{child.label}
											</a>
										</li>
									{/each}
								</ul>
							{/if}
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
	{/if}

	<main class="content">
		{#if children}
			{@render children()}
		{/if}
	</main>
</div>

<style>
	.two-column {
		display: grid;
		grid-template-columns: 250px 1fr;
		gap: 48px;
		padding: 48px 24px;
		max-width: 1200px;
		margin: 0 auto;
	}
	.sidebar {
		background: #fafafa;
		border: 2px dashed #999;
		border-radius: 12px;
		padding: 24px;
		height: fit-content;
	}
	.sidebar.sticky {
		position: sticky;
		top: 100px;
	}
	.sidebar h3 {
		font-size: 1.125rem;
		font-weight: 600;
		margin-bottom: 16px;
		padding-bottom: 12px;
		border-bottom: 1px dashed #ccc;
	}
	.sidebar-nav ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.sidebar-nav > ul > li {
		margin-bottom: 8px;
	}
	.sidebar-nav a {
		display: block;
		padding: 8px 12px;
		color: inherit;
		text-decoration: none;
		border-radius: 6px;
		transition: background 0.2s;
	}
	.sidebar-nav a:hover {
		background: #e0e0e0;
	}
	.sidebar-nav a.active {
		background: #333;
		color: white;
	}
	.sub-nav {
		padding-left: 20px !important;
		margin-top: 4px;
	}
	.sub-nav a {
		font-size: 0.875rem;
		padding: 6px 12px;
	}
	.content {
		min-width: 0;
	}
	.content :global(h1) {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 24px;
	}
	.content :global(h2) {
		font-size: 1.75rem;
		font-weight: 600;
		margin: 32px 0 16px;
	}
	.content :global(p) {
		line-height: 1.7;
		margin-bottom: 16px;
		color: #444;
	}
	@media (max-width: 768px) {
		.two-column {
			grid-template-columns: 1fr;
		}
		.sidebar {
			position: static !important;
		}
	}
</style>

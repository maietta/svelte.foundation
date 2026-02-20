<script lang="ts">
	interface StatCard {
		label: string;
		value: string;
		change?: string;
		changeUp?: boolean;
		icon?: string;
	}

	interface NavItem {
		label: string;
		href: string;
		icon?: string;
		active?: boolean;
	}

	interface TableRow {
		[key: string]: string | number;
	}

	interface Props {
		pageTitle?: string;
		stats?: StatCard[];
		navItems?: NavItem[];
		tableHeaders?: string[];
		tableRows?: TableRow[];
		children?: import('svelte').Snippet;
	}

	let {
		pageTitle = 'Dashboard',
		stats = [],
		navItems = [],
		tableHeaders = [],
		tableRows = [],
		children
	}: Props = $props();
</script>

<div class="dashboard-layout">
	<!-- Sidebar -->
	<aside class="dash-sidebar">
		<div class="dash-logo">Admin</div>
		<nav class="dash-nav">
			{#each navItems as item}
				<a href={item.href} class="dash-nav-item" class:active={item.active}>
					{#if item.icon}<span class="nav-icon">{item.icon}</span>{/if}
					{item.label}
				</a>
			{/each}
		</nav>
	</aside>

	<!-- Main area -->
	<main class="dash-main">
		<header class="dash-topbar">
			<h1 class="dash-title">{pageTitle}</h1>
			<div class="dash-actions">
				<button type="button" class="btn-outline">Export</button>
				<button type="button" class="btn-primary">+ New</button>
			</div>
		</header>

		<!-- Stats row -->
		{#if stats.length > 0}
			<div class="stats-grid">
				{#each stats as stat}
					<div class="stat-card">
						<div class="stat-top">
							<span class="stat-label">{stat.label}</span>
							{#if stat.icon}<span class="stat-icon">{stat.icon}</span>{/if}
						</div>
						<div class="stat-value">{stat.value}</div>
						{#if stat.change}
							<div class="stat-change" class:up={stat.changeUp} class:down={!stat.changeUp}>
								{stat.changeUp ? '↑' : '↓'} {stat.change}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		<!-- Custom slot content -->
		{#if children}
			{@render children()}
		{:else if tableHeaders.length > 0}
			<!-- Default table view -->
			<div class="table-card">
				<div class="table-header">
					<h2>Recent Data</h2>
				</div>
				<div class="table-wrap">
					<table>
						<thead>
							<tr>
								{#each tableHeaders as header}
									<th>{header}</th>
								{/each}
							</tr>
						</thead>
						<tbody>
							{#each tableRows as row}
								<tr>
									{#each tableHeaders as header}
										<td>{row[header.toLowerCase()] ?? '—'}</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	</main>
</div>

<style>
	.dashboard-layout {
		display: flex;
		height: calc(100vh - 140px);
		min-height: 500px;
		border: 1px solid oklch(var(--b3));
		border-radius: var(--radius-box);
		overflow: hidden;
		background: oklch(var(--b2));
		margin: 24px;
	}
	.dash-sidebar {
		width: 220px;
		flex-shrink: 0;
		background: oklch(var(--n));
		color: oklch(var(--nc));
		display: flex;
		flex-direction: column;
		padding: 0;
	}
	.dash-logo {
		padding: 20px 20px;
		font-size: 1.1rem;
		font-weight: 800;
		border-bottom: 1px solid oklch(var(--nc)/0.1);
		letter-spacing: 0.05em;
	}
	.dash-nav {
		padding: 12px 8px;
		display: flex;
		flex-direction: column;
		gap: 2px;
		flex: 1;
	}
	.dash-nav-item {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 9px 12px;
		border-radius: var(--radius-field);
		text-decoration: none;
		color: oklch(var(--nc)/0.7);
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.15s;
	}
	.dash-nav-item:hover {
		background: oklch(var(--nc)/0.1);
		color: oklch(var(--nc));
	}
	.dash-nav-item.active {
		background: oklch(var(--nc)/0.15);
		color: oklch(var(--nc));
		font-weight: 600;
	}
	.nav-icon {
		font-size: 1rem;
		width: 20px;
		text-align: center;
	}
	.dash-main {
		flex: 1;
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 24px;
	}
	.dash-topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
	}
	.dash-title {
		font-size: 1.5rem;
		font-weight: 700;
		margin: 0;
	}
	.dash-actions {
		display: flex;
		gap: 10px;
	}
	.btn-outline, .btn-primary {
		padding: 8px 16px;
		border-radius: var(--radius-field);
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		border: none;
	}
	.btn-outline {
		background: oklch(var(--b3));
		color: oklch(var(--bc));
	}
	.btn-primary {
		background: oklch(var(--p));
		color: oklch(var(--pc));
	}
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: 16px;
	}
	.stat-card {
		background: oklch(var(--b1));
		border: 1px solid oklch(var(--b3));
		border-radius: var(--radius-box);
		padding: 20px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.stat-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.stat-label {
		font-size: 0.75rem;
		font-weight: 600;
		opacity: 0.5;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.stat-icon {
		font-size: 1.25rem;
	}
	.stat-value {
		font-size: 1.75rem;
		font-weight: 800;
	}
	.stat-change {
		font-size: 0.75rem;
		font-weight: 600;
	}
	.stat-change.up { color: oklch(var(--su)); }
	.stat-change.down { color: oklch(var(--er)); }
	.table-card {
		background: oklch(var(--b1));
		border: 1px solid oklch(var(--b3));
		border-radius: var(--radius-box);
		overflow: hidden;
		flex: 1;
	}
	.table-header {
		padding: 16px 20px;
		border-bottom: 1px solid oklch(var(--b3));
	}
	.table-header h2 {
		margin: 0;
		font-size: 1rem;
		font-weight: 700;
	}
	.table-wrap {
		overflow-x: auto;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.875rem;
	}
	th {
		text-align: left;
		padding: 10px 20px;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.5;
		border-bottom: 1px solid oklch(var(--b3));
	}
	td {
		padding: 12px 20px;
		border-bottom: 1px solid oklch(var(--b2));
	}
	tr:last-child td {
		border-bottom: none;
	}
	tr:hover td {
		background: oklch(var(--b2));
	}
</style>

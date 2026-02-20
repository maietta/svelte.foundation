<script lang="ts">
	import Dashboard from '$lib/layouts/Dashboard.svelte';

	const navItems = [
		{ id: 'overview', label: 'Overview', icon: '📊', href: '/dashboard' },
		{ id: 'users', label: 'Users', icon: '👥', href: '/dashboard' },
		{ id: 'orders', label: 'Orders', icon: '🛒', href: '/dashboard' },
		{ id: 'products', label: 'Products', icon: '📦', href: '/dashboard' },
		{ id: 'analytics', label: 'Analytics', icon: '📈', href: '/dashboard' },
		{ id: 'settings', label: 'Settings', icon: '⚙️', href: '/dashboard' }
	];

	const stats = [
		{ label: 'Monthly Revenue', value: '$48,295', change: '+12.4%', positive: true },
		{ label: 'Active Users', value: '3,842', change: '+7.1%', positive: true },
		{ label: 'Orders This Month', value: '1,104', change: '-2.3%', positive: false },
		{ label: 'Conversion Rate', value: '3.6%', change: '+0.4%', positive: true }
	];

	const tableHeaders = ['Order ID', 'Customer', 'Date', 'Amount', 'Status'];

	const tableRows = [
		['#10482', 'Alex Morgan', '12 Jul 2025', '$249.00', 'Delivered'],
		['#10481', 'Jordan Lee', '12 Jul 2025', '$89.99', 'Processing'],
		['#10480', 'Sam Rivera', '11 Jul 2025', '$499.00', 'Delivered'],
		['#10479', 'Casey Park', '11 Jul 2025', '$34.50', 'Cancelled'],
		['#10478', 'Taylor Brooks', '10 Jul 2025', '$179.00', 'Delivered'],
		['#10477', 'Drew Kim', '10 Jul 2025', '$64.00', 'Processing'],
		['#10476', 'Jamie Nguyen', '9 Jul 2025', '$312.00', 'Delivered'],
		['#10475', 'Morgan Chen', '9 Jul 2025', '$145.00', 'Delivered']
	];
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Admin dashboard layout example." />
</svelte:head>

<Dashboard
	title="Admin Dashboard"
	orgName="Acme Corp"
	{navItems}
	{stats}
	{tableHeaders}
	{tableRows}
	tableTitle="Recent Orders"
/>

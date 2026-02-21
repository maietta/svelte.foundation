<script lang="ts">
	import Dashboard from '$lib/layouts/Dashboard.svelte';
	import PageHead from '$lib/components/PageHead.svelte';

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

	const tableRows: Record<string, string>[] = [
		{ orderId: '#10482', customer: 'Alex Morgan', date: '12 Jul 2025', amount: '$249.00', status: 'Delivered' },
		{ orderId: '#10481', customer: 'Jordan Lee', date: '12 Jul 2025', amount: '$89.99', status: 'Processing' },
		{ orderId: '#10480', customer: 'Sam Rivera', date: '11 Jul 2025', amount: '$499.00', status: 'Delivered' },
		{ orderId: '#10479', customer: 'Casey Park', date: '11 Jul 2025', amount: '$34.50', status: 'Cancelled' },
		{ orderId: '#10478', customer: 'Taylor Brooks', date: '10 Jul 2025', amount: '$179.00', status: 'Delivered' },
		{ orderId: '#10477', customer: 'Drew Kim', date: '10 Jul 2025', amount: '$64.00', status: 'Processing' },
		{ orderId: '#10476', customer: 'Jamie Nguyen', date: '9 Jul 2025', amount: '$312.00', status: 'Delivered' },
		{ orderId: '#10475', customer: 'Morgan Chen', date: '9 Jul 2025', amount: '$145.00', status: 'Delivered' }
	];
</script>

<PageHead
	title="Dashboard"
	description="Admin dashboard."
	noindex={true}
/>

<Dashboard
	{navItems}
	{stats}
	{tableHeaders}
	{tableRows}
/>

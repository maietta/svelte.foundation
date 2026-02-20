<script lang="ts">
	import TwoColumn from '$lib/layouts/TwoColumn.svelte';
	import { businessInfo } from '$lib/stores/business';

	const sidebarItems = [
		{ label: 'Our Story', href: '/about' },
		{ label: 'Team', href: '/about/team' },
		{ label: 'Careers', href: '/about/careers' },
		{ label: 'Press', href: '/about/press' }
	];
</script>

<svelte:head>
	<title>About Us</title>
	<meta name="description" content="Learn more about {$businessInfo.name}" />
</svelte:head>

<TwoColumn {sidebarItems}>
	<h1>About {$businessInfo.name}</h1>

	<p class="lead">
		We are a professional services company dedicated to helping businesses grow through innovative
		digital solutions.
	</p>

	<h2>Our Mission</h2>
	<p>
		To deliver exceptional value to our clients through high-quality, reliable, and cost-effective
		services that drive real business results.
	</p>

	<h2>Our Values</h2>
	<ul>
		<li><strong>Quality:</strong> We take pride in delivering excellence in everything we do</li>
		<li><strong>Integrity:</strong> We build trust through honest, transparent relationships</li>
		<li><strong>Innovation:</strong> We embrace new technologies and creative solutions</li>
		<li>
			<strong>Collaboration:</strong> We work as partners with our clients to achieve shared goals
		</li>
	</ul>

	<h2>Why Choose Us</h2>
	<p>
		With years of experience and a team of dedicated professionals, we have the expertise to handle
		projects of any size and complexity. Our commitment to customer satisfaction sets us apart from
		the competition.
	</p>

	<p>
		We believe in building long-term relationships with our clients, founded on trust, mutual
		respect, and exceptional results.
	</p>
</TwoColumn>

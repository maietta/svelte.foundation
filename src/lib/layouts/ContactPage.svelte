<script lang="ts">
	import ContactForm from '$lib/components/ContactForm.svelte';
	import { businessInfo } from '$lib/stores/business';

	interface Props {
		showInfo?: boolean;
		showMap?: boolean;
	}

	let { showInfo = true, showMap = false }: Props = $props();

	const primaryAddress = $derived($businessInfo.addresses?.[0]);
</script>

<div class="contact-page">
	<div class="contact-info">
		<h1>Contact Us</h1>
		<p>Get in touch with {$businessInfo.name}</p>

		{#if showInfo}
			<div class="info-card">
				{#if primaryAddress}
					<div class="info-item">
						<h3>Address</h3>
						<p>
							{primaryAddress.name}<br />
							{primaryAddress.street}<br />
							{primaryAddress.city}, {primaryAddress.state}
							{primaryAddress.zip}
						</p>
					</div>
				{/if}

				<div class="info-item">
					<h3>Phone</h3>
					<p><a href="tel:{$businessInfo.phone}">{$businessInfo.phone}</a></p>
				</div>

				<div class="info-item">
					<h3>Email</h3>
					<p><a href="mailto:{$businessInfo.email}">{$businessInfo.email}</a></p>
				</div>

				<div class="info-item">
					<h3>Business Hours</h3>
					<ul class="hours-list">
						{#each Object.entries($businessInfo.hours) as [day, hours]}
							<li>
								<span class="day">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
								<span class="hours"
									>{hours.closed ? 'Closed' : `${hours.open} - ${hours.close}`}</span
								>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/if}
	</div>

	<div class="contact-form-section">
		<ContactForm />
	</div>
</div>

<style>
	.contact-page {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 64px;
		padding: 64px 24px;
		max-width: 1200px;
		margin: 0 auto;
	}
	.contact-info h1 {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 8px;
	}
	.contact-info > p {
		font-size: 1.25rem;
		color: #666;
		margin-bottom: 32px;
	}
	.info-card {
		border: 2px dashed #999;
		border-radius: 12px;
		padding: 32px;
		background: #fafafa;
	}
	.info-item {
		margin-bottom: 24px;
	}
	.info-item:last-child {
		margin-bottom: 0;
	}
	.info-item h3 {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 8px;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: #666;
	}
	.info-item p {
		line-height: 1.6;
	}
	.info-item a {
		color: inherit;
	}
	.hours-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.hours-list li {
		display: flex;
		justify-content: space-between;
		padding: 6px 0;
		border-bottom: 1px solid #eee;
	}
	.hours-list li:last-child {
		border-bottom: none;
	}
	.hours-list .day {
		font-weight: 500;
	}
	.hours-list .hours {
		color: #666;
	}
	@media (max-width: 900px) {
		.contact-page {
			grid-template-columns: 1fr;
			gap: 48px;
			padding: 48px 24px;
		}
	}
</style>

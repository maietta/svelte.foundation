<script lang="ts">
	import ContactForm from '$lib/components/ContactForm.svelte';
	import { businessInfo } from '$lib/stores/business';

	interface Props {
		showInfo?: boolean;
		showMap?: boolean;
	}

	let { showInfo = true, showMap = false }: Props = $props();
</script>

<div class="mx-auto w-full max-w-7xl px-6 py-16">
	<div class="grid grid-cols-1 gap-16 lg:grid-cols-2">

		<!-- Left: heading + business info -->
		<div>
			<h1 class="text-4xl font-bold">Contact Us</h1>
			<p class="mt-2 text-lg opacity-60">Get in touch with us.</p>

			{#if showInfo}
				<div class="mt-8 flex flex-col gap-6">

					{#if $businessInfo.addresses?.length}
						<div>
							<h3 class="mb-2 text-xs font-semibold uppercase tracking-widest opacity-60">Locations</h3>
							<div class="flex flex-wrap gap-6">
								{#each $businessInfo.addresses as addr}
									<div class="flex flex-col gap-1">
										<span class="font-semibold">{addr.name}</span>
										<p class="text-sm leading-relaxed opacity-80">
											{addr.street}<br />{addr.city}, {addr.state} {addr.zip}
										</p>
										{#if addr.walkIns}
											<span class="badge badge-success badge-sm mt-1">Walk-ins welcome</span>
										{:else if addr.byAppointment}
											<span class="badge badge-warning badge-sm mt-1">By appointment</span>
										{/if}
									</div>
								{/each}
							</div>
						</div>
					{/if}

					<div>
						<h3 class="mb-1 text-xs font-semibold uppercase tracking-widest opacity-60">Phone</h3>
						<a href="tel:{$businessInfo.phone}" class="link link-hover text-base font-medium">
							{$businessInfo.phone}
						</a>
						{#if $businessInfo.fax}
							<p class="mt-1 text-sm opacity-70">Fax: {$businessInfo.fax}</p>
						{/if}
					</div>

					<div>
						<h3 class="mb-1 text-xs font-semibold uppercase tracking-widest opacity-60">Email</h3>
						<a href="mailto:{$businessInfo.email}" class="link link-hover text-base font-medium">
							{$businessInfo.email}
						</a>
					</div>

					<div>
						<h3 class="mb-2 text-xs font-semibold uppercase tracking-widest opacity-60">Business Hours</h3>
						<ul class="divide-y divide-base-300">
							{#each Object.entries($businessInfo.hours) as [day, hours]}
								<li class="flex items-center justify-between py-2 text-sm">
									<span class="font-medium capitalize">{day}</span>
									<span class="opacity-70">{hours.closed ? 'Closed' : `${hours.open} – ${hours.close}`}</span>
								</li>
							{/each}
						</ul>
					</div>

				</div>
			{/if}
		</div>

		<!-- Right: contact form -->
		<div class="flex items-start">
			<div class="w-full">
				<ContactForm />
			</div>
		</div>

	</div>
</div>

<script lang="ts">
	import { businessInfo } from '$lib/stores/business';
</script>

<svelte:head>
	<title>DMCA Policy</title>
	<meta name="description" content="Our DMCA takedown policy and how to submit a copyright infringement notice." />
</svelte:head>

<div class="mx-auto max-w-3xl px-6 py-16">
	<h1 class="text-3xl font-bold text-base-content mb-2">DMCA Policy</h1>
	<p class="text-sm opacity-50 mb-10">Last updated: January 2025</p>

	<div class="prose prose-base max-w-none space-y-8 text-base-content">

		<section>
			<h2 class="text-xl font-semibold mb-3">Overview</h2>
			<p class="opacity-80 leading-relaxed">
				{$businessInfo.name} respects the intellectual property rights of others and expects its users to do the same.
				In accordance with the Digital Millennium Copyright Act of 1998 ("DMCA"), we will respond expeditiously to
				claims of copyright infringement that are reported to our designated copyright agent.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Filing a DMCA Notice</h2>
			<p class="opacity-80 leading-relaxed mb-4">
				If you believe that content hosted on our site infringes upon your copyright, please send a written notice
				to our designated agent containing all of the following:
			</p>
			<ol class="list-decimal list-inside space-y-2 opacity-80 leading-relaxed pl-2">
				<li>A physical or electronic signature of the copyright owner or a person authorised to act on their behalf.</li>
				<li>Identification of the copyrighted work claimed to have been infringed.</li>
				<li>Identification of the material that is claimed to be infringing, with enough detail for us to locate it on the site (e.g., URL).</li>
				<li>Your contact information — name, address, telephone number, and email address.</li>
				<li>A statement that you have a good faith belief that the use is not authorised by the copyright owner, its agent, or the law.</li>
				<li>A statement that the information in the notice is accurate, and under penalty of perjury, that you are the copyright owner or are authorised to act on behalf of the owner.</li>
			</ol>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Where to Send Notices</h2>
			<p class="opacity-80 leading-relaxed mb-3">Send DMCA notices to our designated copyright agent:</p>
			<div class="rounded-box border border-base-300 bg-base-200 px-6 py-4 text-sm space-y-1">
				<p class="font-semibold">{$businessInfo.name} — Copyright Agent</p>
				{#each $businessInfo.addresses.filter(a => a.isMailing) as addr}
					<p class="opacity-70">{addr.street}, {addr.city}, {addr.state} {addr.zip}</p>
				{/each}
				<p><a href="mailto:legal@premoweb.com" class="link link-primary">legal@premoweb.com</a></p>
			</div>
			<p class="opacity-80 leading-relaxed">
				If you believe your content was removed by mistake or misidentification, you may submit a counter-notification
				to our copyright agent. Counter-notifications must include your contact details, identification of the removed
				content and its prior location, a statement under penalty of perjury that you believe the removal was in error,
				and your consent to the jurisdiction of your local federal court.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Repeat Infringers</h2>
			<p class="opacity-80 leading-relaxed">
				It is our policy to terminate the accounts of users who are determined to be repeat infringers in appropriate
				circumstances.
			</p>
		</section>

	</div>

	<div class="mt-12 border-t border-base-300 pt-8 text-sm opacity-50">
		For legal enquiries, contact us at
		<a href="mailto:legal@premoweb.com" class="link">legal@premoweb.com</a>.
	</div>
</div>

<script lang="ts">
	import { businessInfo } from '$lib/stores/business';
	import PageHead from '$lib/components/PageHead.svelte';
</script>

<PageHead
	title="CCPA Privacy Notice"
	description="California Consumer Privacy Act (CCPA) notice detailing your rights and how we handle your personal information."
/>

<div class="mx-auto max-w-3xl px-6 py-16">
	<h1 class="text-3xl font-bold text-base-content mb-2">California Consumer Privacy Act (CCPA) Notice</h1>
	<p class="text-sm opacity-50 mb-10">Last updated: February 2026</p>

	<div class="prose prose-base max-w-none space-y-8 text-base-content">

		<section>
			<h2 class="text-xl font-semibold mb-3">Overview</h2>
			<p class="opacity-80 leading-relaxed">
				This notice applies to California residents and supplements our Privacy Policy. Under the California Consumer
				Privacy Act of 2018 ("CCPA"), as amended by the California Privacy Rights Act of 2020 ("CPRA"), California
				residents have specific rights regarding their personal information. {$businessInfo.name} is committed to
				upholding these rights.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Categories of Personal Information We Collect</h2>
			<p class="opacity-80 leading-relaxed mb-4">
				In the past 12 months we have collected the following categories of personal information:
			</p>
			<ul class="list-disc list-inside space-y-2 opacity-80 leading-relaxed pl-2">
				<li><strong>Identifiers</strong> — name, email address, IP address, and similar online identifiers.</li>
				<li><strong>Commercial information</strong> — records of products or services purchased or considered.</li>
				<li><strong>Internet or network activity</strong> — browsing history on our site, search queries, and interaction data.</li>
				<li><strong>Geolocation data</strong> — approximate location derived from your IP address.</li>
				<li><strong>Professional or employment-related information</strong> — when provided voluntarily (e.g., via contact forms).</li>
				<li><strong>Inferences</strong> — profiles derived from the above to understand your preferences.</li>
			</ul>
			<p class="opacity-80 leading-relaxed mt-4">
				We do not collect sensitive personal information (as defined by CPRA) beyond what is necessary to provide our services.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Purposes for Collection and Use</h2>
			<p class="opacity-80 leading-relaxed mb-4">We collect personal information for the following business purposes:</p>
			<ul class="list-disc list-inside space-y-2 opacity-80 leading-relaxed pl-2">
				<li>Providing, maintaining, and improving our services.</li>
				<li>Processing transactions and sending related communications.</li>
				<li>Responding to enquiries and customer support requests.</li>
				<li>Sending marketing communications where you have opted in.</li>
				<li>Security, fraud prevention, and legal compliance.</li>
				<li>Analytics and product development.</li>
			</ul>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Disclosure of Personal Information</h2>
			<p class="opacity-80 leading-relaxed">
				We may share personal information with service providers who process data on our behalf (e.g., hosting, analytics,
				payment processing), business partners with your consent, and government authorities when required by law. We do
				<strong>not sell</strong> your personal information to third parties, and we do not share it for cross-context
				behavioural advertising purposes without offering an opt-out as required by the CPRA.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Your California Privacy Rights</h2>
			<p class="opacity-80 leading-relaxed mb-4">
				As a California resident, you have the following rights under the CCPA/CPRA:
			</p>
			<ul class="list-disc list-inside space-y-2 opacity-80 leading-relaxed pl-2">
				<li><strong>Right to Know</strong> — request disclosure of the categories and specific pieces of personal information we have collected about you.</li>
				<li><strong>Right to Delete</strong> — request deletion of your personal information, subject to certain exceptions.</li>
				<li><strong>Right to Correct</strong> — request correction of inaccurate personal information.</li>
				<li><strong>Right to Opt-Out</strong> — opt out of the sale or sharing of your personal information.</li>
				<li><strong>Right to Limit Use of Sensitive Personal Information</strong> — limit our use of sensitive personal information to what is necessary to provide the services.</li>
				<li><strong>Right to Non-Discrimination</strong> — we will not discriminate against you for exercising any of these rights.</li>
			</ul>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">How to Submit a Request</h2>
			<p class="opacity-80 leading-relaxed mb-3">
				To exercise any of the rights above, please contact us using one of the methods below. We will verify your
				identity before processing your request. You may also designate an authorised agent to submit a request on
				your behalf.
			</p>
			<div class="rounded-box border border-base-300 bg-base-200 px-6 py-4 text-sm space-y-1">
				<p class="font-semibold">{$businessInfo.name} — Privacy Requests</p>
					{#each $businessInfo.addresses.filter(a => a.isMailing) as addr}
						<p class="opacity-70">{addr.street}, {addr.city}, {addr.state} {addr.zip}</p>
					{/each}
					<p><a href="mailto:legal@premoweb.com" class="link link-primary">legal@premoweb.com</a></p>
			</div>
			<p class="opacity-80 leading-relaxed mt-4">
				We will respond to verifiable consumer requests within <strong>45 days</strong> as required by law. If we
				require an extension (up to an additional 45 days), we will notify you of the reason and extension period.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Data Retention</h2>
			<p class="opacity-80 leading-relaxed">
				We retain personal information for as long as necessary to fulfil the purposes for which it was collected,
				comply with legal obligations, resolve disputes, and enforce our agreements. When information is no longer
				needed, we securely delete or anonymise it.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Changes to This Notice</h2>
			<p class="opacity-80 leading-relaxed">
				We may update this CCPA notice from time to time. We will post any changes on this page with an updated
				effective date. We encourage you to review this notice periodically.
			</p>
		</section>

	</div>

	<div class="mt-12 border-t border-base-300 pt-8 text-sm opacity-50">
		For legal enquiries, contact us at
		<a href="mailto:legal@premoweb.com" class="link">legal@premoweb.com</a>.
	</div>
</div>

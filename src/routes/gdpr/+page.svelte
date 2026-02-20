<script lang="ts">
	import { businessInfo } from '$lib/stores/business';
</script>

<svelte:head>
	<title>GDPR Privacy Notice</title>
	<meta name="description" content="General Data Protection Regulation (GDPR) notice describing how we collect, use, and protect your personal data." />
</svelte:head>

<div class="mx-auto max-w-3xl px-6 py-16">
	<h1 class="text-3xl font-bold text-base-content mb-2">GDPR Privacy Notice</h1>
	<p class="text-sm opacity-50 mb-10">Last updated: February 2026</p>

	<div class="prose prose-base max-w-none space-y-8 text-base-content">

		<section>
			<h2 class="text-xl font-semibold mb-3">Who We Are</h2>
			<p class="opacity-80 leading-relaxed">
				{$businessInfo.name} is the data controller responsible for your personal data. This notice explains how we
				collect, use, share, and protect information about you in accordance with Regulation (EU) 2016/679
				(the "General Data Protection Regulation" or "GDPR") and applicable UK GDPR provisions.
			</p>
			<div class="rounded-box border border-base-300 bg-base-200 px-6 py-4 text-sm space-y-1 mt-4">
				<p class="font-semibold">{$businessInfo.name}</p>
				{#each $businessInfo.addresses.filter(a => a.isMailing) as addr}
					<p class="opacity-70">{addr.street}, {addr.city}, {addr.state} {addr.zip}</p>
				{/each}
				<p><a href="mailto:legal@premoweb.com" class="link link-primary">legal@premoweb.com</a></p>
			</div>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Personal Data We Collect</h2>
			<p class="opacity-80 leading-relaxed mb-4">We collect personal data that you provide directly or that is generated automatically when you use our services:</p>
			<ul class="list-disc list-inside space-y-2 opacity-80 leading-relaxed pl-2">
				<li><strong>Contact data</strong> — name, email address, phone number, and postal address when you contact us or submit forms.</li>
				<li><strong>Account data</strong> — username, password (hashed), and preferences if you create an account.</li>
				<li><strong>Usage data</strong> — IP address, browser type, pages visited, time on site, and referring URLs, collected automatically via server logs and analytics.</li>
				<li><strong>Communication data</strong> — the content of emails or messages you send us.</li>
				<li><strong>Payment data</strong> — billing details processed by our payment provider; we do not store full card numbers.</li>
			</ul>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Lawful Basis for Processing</h2>
			<p class="opacity-80 leading-relaxed mb-4">We process your personal data on the following legal bases under Article 6 GDPR:</p>
			<ul class="list-disc list-inside space-y-2 opacity-80 leading-relaxed pl-2">
				<li><strong>Contract</strong> — processing necessary to perform a contract with you or take steps at your request before entering one.</li>
				<li><strong>Legitimate interests</strong> — analytics, fraud prevention, and improving our services, where these interests are not overridden by your rights.</li>
				<li><strong>Legal obligation</strong> — where we must comply with a legal requirement.</li>
				<li><strong>Consent</strong> — for marketing communications and optional cookies, where we rely on your freely given, specific, informed, and unambiguous consent.</li>
			</ul>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">How We Use Your Data</h2>
			<ul class="list-disc list-inside space-y-2 opacity-80 leading-relaxed pl-2">
				<li>Delivering and managing our services.</li>
				<li>Responding to enquiries and providing customer support.</li>
				<li>Sending transactional communications (receipts, confirmations, service updates).</li>
				<li>Sending marketing communications where you have provided consent or we have a legitimate interest.</li>
				<li>Security monitoring and fraud detection.</li>
				<li>Compliance with legal and regulatory obligations.</li>
				<li>Analytics and product improvement.</li>
			</ul>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Data Sharing and Transfers</h2>
			<p class="opacity-80 leading-relaxed">
				We do not sell your personal data. We share it only with trusted processors acting on our instructions
				(e.g., hosting providers, analytics platforms, payment processors) under data processing agreements that
				satisfy GDPR requirements. Where data is transferred outside the UK or European Economic Area, we ensure
				appropriate safeguards are in place — such as Standard Contractual Clauses approved by the European Commission.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Cookies</h2>
			<p class="opacity-80 leading-relaxed">
				We use essential cookies required for the site to function and, where you have consented, optional analytics
				cookies to understand how visitors use our site. You can manage cookie preferences at any time through your
				browser settings. Withdrawing consent does not affect the lawfulness of processing based on prior consent.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Data Retention</h2>
			<p class="opacity-80 leading-relaxed">
				We retain personal data only for as long as necessary to fulfil the purposes described in this notice, or
				as required by law. Contact and enquiry records are typically retained for up to 3 years. Financial records
				are retained for 7 years in line with statutory requirements. Analytics data is anonymised after 14 months.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Your Rights Under the GDPR</h2>
			<p class="opacity-80 leading-relaxed mb-4">You have the following rights, which you may exercise free of charge:</p>
			<ul class="list-disc list-inside space-y-2 opacity-80 leading-relaxed pl-2">
				<li><strong>Access</strong> — obtain a copy of the personal data we hold about you.</li>
				<li><strong>Rectification</strong> — have inaccurate or incomplete data corrected.</li>
				<li><strong>Erasure</strong> — request deletion of your data ("right to be forgotten") where there is no compelling reason for continued processing.</li>
				<li><strong>Restriction</strong> — request that we limit how we use your data while a dispute is resolved.</li>
				<li><strong>Data portability</strong> — receive your data in a structured, machine-readable format to transfer to another controller.</li>
				<li><strong>Objection</strong> — object to processing based on legitimate interests or for direct marketing purposes.</li>
				<li><strong>Withdraw consent</strong> — where processing is based on consent, you may withdraw it at any time without affecting prior lawful processing.</li>
			</ul>
			<p class="opacity-80 leading-relaxed mt-4">
				To exercise any right, contact us at
				<a href="mailto:legal@premoweb.com" class="link link-primary">legal@premoweb.com</a>.
				We will respond within <strong>30 days</strong>. You also have the right to lodge a complaint with your
				national supervisory authority (e.g., the ICO in the UK, or your local EU data protection authority).
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Changes to This Notice</h2>
			<p class="opacity-80 leading-relaxed">
				We may update this notice to reflect changes in our practices or legal requirements. The "Last updated"
				date at the top of this page will be revised accordingly. Material changes will be communicated via email
				or a prominent notice on our site.
			</p>
		</section>

	</div>

	<div class="mt-12 border-t border-base-300 pt-8 text-sm opacity-50">
		For legal enquiries, contact us at
		<a href="mailto:legal@premoweb.com" class="link">legal@premoweb.com</a>.
	</div>
</div>

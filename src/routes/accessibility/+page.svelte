<script lang="ts">
	import { businessInfo } from '$lib/stores/business';
</script>

<svelte:head>
	<title>Accessibility Statement</title>
	<meta name="description" content="Our commitment to web accessibility under the Americans with Disabilities Act (ADA) and how our technology choices support inclusive design." />
</svelte:head>

<div class="mx-auto max-w-3xl px-6 py-16">
	<h1 class="text-3xl font-bold text-base-content mb-2">Accessibility Statement</h1>
	<p class="text-sm opacity-50 mb-10">Last updated: February 2026</p>

	<div class="prose prose-base max-w-none space-y-8 text-base-content">

		<section>
			<h2 class="text-xl font-semibold mb-3">Our Commitment</h2>
			<p class="opacity-80 leading-relaxed">
				{$businessInfo.name} is committed to ensuring our website is accessible to all people, including those with
				disabilities, in compliance with the Americans with Disabilities Act of 1990 ("ADA"), Section 508 of the
				Rehabilitation Act, and the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. We view accessibility
				not as a checkbox exercise, but as a core part of building a product that works for everyone.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">This Website Is Our Primary Communication Channel</h2>
			<p class="opacity-80 leading-relaxed">
				Our website is the primary means by which {$businessInfo.name} communicates with our clients, prospective
				customers, and the public. It is where we publish information about our services, accept enquiries, process
				requests, and deliver support. Because of this central role, we take our obligation to make it fully accessible
				with the utmost seriousness — an inaccessible website for us is not merely an inconvenience, it is a barrier
				to equal participation in everything we offer.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">How Svelte Helps Us Deliver Accessible Experiences</h2>
			<p class="opacity-80 leading-relaxed mb-4">
				This website is built with <a href="https://svelte.dev" class="link link-primary" target="_blank" rel="noopener noreferrer">Svelte</a>
				and <a href="https://kit.svelte.dev" class="link link-primary" target="_blank" rel="noopener noreferrer">SvelteKit</a>.
				We chose this technology stack in part because of the accessibility advantages it provides:
			</p>
			<ul class="list-disc list-inside space-y-3 opacity-80 leading-relaxed pl-2">
				<li>
					<strong>Compile-time accessibility warnings.</strong> Svelte's compiler analyses our markup at build time
					and raises warnings for common accessibility violations — such as missing <code class="font-mono text-xs bg-base-300 px-1 rounded">alt</code> text,
					form labels without associated controls, and interactive elements lacking keyboard handlers. This means
					accessibility issues are caught before they ever reach users.
				</li>
				<li>
					<strong>Semantic HTML output.</strong> Svelte compiles to plain, standards-compliant HTML with no
					proprietary runtime abstractions that could interfere with screen readers or assistive technologies.
					The output is clean, predictable markup that browsers and AT vendors optimise for.
				</li>
				<li>
					<strong>Server-side rendering.</strong> SvelteKit renders pages on the server, delivering fully-formed
					HTML to the browser before any JavaScript executes. This ensures that users who rely on screen readers,
					have JavaScript disabled, or use older assistive technology clients receive complete, structured content
					immediately — not a blank page waiting for a client-side bundle.
				</li>
				<li>
					<strong>Focus management on navigation.</strong> SvelteKit's client-side router includes built-in focus
					management that moves keyboard focus to the new page content after navigation, ensuring keyboard-only
					and screen reader users are not disoriented when moving between pages.
				</li>
				<li>
					<strong>Minimal JavaScript footprint.</strong> Because Svelte ships no virtual-DOM runtime, pages load
					faster and consume less CPU — directly benefiting users on assistive devices and lower-powered hardware.
				</li>
				<li>
					<strong>DaisyUI component library.</strong> Our UI components are built on DaisyUI, which follows ARIA
					design patterns for interactive widgets and uses semantic HTML elements as its foundation.
				</li>
			</ul>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Conformance Status</h2>
			<p class="opacity-80 leading-relaxed">
				We aim for full conformance with WCAG 2.1 Level AA. We conduct periodic audits of our pages and address
				identified issues as part of our standard development workflow. Where full conformance is not yet achieved,
				we work actively toward it and provide alternative means of access in the interim.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Specific Accessibility Features</h2>
			<ul class="list-disc list-inside space-y-2 opacity-80 leading-relaxed pl-2">
				<li>All images include descriptive <code class="font-mono text-xs bg-base-300 px-1 rounded">alt</code> text or are marked as decorative.</li>
				<li>Colour contrast ratios meet or exceed the WCAG 2.1 AA minimum of 4.5:1 for normal text and 3:1 for large text.</li>
				<li>All interactive elements are reachable and operable via keyboard alone.</li>
				<li>Form fields have visible, descriptive labels and inline error messages.</li>
				<li>Page structure uses proper heading hierarchy (<code class="font-mono text-xs bg-base-300 px-1 rounded">h1</code>–<code class="font-mono text-xs bg-base-300 px-1 rounded">h6</code>) and landmark regions (<code class="font-mono text-xs bg-base-300 px-1 rounded">nav</code>, <code class="font-mono text-xs bg-base-300 px-1 rounded">main</code>, <code class="font-mono text-xs bg-base-300 px-1 rounded">footer</code>).</li>
				<li>Session timeouts (if any) warn users in advance and allow extension.</li>
				<li>The site respects <code class="font-mono text-xs bg-base-300 px-1 rounded">prefers-reduced-motion</code> system preferences to limit animation.</li>
			</ul>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Known Limitations</h2>
			<p class="opacity-80 leading-relaxed">
				We are continuously improving our site. If you encounter any content or functionality that is not accessible,
				please contact us — we will work to provide the information in an alternative format or resolve the issue promptly.
			</p>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Feedback and Contact</h2>
			<p class="opacity-80 leading-relaxed mb-3">
				If you experience any barrier to accessing our website or have suggestions for improving its accessibility,
				we want to hear from you. We aim to respond to accessibility feedback within <strong>2 business days</strong>.
			</p>
			<div class="rounded-box border border-base-300 bg-base-200 px-6 py-4 text-sm space-y-1">
				<p class="font-semibold">{$businessInfo.name} — Accessibility Coordinator</p>
				{#each $businessInfo.addresses.filter(a => a.isMailing) as addr}
					<p class="opacity-70">{addr.street}, {addr.city}, {addr.state} {addr.zip}</p>
				{/each}
				<p>Phone: <a href="tel:{$businessInfo.phone}" class="link link-primary">{$businessInfo.phone}</a></p>
				<p>Email: <a href="mailto:legal@premoweb.com" class="link link-primary">legal@premoweb.com</a></p>
			</div>
		</section>

		<section>
			<h2 class="text-xl font-semibold mb-3">Formal Complaints</h2>
			<p class="opacity-80 leading-relaxed">
				If you are not satisfied with our response to an accessibility complaint, you may contact the
				<a href="https://www.ada.gov" class="link link-primary" target="_blank" rel="noopener noreferrer">U.S. Department of Justice ADA Information Line</a>
				at 1-800-514-0301 (voice) or 1-800-514-0383 (TTY), or file a complaint with the relevant federal or state agency.
			</p>
		</section>

	</div>

	<div class="mt-12 border-t border-base-300 pt-8 text-sm opacity-50">
		For legal enquiries, contact us at
		<a href="mailto:legal@premoweb.com" class="link">legal@premoweb.com</a>.
	</div>
</div>

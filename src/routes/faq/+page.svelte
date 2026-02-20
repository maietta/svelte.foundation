<script lang="ts">
	import Faq from '$lib/layouts/Faq.svelte';

	const categories = [
		{
			category: 'Getting Started',
			items: [
				{
					id: 'gs-1',
					question: 'How do I create an account?',
					answer:
						'Click the "Sign Up" button in the top right corner, enter your email address and a strong password, then confirm your email. You will be up and running in under two minutes.'
				},
				{
					id: 'gs-2',
					question: 'Is there a free tier?',
					answer:
						'Yes! Our Starter plan is completely free and includes up to 3 projects and 1 GB of storage. No credit card required to get going.'
				},
				{
					id: 'gs-3',
					question: 'Can I import data from another tool?',
					answer:
						'We support CSV, JSON, and direct integrations with popular platforms. Head to Settings → Import to get started, or contact support if you need a custom migration.'
				}
			]
		},
		{
			category: 'Billing & Plans',
			items: [
				{
					id: 'bill-1',
					question: 'How does billing work?',
					answer:
						'We bill monthly or annually. Annual plans receive a 20% discount. Your card is charged on the same day each period and you will receive an invoice by email.'
				},
				{
					id: 'bill-2',
					question: 'Can I change my plan at any time?',
					answer:
						'Yes. You can upgrade instantly and your billing will be prorated. Downgrades take effect at the end of the current billing period.'
				},
				{
					id: 'bill-3',
					question: 'What payment methods do you accept?',
					answer:
						'We accept Visa, Mastercard, American Express, and PayPal. Bank transfer is available on Enterprise plans.'
				}
			]
		},
		{
			category: 'Privacy & Security',
			items: [
				{
					id: 'priv-1',
					question: 'Where is my data stored?',
					answer:
						'All data is stored on servers within the EU (Frankfurt, Germany) and replicated to a secondary region for redundancy. We are fully GDPR compliant.'
				},
				{
					id: 'priv-2',
					question: 'Can I delete my account and data?',
					answer:
						'Absolutely. Go to Settings → Danger Zone → Delete Account. All your data is permanently removed within 30 days in line with our data retention policy.'
				},
				{
					id: 'priv-3',
					question: 'Do you encrypt data at rest?',
					answer:
						'Yes. All data at rest is encrypted with AES-256. Data in transit uses TLS 1.3.'
				}
			]
		}
	];
</script>

<svelte:head>
	<title>FAQ</title>
	<meta name="description" content="Frequently asked questions about our platform." />
</svelte:head>

<Faq
	title="Frequently Asked Questions"
	subtitle="Can't find an answer? Reach out to our support team."
	{categories}
/>

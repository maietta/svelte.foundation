import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import sgMail from '@sendgrid/mail';
import { env } from '$env/dynamic/private';
import { get } from 'svelte/store';
import { businessInfo } from '$lib/stores/business';
import { createChallenge, verifySolution } from 'altcha-lib';

if (env.SENDGRID_API_KEY) {
	sgMail.setApiKey(env.SENDGRID_API_KEY);
}

const ALTCHA_HMAC_KEY = env.ALTCHA_HMAC_KEY || 'dev-only-change-in-production';

export const load: PageServerLoad = async () => {
	const challenge = await createChallenge({
		algorithm: 'SHA-256',
		hmacKey: ALTCHA_HMAC_KEY
	});

	return { altchaChallenge: challenge };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name')?.toString() || '';
		const email = formData.get('email')?.toString() || '';
		const phone = formData.get('phone')?.toString();
		const message = formData.get('message')?.toString() || '';
		const altchaResponse = formData.get('altcha-response')?.toString() || '';

		if (!name || !email || !message) {
			return fail(400, { error: 'Please fill in all required fields', name, email, message });
		}

		if (!altchaResponse) {
			return fail(400, {
				error: 'Please complete the security verification',
				name,
				email,
				message
			});
		}

		try {
			const payload = JSON.parse(altchaResponse);
			const verified = await verifySolution(payload, ALTCHA_HMAC_KEY);

			if (!verified) {
				return fail(400, {
					error: 'Security verification failed. Please try again.',
					name,
					email,
					message
				});
			}
		} catch (error) {
			console.error('ALTCHA verification error:', error);
			return fail(400, {
				error: 'Security verification failed. Please try again.',
				name,
				email,
				message
			});
		}

		if (!env.SENDGRID_API_KEY || !env.SENDGRID_FROM_EMAIL || !env.SENDGRID_TO_EMAIL) {
			console.warn('SendGrid not configured. Email not sent.');
			return { success: true };
		}

		const store = get(businessInfo);
		const businessName = store.name;
		const timestamp = new Date().toLocaleString();

		const msgToOwner = {
			to: env.SENDGRID_TO_EMAIL,
			from: {
				email: env.SENDGRID_FROM_EMAIL,
				name: name
			},
			replyTo: email,
			subject: `New Contact Form Submission from ${name}`,
			html: `
			<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
				<h2 style="color: #333;">New Contact Form Submission</h2>
				<table style="width: 100%; border-collapse: collapse;">
					<tr>
						<td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td>
						<td style="padding: 8px; border-bottom: 1px solid #eee;">${name}</td>
					</tr>
					<tr>
						<td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
						<td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td>
					</tr>
					<tr>
						<td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
						<td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || 'N/A'}</td>
					</tr>
					<tr>
						<td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Message:</td>
						<td style="padding: 8px; border-bottom: 1px solid #eee;">${message}</td>
					</tr>
					<tr>
						<td style="padding: 8px; font-weight: bold;">Submitted:</td>
						<td style="padding: 8px;">${timestamp}</td>
					</tr>
				</table>
			</div>
		`,
			text: `New contact form submission from ${name} (${email}). Phone: ${phone || 'N/A'}. Message: ${message}`
		};

		const msgAutoReply = {
			to: email,
			from: {
				email: env.SENDGRID_FROM_EMAIL,
				name: businessName
			},
			subject: 'Thank you for contacting us',
			html: `
			<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
				<h2 style="color: #333;">Thank You for Contacting Us!</h2>
				<p>Hello ${name},</p>
				<p>We have received your message and will get back to you as soon as possible.</p>
				<hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
				<p style="color: #666; font-size: 14px;">
					Best regards,<br/>
					${businessName}
				</p>
			</div>
		`,
			text: `Hello ${name}, thank you for contacting us. We have received your message and will get back to you as soon as possible.`
		};

		try {
			await sgMail.send(msgToOwner);
			await sgMail.send(msgAutoReply);
		} catch (error) {
			console.error('Email send error:', error);
			return fail(500, {
				error: 'An unexpected error occurred. Please try again later.',
				name,
				email,
				message
			});
		}

		return { success: true };
	}
};

<script lang="ts">
	interface Testimonial {
		name: string;
		role: string;
		company: string;
		quote: string;
		rating?: number;
		service?: string;
		avatar?: string;
	}

	interface Props {
		title?: string;
		subtitle?: string;
		testimonials?: Testimonial[];
		columns?: 2 | 3;
	}

	let {
		title = 'What Our Clients Say',
		subtitle = 'We measure success by the success of the businesses we work with.',
		testimonials = [],
		columns = 3
	}: Props = $props();
</script>

<section class="testimonials-section">
	<div class="section-header">
		<h1>{title}</h1>
		{#if subtitle}
			<p>{subtitle}</p>
		{/if}
	</div>

	<div class="testimonials-grid cols-{columns}">
		{#each testimonials as t}
			<article class="testimonial-card">
				{#if t.rating}
					<div class="stars" aria-label="{t.rating} out of 5 stars">
						{#each { length: 5 } as _, i}
							<span class="star {i < t.rating! ? 'filled' : ''}">★</span>
						{/each}
					</div>
				{/if}
				<blockquote class="quote">"{t.quote}"</blockquote>
				<footer class="testimonial-footer">
					<div class="avatar">
						{#if t.avatar}
							<img src={t.avatar} alt={t.name} />
						{:else}
							<span>{t.name.split(' ').map((n) => n[0]).join('')}</span>
						{/if}
					</div>
					<div class="author">
						<strong>{t.name}</strong>
						<span>{t.role}, {t.company}</span>
						{#if t.service}
							<span class="service-tag">{t.service}</span>
						{/if}
					</div>
				</footer>
			</article>
		{/each}
	</div>
</section>

<style>
	.testimonials-section {
		padding: 64px 24px;
		max-width: 1200px;
		margin: 0 auto;
	}
	.section-header {
		text-align: center;
		margin-bottom: 56px;
	}
	.section-header h1 {
		font-size: 2.5rem;
		font-weight: 700;
		margin-bottom: 16px;
	}
	.section-header p {
		font-size: 1.25rem;
		color: #6b7280;
		max-width: 600px;
		margin: 0 auto;
	}
	.testimonials-grid {
		display: grid;
		gap: 28px;
	}
	.cols-2 {
		grid-template-columns: repeat(2, 1fr);
	}
	.cols-3 {
		grid-template-columns: repeat(3, 1fr);
	}
	.testimonial-card {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding: 32px;
		border: 1px solid #e5e7eb;
		border-radius: 16px;
		background: #fafafa;
	}
	.stars {
		display: flex;
		gap: 2px;
	}
	.star {
		font-size: 1.125rem;
		color: #d1d5db;
	}
	.star.filled {
		color: #f59e0b;
	}
	.quote {
		flex: 1;
		font-size: 1rem;
		line-height: 1.75;
		color: #374151;
		margin: 0;
		font-style: italic;
	}
	.testimonial-footer {
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.avatar {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: #e5e7eb;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 700;
		font-size: 0.875rem;
		color: #374151;
		overflow: hidden;
	}
	.avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.author {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
	}
	.author strong {
		font-size: 0.9375rem;
		font-weight: 600;
	}
	.author span {
		font-size: 0.8125rem;
		color: #6b7280;
	}
	.service-tag {
		display: inline-block;
		margin-top: 4px;
		padding: 2px 8px;
		background: #e5e7eb;
		border-radius: 4px;
		font-size: 0.75rem;
		color: #374151 !important;
	}
	@media (max-width: 900px) {
		.cols-3 {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (max-width: 600px) {
		.testimonials-grid {
			grid-template-columns: 1fr;
		}
		.section-header h1 {
			font-size: 2rem;
		}
	}
</style>

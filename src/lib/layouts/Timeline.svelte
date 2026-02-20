<script lang="ts">
	interface TimelineEvent {
		date: string;
		title: string;
		description?: string;
		badge?: string;
		icon?: string;
	}

	interface Props {
		title?: string;
		subtitle?: string;
		events?: TimelineEvent[];
		orientation?: 'left' | 'alternate';
	}

	let {
		title = 'Our Journey',
		subtitle = 'Key milestones in our story.',
		events = [],
		orientation = 'left'
	}: Props = $props();
</script>

<section class="timeline-section">
	<div class="section-header">
		<h1>{title}</h1>
		{#if subtitle}
			<p>{subtitle}</p>
		{/if}
	</div>

	<div class="timeline" class:alternate={orientation === 'alternate'}>
		{#each events as event, i}
			<div class="timeline-item" class:right={orientation === 'alternate' && i % 2 === 1}>
				<div class="timeline-node">
					{#if event.icon}
						<span class="node-icon">{event.icon}</span>
					{:else}
						<span class="node-dot"></span>
					{/if}
				</div>
				<div class="timeline-content">
					{#if event.badge}
						<span class="event-badge">{event.badge}</span>
					{/if}
					<time class="event-date">{event.date}</time>
					<h2 class="event-title">{event.title}</h2>
					{#if event.description}
						<p class="event-description">{event.description}</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.timeline-section {
		padding: 64px 24px;
		max-width: 800px;
		margin: 0 auto;
	}
	.section-header {
		text-align: center;
		margin-bottom: 56px;
	}
	.section-header h1 {
		font-size: 2.5rem;
		font-weight: bold;
		margin-bottom: 12px;
	}
	.section-header p {
		font-size: 1.125rem;
		opacity: 0.6;
	}

	/* Left-aligned timeline */
	.timeline {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0;
	}
	.timeline::before {
		content: '';
		position: absolute;
		left: 24px;
		top: 0;
		bottom: 0;
		width: 2px;
		background: oklch(var(--b3));
	}
	.timeline-item {
		display: flex;
		gap: 24px;
		padding-bottom: 40px;
		position: relative;
	}
	.timeline-node {
		flex-shrink: 0;
		width: 50px;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding-top: 2px;
	}
	.node-dot {
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: oklch(var(--p));
		border: 3px solid oklch(var(--b1));
		box-shadow: 0 0 0 2px oklch(var(--p)/0.3);
	}
	.node-icon {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: oklch(var(--p));
		color: oklch(var(--pc));
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.875rem;
		border: 3px solid oklch(var(--b1));
	}
	.timeline-content {
		flex: 1;
		background: oklch(var(--b1));
		border: 1px solid oklch(var(--b3));
		border-radius: var(--radius-box);
		padding: 20px 24px;
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	.event-badge {
		display: inline-block;
		padding: 2px 10px;
		background: oklch(var(--p)/0.15);
		color: oklch(var(--p));
		border-radius: 99px;
		font-size: 0.7rem;
		font-weight: 700;
		width: fit-content;
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}
	.event-date {
		font-size: 0.8rem;
		font-weight: 600;
		opacity: 0.45;
	}
	.event-title {
		font-size: 1.05rem;
		font-weight: 700;
		margin: 0;
	}
	.event-description {
		font-size: 0.875rem;
		opacity: 0.65;
		line-height: 1.6;
		margin: 0;
	}

	/* Alternate layout */
	.timeline.alternate::before {
		left: 50%;
		transform: translateX(-50%);
	}
	.timeline.alternate .timeline-item {
		width: 50%;
		padding-right: 40px;
		justify-content: flex-end;
	}
	.timeline.alternate .timeline-item .timeline-node {
		position: absolute;
		right: -25px;
		top: 4px;
		z-index: 1;
	}
	.timeline.alternate .timeline-item.right {
		align-self: flex-end;
		flex-direction: row-reverse;
		padding-right: 0;
		padding-left: 40px;
	}
	.timeline.alternate .timeline-item.right .timeline-node {
		right: auto;
		left: -25px;
	}
	@media (max-width: 640px) {
		.timeline.alternate::before {
			left: 24px;
			transform: none;
		}
		.timeline.alternate .timeline-item,
		.timeline.alternate .timeline-item.right {
			width: 100%;
			padding-left: 0;
			padding-right: 0;
			flex-direction: row;
			justify-content: flex-start;
		}
		.timeline.alternate .timeline-item .timeline-node,
		.timeline.alternate .timeline-item.right .timeline-node {
			position: static;
		}
	}
</style>

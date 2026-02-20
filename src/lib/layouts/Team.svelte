<script lang="ts">
	interface TeamMember {
		name: string;
		role: string;
		bio?: string;
		avatar?: string;
		social?: {
			github?: string;
			linkedin?: string;
			twitter?: string;
			email?: string;
		};
	}

	interface Props {
		title?: string;
		subtitle?: string;
		members?: TeamMember[];
		columns?: 2 | 3 | 4;
	}

	let {
		title = 'Meet Our Team',
		subtitle = 'The people behind the work.',
		members = [],
		columns = 3
	}: Props = $props();

	const gridCols: Record<number, string> = { 2: '2', 3: '3', 4: '4' };
</script>

<section class="team-section">
	<div class="section-header">
		<h1>{title}</h1>
		{#if subtitle}
			<p>{subtitle}</p>
		{/if}
	</div>

	<div class="members-grid cols-{gridCols[columns]}">
		{#each members as member}
			<div class="member-card">
				<div class="avatar-wrap">
					{#if member.avatar}
						<img src={member.avatar} alt={member.name} class="avatar-img" />
					{:else}
						<div class="avatar-placeholder">
							{member.name.split(' ').map((n) => n[0]).join('')}
						</div>
					{/if}
				</div>
				<h2 class="member-name">{member.name}</h2>
				<p class="member-role">{member.role}</p>
				{#if member.bio}
					<p class="member-bio">{member.bio}</p>
				{/if}
				{#if member.social}
					<div class="social-links">
						{#if member.social.github}
							<a href={member.social.github} aria-label="GitHub" target="_blank" rel="noopener">GH</a>
						{/if}
						{#if member.social.linkedin}
							<a href={member.social.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener">LI</a>
						{/if}
						{#if member.social.twitter}
							<a href={member.social.twitter} aria-label="Twitter/X" target="_blank" rel="noopener">X</a>
						{/if}
						{#if member.social.email}
							<a href="mailto:{member.social.email}" aria-label="Email">✉</a>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</section>

<style>
	.team-section {
		padding: 64px 24px;
		max-width: 1100px;
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
	.members-grid {
		display: grid;
		gap: 32px;
	}
	.members-grid.cols-2 { grid-template-columns: repeat(2, 1fr); }
	.members-grid.cols-3 { grid-template-columns: repeat(3, 1fr); }
	.members-grid.cols-4 { grid-template-columns: repeat(4, 1fr); }
	@media (max-width: 768px) {
		.members-grid.cols-3,
		.members-grid.cols-4 { grid-template-columns: repeat(2, 1fr); }
	}
	@media (max-width: 480px) {
		.members-grid { grid-template-columns: 1fr; }
	}
	.member-card {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		padding: 32px 24px;
		border: 1px solid oklch(var(--b3));
		border-radius: var(--radius-box);
		background: oklch(var(--b1));
	}
	.avatar-wrap {
		margin-bottom: 8px;
	}
	.avatar-img {
		width: 96px;
		height: 96px;
		border-radius: 50%;
		object-fit: cover;
	}
	.avatar-placeholder {
		width: 96px;
		height: 96px;
		border-radius: 50%;
		background: oklch(var(--n));
		color: oklch(var(--nc));
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: 0.05em;
	}
	.member-name {
		font-size: 1.125rem;
		font-weight: 700;
		margin: 0;
	}
	.member-role {
		font-size: 0.875rem;
		color: oklch(var(--p));
		font-weight: 600;
		margin: 0;
	}
	.member-bio {
		font-size: 0.875rem;
		opacity: 0.65;
		line-height: 1.6;
		margin: 0;
	}
	.social-links {
		display: flex;
		gap: 8px;
		margin-top: 4px;
	}
	.social-links a {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: oklch(var(--b3));
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.75rem;
		font-weight: 700;
		text-decoration: none;
		color: oklch(var(--bc));
		transition: background 0.2s;
	}
	.social-links a:hover {
		background: oklch(var(--n));
		color: oklch(var(--nc));
	}
</style>

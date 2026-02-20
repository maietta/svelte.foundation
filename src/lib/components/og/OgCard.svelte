<script lang="ts">
	interface Props {
		title: string;
		description?: string;
		label?: string;
		site?: string;
	}
	let { title, description = '', label = '', site = '' }: Props = $props();
</script>

<div
	style="display: flex; flex-direction: column; width: 100%; height: 100%;
	       background: #09090b; padding: 72px; font-family: 'Geist', sans-serif;"
>
	<!-- Label badge -->
	{#if label}
		<div style="display: flex; margin-bottom: 28px;">
			<span
				style="background: #27272a; color: #71717a; font-size: 18px; font-weight: 500;
				       padding: 6px 18px; border-radius: 6px; letter-spacing: 0.08em;
				       text-transform: uppercase; border: 1px solid #3f3f46;"
			>
				{label}
			</span>
		</div>
	{/if}

	<!-- Title -->
	<div
		style="display: flex; color: #fafafa; font-size: 64px; font-weight: 700;
		       line-height: 1.1; flex: 1; margin-top: {label ? '0' : '40px'};"
	>
		{title}
	</div>

	<!-- Description -->
	{#if description}
		<div
			style="display: flex; color: #a1a1aa; font-size: 28px; line-height: 1.5;
			       margin-top: 28px; max-width: 900px;"
		>
			{description}
		</div>
	{/if}

	<!-- Footer -->
	<div
		style="display: flex; align-items: center; justify-content: space-between;
		       margin-top: 56px; padding-top: 36px; border-top: 1px solid #27272a;"
	>
		<span style="color: #52525b; font-size: 22px; font-weight: 500;">{site}</span>
		<span
			style="width: 10px; height: 10px; border-radius: 50%; background: #22c55e;"
		></span>
	</div>
</div>

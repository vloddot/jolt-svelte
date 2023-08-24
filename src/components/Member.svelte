<script lang="ts">
	import { getContext, settingsContext } from '$lib/context';

	/**
	 * Source for avatar of member.
	 */
	export let src: string;

	/**
	 * Display name of member.
	 */
	export let displayName: string;

	const settings = getContext(settingsContext);
</script>

<div role="listitem">
	{#if $settings?.lowDataMode}
		<img
			src="/user.svg"
			alt={displayName}
			width="24"
			height="24"
			class="rounded-3xl inline aspect-square"
		/>
	{:else}
		<img {src} alt={displayName} width="24" height="24" class="rounded-3xl inline aspect-square" />
	{/if}

	{displayName}
</div>

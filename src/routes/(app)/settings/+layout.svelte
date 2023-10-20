<script lang="ts">
	import SettingsSection from '@components/Settings/Section.svelte';
	import { getContext } from '$lib/context';
	import { clientKey, sessionKey } from '@routes/context';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const client = getContext(clientKey)!;
	const session = getContext(sessionKey)!;
</script>

<div class="channel-bar-container">
	{#each data.sections as section}
		<SettingsSection {section} />
	{/each}

	<hr />

	<button
		class="button danger"
		on:click={async () => {
			await client.destroy();
			session.set(null);
		}}
	>
		Logout
	</button>
</div>

<main class="main-content-container">
	<slot />
</main>

<style lang="scss">
	.button {
		text-align: start;
		margin: 0px 8px;
	}
</style>

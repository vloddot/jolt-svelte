<script lang="ts">
	import SettingsSection from '@components/Settings/Section.svelte';
	import { getContext } from '$lib/context';
	import '$lib/index.css';
	import { clientKey, sessionKey } from '@routes/context';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const client = getContext(clientKey)!;
	const session = getContext(sessionKey)!;
</script>

<div class="channel-bar-container">
	<div class="ml-2">
		{#each data.sections as section}
			<SettingsSection {section} />
		{/each}

		<hr class="my-2 mr-2 border-gray-500" />

		<div class="hover:bg-gray-600">
			<button
				class="w-full text-start"
				on:click={async () => {
					await client.destroy();
					session.set(null);
				}}
			>
				Logout
			</button>
		</div>
	</div>
</div>

<main class="main-content-container">
	<slot />
</main>

<script lang="ts">
	import { goto } from '$app/navigation';
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
	{#each data.sections as section}
		<SettingsSection {section} />
	{/each}

	<hr class="my-2 border-gray-500" />

	<div class="hover:bg-gray-600">
		<button
			class="w-full text-start"
			on:click={async () => {
				await client.api.logout();
				session.set(null);
				await goto('/login');
			}}
		>
			Logout
		</button>
	</div>
</div>

<main class="main-content-container">
	<slot />
</main>

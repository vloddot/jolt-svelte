<script lang="ts">
	import { _ } from 'svelte-i18n';
	import '$lib/index.css';
	import type { LayoutData } from './$types';
	import { getContext } from '$lib/context';
	import { clientKey } from '@routes/context';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let data: LayoutData;

	const client = getContext(clientKey)!;
</script>

<div class="channel-bar-container">
	{#each data.sections as { title, id }}
		<a href="/settings/{id}" class={$page.url.pathname == `/settings/${id}` ? 'bg-gray-400' : 'hover:bg-gray-600'}>
			<p>{title}</p>
		</a>
	{/each}

	<hr class="border-gray-600 my-2" />

	<div class="hover:bg-gray-600">
		<button
			class="w-full text-start"
			on:click={async () => {
				client.api.logout();
				await goto('/login');
			}}
			>{$_('logout')}
		</button>
	</div>
</div>

<main class="main-content-container">
	<slot />
</main>

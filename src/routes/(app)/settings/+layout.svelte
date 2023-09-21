<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { getContext } from '$lib/context';
	import '$lib/index.css';
	import { clientKey, sessionKey } from '@routes/context';
	import type { LayoutData } from './$types';
	import { _ } from 'svelte-i18n';

	export let data: LayoutData;

	const client = getContext(clientKey)!;
	const session = getContext(sessionKey)!;
</script>

<div class="channel-bar-container">
	{#each data.sections as section}
		{#if section.type == 'link'}
			<a
				href="{base}/settings/{section.id}"
				class={$page.url.pathname == `${base}/settings/${section.id}`
					? 'bg-gray-400'
					: 'hover:bg-gray-600'}
			>
				<p>{section.title}</p>
			</a>
		{:else if section.type == 'header'}
			<h1 class="text-xl uppercase my-2">{section.title}</h1>
		{/if}
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
			{$_('logout')}
		</button>
	</div>
</div>

<main class="main-content-container">
	<slot />
</main>

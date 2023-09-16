<script lang="ts">
	import { page } from '$app/stores';
	import { getContext } from '$lib/context';
	import '$lib/index.css';
	import { clientKey, sessionKey } from '@routes/context';
	import { _ } from 'svelte-i18n';
	import type { LayoutData } from './$types';
	import { base } from '$app/paths';

	export let data: LayoutData;

	const client = getContext(clientKey)!;
	const session = getContext(sessionKey)!;
</script>

<div class="channel-bar-container">
	{#each data.sections as section}
		{#if section.type == 'normal'}
			<a
				href="{base}/settings/{section.id}"
				class={$page.url.pathname == `${base}/settings/${section.id}`
					? 'bg-gray-400'
					: 'hover:bg-gray-600'}
			>
				<p>{section.title}</p>
			</a>
		{:else if section.type == 'button'}
			<div class="hover:bg-gray-600">
				<button
					class="w-full text-start"
					on:click={() => section.type == 'button' && section.onClick(client, session)}
				>
					{section.title}
				</button>
			</div>
		{:else if section.type == 'hr'}
			<hr class="border-gray-600 my-2" />
		{/if}
	{/each}
</div>

<main class="main-content-container">
	<slot />
</main>

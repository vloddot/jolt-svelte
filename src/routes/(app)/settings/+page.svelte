<script lang="ts">
	import { _ } from 'svelte-i18n';
	import '$lib/index.css';
	import './index.css';
	import Setting from '@components/Setting.svelte';
	import type { PageData } from './$types';
	import { getContext } from '$lib/context';
	import { clientKey } from '@routes/context';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let selectedSettings = data.sections[0].settings;
	let selectedHref = data.sections[0].href;
	$: history.replaceState({}, '', `/settings/${selectedHref}`);

	const client = getContext(clientKey)!;
</script>

<div class="grid-layout">
	<div>
		{#each data.sections as { title, href, settings }}
			<div class={href == selectedHref ? 'bg-gray-400' : 'hover:bg-gray-600'}>
				<button
					class="w-full text-start"
					role="link"
					on:click={() => {
						selectedHref = href;
						selectedSettings = settings;
					}}
				>
					<p>{title}</p>
				</button>
			</div>
		{/each}

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

		<div class="hover:bg-gray-600">
			<button class="w-full text-start" on:click={() => history.back()}>{$_('go-back')}</button>
		</div>
	</div>
	<div>
		{#each selectedSettings as setting}
			<Setting {...setting} />
		{/each}
	</div>
</div>

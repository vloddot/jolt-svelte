<script lang="ts">
	import { _ } from 'svelte-i18n';
	import '$lib/index.css';
	import './index.css';
	import Setting from '@components/Setting.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let selectedSettings = data.sections[0].settings;
	let selectedHref = data.sections[0].href;
</script>

<div class="grid-layout">
	<div>
		{#each data.sections as { title, href, settings }}
			<div
				class="w-full cursor-pointer {href == selectedHref ? 'bg-gray-400' : 'hover:bg-gray-600'}"
			>
				<button
					class="w-full text-start"
					role="link"
					on:click={() => {
						selectedHref = href;
						history.replaceState({}, '', `/settings/${selectedHref}`);

						selectedSettings = settings;
					}}
				>
					<p>{title}</p>
				</button>
			</div>
		{/each}

		<button on:click={() => history.back()}>{$_('go-back')}</button>
	</div>
	<div>
		{#each selectedSettings as setting}
			<Setting {...setting} />
		{/each}
	</div>
</div>

<script lang="ts">
	import type { DisplayedSetting } from '@routes/(app)/settings/sections';
	import CheckboxSetting from './CheckboxSetting.svelte';
	import DropdownSetting from './DropdownSetting.svelte';
	import InputSetting from './InputSetting.svelte';

	export let settings: DisplayedSetting[];
</script>

{#each settings as setting}
	<div class="flex ml-4">
		{#if setting.type == 'checkbox'}
			<CheckboxSetting {setting} />
		{:else if setting.type == 'dropdown'}
			<DropdownSetting {setting} />
		{:else if setting.type == 'text' || setting.type == 'password'}
			<InputSetting {setting} />
		{/if}
	</div>
{/each}

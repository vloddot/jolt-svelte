<script lang="ts">
	import { getContext } from '$lib/context';
	import type { DisplayedSetting } from '@routes/(app)/settings/sections';
	import { settingsKey } from '@routes/context';

	const settings = getContext(settingsKey)!;

	export let setting: Extract<DisplayedSetting, { type: 'checkbox' }>;
	$: customSettingKey =
		setting.action.type == 'update-custom-setting' ? setting.action.key : undefined;
</script>

<div>
	<h2><label for={setting.id}>{setting.title}</label></h2>
	{#if setting.description}
		<p class="ml-4 whitespace-pre-wrap">{setting.description}</p>
	{/if}
</div>
<div class="flex-1" />
<input
	id={setting.id}
	checked={customSettingKey == undefined ? false : $settings[customSettingKey]}
	type="checkbox"
/>

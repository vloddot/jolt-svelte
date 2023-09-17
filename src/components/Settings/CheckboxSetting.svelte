<script lang="ts">
	import { getContext } from '$lib/context';
	import type { DisplayedSetting } from '@routes/(app)/settings/sections';
	import { settingsKey } from '@routes/context';
	import { dispatchAction } from '.';

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
	checked={customSettingKey != undefined && $settings[customSettingKey]}
	on:input={(event) => {
		const action = setting.action;
		if (action?.type != 'update-custom-setting') {
			return;
		}

		dispatchAction({ ...action, settings, value: event.currentTarget.checked });
	}}
	type="checkbox"
/>

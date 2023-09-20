<script lang="ts">
	import { getContext } from '$lib/context';
	import CheckboxSetting from '@components/Settings/CheckboxSetting.svelte';
	import { settingsKey } from '@routes/context';

	const settings = getContext(settingsKey)!;
</script>

<CheckboxSetting
	title="Low Data Mode"
	description="Disables user images entirely and replaces then with low data usage custom icons."
	id="jolt:low-data-mode"
	bind:checked={$settings['jolt:low-data-mode']}
/>

<CheckboxSetting
	title="Send Typing Indicators"
	description="Send typing indicators (e.g. <user> is typing...)"
	id="jolt:send-typing-indicators"
	bind:checked={$settings['jolt:send-typing-indicators']}
/>

<CheckboxSetting
	title="Receive Typing Indicators"
	description="Receive typing indicators (e.g. <user> is typing...)"
	id="jolt:receive-typing-indicators"
	bind:checked={$settings['jolt:receive-typing-indicators']}
/>

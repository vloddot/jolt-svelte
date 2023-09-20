<script lang="ts">
	import { getContext } from '$lib/context';
	import CheckboxSetting from '@components/Settings/CheckboxSetting.svelte';
	import { settingsKey } from '@routes/context';

	const settings = getContext(settingsKey)!;
</script>

<CheckboxSetting
	title="Compact Mode"
	description="Hides user profile pictures in chats. Easier on the eyes."
	id="jolt:compact-mode"
	bind:checked={$settings['jolt:compact-mode']}
/>

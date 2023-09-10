<script lang="ts">
	import { getContext } from '$lib/context';
	import { settingsKey } from '@routes/context';

	/**
	 * Source for avatar of member.
	 */
	export let src: string;

	/**
	 * Display name of member.
	 */
	export let name: string;

	export let width = 24;
	export let height = 24;

	const settings = getContext(settingsKey)!;
</script>

<img
	src={$settings['jolt:low-data-mode'] ? '/user.svg' : src}
	alt={name}
	{width}
	{height}
	class="rounded-3xl inline"
/>

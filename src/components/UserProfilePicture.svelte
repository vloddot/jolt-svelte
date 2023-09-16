<script lang="ts">
	import { base } from '$app/paths';
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

	export let inline = true;

	const settings = getContext(settingsKey)!;
</script>

<img
	src={$settings['jolt:low-data-mode'] ? `${base}/user.svg'` : src}
	alt={name}
	style="width:{width}px;height:{height}px;"
	class="rounded-3xl object-cover {inline ? 'inline' : ''}"
/>

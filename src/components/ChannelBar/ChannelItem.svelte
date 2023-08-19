<script lang="ts">
	import { lowDataModeKey, serverIDKey } from '.';
	import { getContext } from 'svelte';

	/**
	 * Image source to show.
	 */
	export let src: string | undefined;

	/**
	 * Channel name.
	 */
	export let name: string;

	/**
	 * Alternate text for image.
	 */
	export let alt = name;

	/**
	 * Width of the image.
	 */
	export let width: number;

	/**
	 * Height of the image.
	 */
	export let height: number;

	/**
	 * Whether the image is rounded or not.
	 */
	export let rounded = false;

	/**
	 * Whether the channel is selected or not.
	 */
	export let selected = false;

	/**
	 * Channel ID.
	 */
	export let id: string;

	/**
	 * Override showing the channel icon over low data mode setting.
	 */
	export let forceShowIcon = false;

	const serverID: string | undefined = getContext(serverIDKey);
	const lowDataMode: boolean = getContext(lowDataModeKey);
</script>

<a href={serverID === undefined ? `/channels/${id}` : `/servers/${serverID}/channels/${id}`}>
	<div role="listitem" class="p-2 cursor-pointer {selected ? 'bg-gray-400' : 'hover:bg-gray-600'}">
		{#if !lowDataMode || forceShowIcon}
			<img {src} {alt} {width} {height} class:rounded-3xl={rounded} class="inline aspect-square" />
		{/if}
		{name}
	</div>
</a>

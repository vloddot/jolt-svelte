<script lang="ts">
	import { base } from '$app/paths';
	import { getContext } from '$lib/context';
	import UserProfilePicture from '@components/UserProfilePicture.svelte';
	import { selectedChannelIDKey, selectedServerIDKey } from '@routes/(app)/context';

	/**
	 * Image source to show.
	 */
	export let src: string;

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
	 * Channel ID.
	 */
	export let id: string;

	const selectedServerID = getContext(selectedServerIDKey);
	const selectedChannelID = getContext(selectedChannelIDKey);
</script>

<div role="listitem" class={$selectedChannelID == id ? 'bg-gray-400' : 'hover:bg-gray-600'}>
	<a
		class="p-2 block"
		href="{base}/{$selectedServerID == undefined
			? `channels/${id}`
			: `servers/${$selectedServerID}/channels/${id}`}"
	>
		<UserProfilePicture {src} name={alt} {width} {height} />

		{name}
	</a>
</div>

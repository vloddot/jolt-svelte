<script lang="ts">
	import UserProfilePicture from '@components/UserProfilePicture.svelte';

	/**
	 * Image source to show.
	 */
	export let src: string;

	/**
	 * Channel name.
	 */
	export let name: string;

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
	export let href: string;

	/**
	 * Whether this channel is selected or not.
	 */
	export let selected: boolean;
</script>

<div role="listitem" class={selected ? 'bg-gray-400' : 'hover:bg-gray-600'}>
	<a {href} class="p-2 block">
		<UserProfilePicture {src} {name} {width} {height} />

		{name}
	</a>
</div>

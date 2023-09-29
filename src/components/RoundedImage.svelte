<script lang="ts">
	/**
	 * Source for avatar of user.
	 */
	export let src: string;

	/**
	 * Display name of user.
	 */
	export let name: string;

	export let width = 24;
	export let height = 24;

	export let inline = true;
</script>

<img
	{src}
	alt={name}
	style="width:{width}px;height:{height}px;"
	class="rounded-full object-cover {inline ? 'inline' : ''}"
/>

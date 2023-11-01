<script lang="ts">
	import { getContext } from '$lib/context';
	import { getDisplayAvatar, getDisplayName } from '$lib/util';
	import GenericUserIcon from '@components/Icons/GenericUserIcon.svelte';
	import { settingsKey } from '@routes/context';

	const settings = getContext(settingsKey)!;

	export let user: User;
	export let member: Member | undefined = undefined;
	export let message: Message | undefined = undefined;

	let initialSize: string | number = '28px';

	export { initialSize as size };

	$: size = typeof initialSize == 'number' ? `${initialSize}px` : initialSize;
</script>

{#if $settings['jolt:low-data-mode']}
	<GenericUserIcon />
{:else}
	{@const src = getDisplayAvatar(user, member, message)}
	{@const alt = getDisplayName(user, member, message)}

	{#if typeof src == 'string'}
		<img class="cover" {src} {alt} style="width:{size};height:{size};" />
	{/if}
{/if}

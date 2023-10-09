<script lang="ts">
	import { page } from '$app/stores';
	import ChannelItem from '@components/ChannelBar/ChannelItem.svelte';

	export let section: SettingsSection;

	$: splitPathname = $page.url.pathname.split('/');
	$: root = splitPathname.slice(0, splitPathname.length - 1).join('/');
</script>

{#if section.type == 'link'}
	<ChannelItem href={section.id} selected={$page.url.pathname == `${root}/${section.id}`}>
		{section.title}
	</ChannelItem>
{:else if section.type == 'header'}
	<h1>{section.title}</h1>
{/if}

<style lang="scss">
	h1 {
		text-transform: uppercase;
		font-size: large;
		margin: 8px 0;
	}
</style>

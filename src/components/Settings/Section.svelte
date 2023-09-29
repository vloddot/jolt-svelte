<script lang="ts">
	import { page } from '$app/stores';

	export let section: SettingsSection;

	$: splitPathname = $page.url.pathname.split('/');
	$: root = splitPathname.slice(0, splitPathname.length - 1).join('/');
</script>

{#if section.type == 'link'}
	<a
		href="{root}/{section.id}"
		class={$page.url.pathname == `${root}/${section.id}` ? 'bg-gray-400' : 'hover:bg-gray-600'}
	>
		<p>{section.title}</p>
	</a>
{:else if section.type == 'header'}
	<h1 class="text-xl uppercase my-2">{section.title}</h1>
{/if}

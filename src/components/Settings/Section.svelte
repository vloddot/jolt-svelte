<script lang="ts">
	import { page } from '$app/stores';

	export let section: SettingsSection;

	$: splitPathname = $page.url.pathname.split('/');
	$: root = splitPathname.slice(0, splitPathname.length - 1).join('/');
</script>

{#if section.type == 'link'}
	<div class={$page.url.pathname == `${root}/${section.id}` ? 'bg-gray-400' : 'hover:bg-gray-600'}>
		<a href="{root}/{section.id}">
			<p>{section.title}</p>
		</a>
	</div>
{:else if section.type == 'header'}
	<h1 class="text-xl uppercase my-2">{section.title}</h1>
{/if}

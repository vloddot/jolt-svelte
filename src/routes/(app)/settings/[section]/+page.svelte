<script lang="ts">
	import type { PageData } from './$types';
	import Setting from '@components/Setting.svelte';

	export let data: PageData;
</script>

{#each data.section.settings as setting}
	<Setting {...setting} />
{/each}

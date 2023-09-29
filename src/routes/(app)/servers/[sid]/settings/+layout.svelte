<script lang="ts">
	import type { LayoutData } from './$types';
	import SettingsSection from '@components/Settings/Section.svelte';

	export let data: LayoutData;
</script>

<div class="channel-bar-container">
	{#each data.sections as section}
		<SettingsSection {section} />
	{/each}
</div>

<main class="main-content-container">
	<slot />
</main>

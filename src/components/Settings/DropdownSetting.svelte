<script lang="ts">
	export let title: string;
	export let description: string | undefined = undefined;
	export let id: string;
</script>

<details>
	<summary><label for={id}>{title}</label></summary>
	<div class="ml-4">
		<slot />
	</div>
	{#if description != undefined}
		<p class="ml-4">{description}</p>
	{/if}
</details>

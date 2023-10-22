<script lang="ts">
	export let title: string;
	export let description: string | undefined = undefined;
	export let id: string;
</script>

<details>
	<summary><label for={id}>{title}</label></summary>
	<div class="indented">
		<slot />
	</div>
	{#if description != undefined}
		<p class="indented">{description}</p>
	{/if}
</details>

<style lang="scss">
	.indented {
		margin-left: 24px;
	}
</style>

<script lang="ts">
	export let id: string;
	export let checked: boolean;
	export let title: string;
	export let description: string | undefined = undefined;
</script>

<div class="container">
	<div>
		<h2><label for={id}>{title}</label></h2>
		{#if description != undefined}
			<p class="description">{description}</p>
		{/if}
	</div>
	<div class="flex-divider" />
	<input {id} bind:checked type="checkbox" style="outline: none;" />
</div>

<style lang="scss">
	.container {
		display: flex;
		padding: 0px 20px;
	}

	.description {
		margin-left: 6px;
		color: var(--secondary-foreground);
		white-space: pre-wrap;
	}
</style>

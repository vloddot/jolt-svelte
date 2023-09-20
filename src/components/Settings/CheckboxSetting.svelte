<script lang="ts">
	export let id: string;
	export let checked: boolean;
	export let title: string;
	export let description: string | undefined = undefined;
</script>

<div class="flex">
	<div>
		<h2><label for={id}>{title}</label></h2>
		{#if description}
			<p class="ml-4 whitespace-pre-wrap">{description}</p>
		{/if}
	</div>
	<div class="flex-1" />
	<input {id} bind:checked type="checkbox" />
</div>

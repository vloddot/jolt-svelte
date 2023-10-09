<script lang="ts">
	export let type: 'text' | 'textarea' | 'password' | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let description: string | undefined = undefined;

	export let value = '';
</script>

<div class="container">
	{#if type == 'textarea'}
		<textarea {placeholder} bind:value />
	{:else}
		<input
			{type}
			{placeholder}
			{value}
			on:input={(event) => (value = event.currentTarget.value)}
		/>
	{/if}

	{#if description != undefined}
		<p class="description">{description}</p>
	{/if}
</div>

<style lang="scss">
	.description {
		margin: 12px 0px 24px 24px;
		color: var(--secondary-foreground);
	}
</style>

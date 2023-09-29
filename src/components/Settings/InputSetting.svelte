<script lang="ts">
	export let type: 'text' | 'textarea' | 'password' | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let description: string | undefined = undefined;

	export let value = '';
</script>

<div>
	{#if type == 'textarea'}
		<textarea class="bg-gray-500" {placeholder} bind:value />
	{:else}
		<input
			class="bg-gray-500"
			{type}
			{placeholder}
			{value}
			on:input={(event) => (value = event.currentTarget.value)}
		/>
	{/if}

	{#if description != undefined}
		<p class="ml-4">{description}</p>
	{/if}
</div>

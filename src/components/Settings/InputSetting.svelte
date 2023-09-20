<script lang="ts">
	export let type: 'text' | 'password';
	export let placeholder: string;
	export let description: string | undefined = undefined;

	export let value: string;
</script>

<input
	class="bg-gray-500"
	{type}
	{placeholder}
	on:input={(event) => (value = event.currentTarget.value)}
/>

{#if description != undefined}
	<p class="ml-4">{description}</p>
{/if}

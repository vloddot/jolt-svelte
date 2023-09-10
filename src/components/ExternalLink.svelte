<script lang="ts">
	import Modal from '@components/Modal.svelte';

	export let href: string;
	let showModal = false;
</script>

<Modal on:submit={() => window.open(href)} bind:showModal>
	<h1 class="text-3xl" slot="header">External Link</h1>
	<p>Are you sure you want to go to this link? External links can be dangerous.</p>
</Modal>

<a {href} on:click|preventDefault={() => (showModal = true)} target="_blank" rel="noreferrer">
	{href}
</a>

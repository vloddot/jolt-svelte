<script lang="ts">
	import Modal from '@components/Modal.svelte';
	import { shell } from '@tauri-apps/api';

	export let link: string;
	let showModal = false;
</script>

<Modal on:submit={() => shell.open(link)} bind:showModal>
	<h1 slot="header">External Link</h1>
	<p>Are you sure you want to go to this link? External links can be dangerous.</p>
</Modal>

<button role="link" on:click={() => (showModal = true)}>{link}</button>

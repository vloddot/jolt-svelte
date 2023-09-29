<script lang="ts">
	export let showModal: boolean;
	let dialogElement: HTMLDialogElement;

	$: if (showModal) dialogElement?.showModal();
	else dialogElement?.close();
</script>

<dialog bind:this={dialogElement} on:close={() => (showModal = false)}>
	<div>
		<slot />
		<hr />

		<form id="modal-form" on:submit method="dialog">
			<button type="submit">Ok</button>
			<button on:click={() => (showModal = false)} type="reset">Cancel</button>
		</form>
	</div>
</dialog>

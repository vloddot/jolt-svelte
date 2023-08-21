<script lang="ts">
	import { _ } from 'svelte-i18n';

	export let showModal: boolean;
	let dialogElement: HTMLDialogElement;

	$: if (showModal) dialogElement?.showModal();
	else dialogElement?.close();
</script>

<dialog bind:this={dialogElement} on:close={() => (showModal = false)}>
	<div>
		<slot name="header" />
		<hr />
		<slot />
		<hr />

		<form on:submit method="dialog">
			<button type="submit">{$_('confirm')}</button>
			<button on:click={() => (showModal = false)} type="reset">{$_('cancel')}</button>
		</form>
	</div>
</dialog>

<script lang="ts">
  export let showModal: boolean;
  let dialogElement: HTMLDialogElement;

  $: if (showModal) dialogElement?.showModal();
</script>

<dialog bind:this={dialogElement} on:close={() => (showModal = false)}>
  <div>
    <slot name="header" />
    <hr />
    <slot />
    <hr />

    <form method="dialog">
      <button type="submit">Ok</button>
    </form>
  </div>
</dialog>

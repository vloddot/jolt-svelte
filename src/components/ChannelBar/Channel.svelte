<script lang="ts">
  import { currentChannelID } from '$lib/stores';

  export let rounded: boolean = false;
  export let src: string;
  export let width: string | undefined;
  export let height: string | undefined;
  export let name: string;
  export let alt: string | undefined = name;
  export let id: string;
</script>

<div
  class="p-2 hover:bg-gray-400 cursor-pointer"
  tabindex="0"
  role="link"
  on:click={() => currentChannelID.set(id)}
  on:keydown
  on:keypress
  on:keyup
>
  <img {src} {alt} {width} {height} class:rounded-3xl={rounded} class="inline aspect-square" />
  {name}
</div>

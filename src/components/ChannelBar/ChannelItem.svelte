<script lang="ts">
  import { currentChannelID } from '$lib/stores';

  /**
   * Image source to show.
   */
  export let src: string | undefined;

  /**
   * Channel name.
   */
  export let name: string;

  /**
   * Alternate text for image.
   */
  export let alt: string = name;

  /**
   * Width of the image.
   */
  export let width: number;

  /**
   * Height of the image.
   */
  export let height: number;

  /**
   * Whether the image is rounded or not.
   */
  export let rounded: boolean = false;

  /**
   * Channel ID.
   */
  export let id: string;
</script>

<div
  class="p-2 cursor-pointer"
  class:hover:bg-gray-600={$currentChannelID !== id}
  class:bg-gray-400={$currentChannelID === id}
  tabindex="0"
  role="link"
  on:click={() => currentChannelID.set(id)}
  on:keydown={(event) => event.key === 'Enter' && currentChannelID.set(id)}
>
  <img {src} {alt} {width} {height} class:rounded-3xl={rounded} class="inline aspect-square" />
  {name}
</div>

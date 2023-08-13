<script lang="ts">
  import { selectedChannelID } from '$lib/stores';

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
  class={`p-2 cursor-pointer ${$selectedChannelID === id ? 'bg-gray-400' : 'hover:bg-gray-600'}`}
  tabindex="0"
  role="link"
  on:click={() => selectedChannelID.set(id)}
  on:keydown={(event) => event.key === 'Enter' && selectedChannelID.set(id)}
>
  <img {src} {alt} {width} {height} class:rounded-3xl={rounded} class="inline aspect-square" />
  {name}
</div>

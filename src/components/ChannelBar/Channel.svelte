<script lang="ts">
  import { currentChannelID } from '$lib/stores';

  /**
   * Whether the element is rounded or not.
   */
  export let rounded: boolean = false;

  /**
   * Image URL to show alongside channel name.
   */
  export let src: string | undefined;

  /**
   * Image width.
   */
  export let width: string | undefined;

  /**
   * Image height.
   */
  export let height: string | undefined;

  /**
   * Channel name.
   */
  export let name: string;

  /**
   * Alternate text for image.
   */
  export let alt: string | undefined = name;

  /**
   * Channel ID.
   */
  export let id: string;
</script>

<div
  class="p-2 hover:bg-gray-400 cursor-pointer"
  tabindex="0"
  role="link"
  on:click={() => currentChannelID.set(id)}
  on:keydown={(event) => event.key === 'Enter' && currentChannelID.set(id)}
>
  <img {src} {alt} {width} {height} class:rounded-3xl={rounded} class="inline aspect-square" />
  {name}
</div>

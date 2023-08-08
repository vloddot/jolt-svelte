<script lang="ts">
  import { channels } from '$lib/stores';

  export let id: string;
  $: channel = $channels?.find((channel) => channel._id === id);
</script>

<slot {channel} />

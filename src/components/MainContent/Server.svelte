<script lang="ts">
  import { servers } from "$lib/stores";

  export let index: number;
  $: server = $servers[index];
</script>


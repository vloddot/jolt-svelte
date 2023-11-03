<script lang="ts">
	import { writable } from 'svelte/store';
	import { selectedChannelIDKey } from './context';
	import { setContext } from '$lib/context';

	const selectedChannelID = writable<string | undefined>();
	setContext(selectedChannelIDKey, selectedChannelID);
</script>

<slot />

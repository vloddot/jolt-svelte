<script lang="ts">
	import { writable } from 'svelte/store';
	import './index.css';
	import { selectedChannelIDKey, selectedServerIDKey } from '@routes/(app)/context';
	import { setContext } from '$lib/context';

	const selectedServerID = writable<string | undefined>();
	const selectedChannelID = writable<string | undefined>();

	setContext(selectedServerIDKey, selectedServerID);
	setContext(selectedChannelIDKey, selectedChannelID);
</script>

<slot />

<script lang="ts">
	import type { Client } from '$lib/client';
	import { getContext } from '$lib/context';
	import type { DisplayedSetting } from '@routes/(app)/settings/sections';
	import { clientKey } from '@routes/context';

	export let setting: Extract<DisplayedSetting, { type: 'text' | 'password' }>;

	export let value = '';

	const client = getContext(clientKey)!;

	function updateDefaultValue(client: Client) {
		setting.getDefaultValue?.(client).then((def) => (value = def));
	}

	client.on('Ready', () => updateDefaultValue(client));
	$: updateDefaultValue(client);
</script>

<input
	id={setting.id}
	class="bg-gray-500 mb-3"
	type={setting.type}
	placeholder={setting.title}
	on:input={(event) =>
		// can't use `bind:value` because then `type` can't be dynamic
		(value = event.currentTarget.value)}
/>

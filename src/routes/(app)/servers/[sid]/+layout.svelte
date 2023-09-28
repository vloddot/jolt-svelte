<script lang="ts">
	import { getContext, setContext } from "$lib/context";
	import { selectedServerIDKey } from "@routes/(app)/context";
	import { writable } from "svelte/store";
	import type { RouteParams } from "./$types";
	import { page } from "$app/stores";
	import { serverKey } from "./context";
	import { clientKey } from "@routes/context";

	const server = writable<Server | undefined>();

	$: pageParams = $page.params as RouteParams;
	setContext(serverKey, server);

	const client = getContext(clientKey)!;

	const selectedServerID = getContext(selectedServerIDKey) ?? writable(pageParams.sid);
	$: selectedServerID.set(pageParams.sid);

	$: if ($selectedServerID) updateServer($selectedServerID);

	async function updateServer(sid: string) {
		server.set(await client.api.fetchServer(sid));
	}
</script>

<slot />

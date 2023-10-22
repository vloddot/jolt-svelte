<script lang="ts">
	import { getContext } from '$lib/context';
	import { clientKey, sessionKey } from '@routes/context';
	import { decodeTime } from 'ulid';
	import dayjs from 'dayjs';
	import calendar from 'dayjs/plugin/calendar';

	dayjs.extend(calendar);

	let sessionToView: SessionInfo;
	export { sessionToView as session };

	const client = getContext(clientKey)!;
	const session = getContext(sessionKey)!;

	$: isThisDevice = sessionToView._id == $session?._id;
</script>

<div class="container" data-this-device={isThisDevice}>
	{#if isThisDevice}
		<p>This Device</p>
	{/if}

	<div class="flex-container">
		<div class="session-info">
			<h3 class="header">{sessionToView.name}</h3>
			<p class="indented">
				Created <time>{dayjs(decodeTime(sessionToView._id)).calendar()}</time>.
			</p>
		</div>

		<div class="flex-divider" />

		<button
			on:click={() => {
				if (isThisDevice) {
					client.destroy();
					session.set(null);
					return;
				}

				client.api.revokeSession(sessionToView._id);
			}}
		>
			Revoke
		</button>
	</div>
</div>

<style lang="scss">
	.container {
		margin: 20px;
		padding-left: 20px;
		padding-right: 10px;
		padding-bottom: 6px;
		padding-top: 6px;

		&[data-this-device='true'] {
			background-color: var(--accent);
		}
	}

	.indented {
		padding-left: 8px;
	}

	.session-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;

		.header {
			margin: 0;
		}
	}
</style>

<script lang="ts">
	import { decodeTime } from 'ulid';
	import dayjs from 'dayjs';
	import calendar from 'dayjs/plugin/calendar';
	import relativeTime from 'dayjs/plugin/relativeTime';

	dayjs.extend(calendar);
	dayjs.extend(relativeTime);

	let sessionToView: SessionInfo;
	export { sessionToView as session };

	export let isThisDevice = false;

	$: timestamp = dayjs(decodeTime(sessionToView._id));
</script>

<div class="container" data-this-device={isThisDevice}>
	{#if isThisDevice}
		<p>This Device</p>
	{/if}

	<div class="flex-container">
		<div class="session-info">
			<h3 class="header">{sessionToView.name}</h3>
			<p class="indented">
				Created <time>{timestamp.calendar()}</time> ({timestamp.fromNow()}).
			</p>
		</div>

		<div class="flex-divider" />

		<button
			on:click
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

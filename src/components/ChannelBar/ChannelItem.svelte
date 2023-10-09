<script lang="ts">
	/**
	 * Channel ID.
	 */
	export let href: string;

	/**
	 * Whether this channel is selected or not.
	 */
	export let selected: boolean;
</script>

<a {href} class="channel-item" data-selected={selected}>
	<slot />
</a>

<style lang="scss">
	.channel-item {
		margin: 4px 8px;
		gap: 8px;
		padding: 0px 8px;
		border-radius: var(--border-radius);
		display: flex;
		align-items: center;
		transition: background-color 150ms;

		&[data-selected='true'],
		&:hover {
			background-color: var(--hover);
		}

		&::before {
			content: ' ';
			position: relative;
			left: 0;
			width: 4px;
			height: 0px;
			border-radius: var(--border-radius);
			background-color: var(--accent);
			transition: height 150ms;
		}

		&:hover::before {
			height: 8px;
		}

		&[data-selected='true']::before {
			height: 16px;
		}
	}
</style>

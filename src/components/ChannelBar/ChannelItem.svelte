<script lang="ts">
	/**
	 * Channel ID.
	 */
	export let href: string;

	/**
	 * Whether this channel is selected or not.
	 */
	export let selected: boolean;

	/**
	 * Whether this channel is unread or not.
	 */
	export let unread = false;
</script>

<a {href} class="channel-item" data-selected={selected} data-unread={unread}>
	<slot />
</a>

<style lang="scss">
	.channel-item {
		margin-top: 4px;
		margin-right: 16px;
		gap: 2px;
		border-top-right-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);
		display: flex;
		align-items: center;
		transition: background-color 150ms;
		min-height: 32px;
		color: inherit;

		:global(img),
		:global(svg) {
			width: 24px;
			height: 24px;
			padding: 4px;
		}

		&[data-selected='true'],
		&:hover,
		&:focus {
			background-color: var(--hover);
		}

		:global(*) {
			color: var(--tertiary-foreground);
		}

		&[data-selected='true'],
		&:hover,
		&:focus {
			:global(*) {
				color: var(--foreground);
			}
		}

		&::before {
			content: ' ';
			position: relative;
			left: 0;
			width: 4px;
			height: 0px;
			border-top-right-radius: var(--border-radius);
			border-bottom-right-radius: var(--border-radius);
			background-color: var(--accent);
			transition: height 150ms;
		}

		&[data-unread='true']::before {
			height: 4px;
		}

		&:hover::before,
		&:focus::before {
			height: 10px;
		}

		&[data-selected='true']::before {
			height: 16px;
		}
	}
</style>

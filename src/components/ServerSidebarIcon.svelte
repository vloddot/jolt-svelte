<script lang="ts">
	import { tippy } from 'svelte-tippy';
	import type { Content } from 'tippy.js';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/animations/scale-subtle.css';

	/**
	 * Path to go to for navigation.
	 */
	export let href: string;

	export let tooltip: Content;

	export let ariaLabel: string | undefined = undefined;

	export let selected: boolean;
</script>

<div class="server-sidebar-icon-base" data-selected={selected} aria-selected={selected}>
	<a
		{href}
		tabindex="0"
		aria-label={typeof tooltip == 'string' && ariaLabel != undefined ? tooltip : ariaLabel}
		class="server-sidebar-icon"
		use:tippy={{
			placement: 'right',
			content: tooltip,
			theme: 'server-sidebar-icon',
			animation: 'scale-subtle',
			duration: 100,
			onShow() {
				if (!tooltip) return false;
			}
		}}
	>
		<slot />
	</a>
</div>

<style lang="scss">
	:global(.tippy-box[data-theme='server-sidebar-icon']) {
		background-color: black;
		padding: 5px;
		border-radius: var(--border-radius);
	}

	:global(.tippy-box[data-theme='server-sidebar-icon'] > .tippy-arrow::before) {
		border-right-color: black;
	}

	.server-sidebar-icon-base {
		position: relative;
		margin: 8px 0;
		justify-content: center;
		align-items: center;
		display: flex;
		width: 100%;

		&::before {
			content: ' ';
			position: absolute;
			left: 0;
			width: 4px;
			height: 0px;
			border-top-right-radius: var(--border-radius);
			border-bottom-right-radius: var(--border-radius);
			background-color: var(--accent);
			transition: height 150ms;
		}

		&:has(.server-sidebar-icon:hover, .server-sidebar-icon:focus)[data-selected='false']::before {
			height: 16px;
		}

		&[data-selected='true']::before {
			height: 48px;
		}

		.server-sidebar-icon {
			background-color: var(--secondary-background);
			border-radius: 100%;
			width: 48px;
			justify-content: center;
			align-items: center;
			display: flex;
			min-height: 48px;
		}

		.server-sidebar-icon,
		:global(img) {
			transition: border-radius 150ms;
		}

		.server-sidebar-icon:hover,
		.server-sidebar-icon:focus,
		.server-sidebar-icon:hover :global(img),
		.server-sidebar-icon:focus :global(img),
		&[data-selected='true'] .server-sidebar-icon,
		&[data-selected='true'] :global(img) {
			border-radius: var(--border-radius);
		}
	}
</style>

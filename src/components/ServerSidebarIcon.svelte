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

	export let unread = false;

	let focused = false;
</script>

<div
	class="server-sidebar-icon-base"
	data-focused={focused}
	data-selected={selected}
	data-unread={unread}
	aria-selected={selected}
>
	<a
		{href}
		on:mouseenter={() => (focused = true)}
		on:mouseleave={() => (focused = false)}
		on:focus={() => (focused = true)}
		on:blur={() => (focused = false)}
		tabindex="0"
		aria-label={typeof tooltip == 'string' && ariaLabel != undefined ? tooltip : ariaLabel}
		class="server-sidebar-icon"
		use:tippy={{
			placement: 'right',
			content: tooltip,
			theme: 'right-tooltip',
			animation: 'scale-subtle',
			duration: 100
		}}
	>
		<slot />
	</a>
</div>

<style lang="scss">
	.server-sidebar-icon-base {
		position: relative;
		margin: 4px 0;
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

		&[data-unread='true']::before {
			height: 8px;
		}

		&[data-focused='true'][data-selected='false']::before {
			height: 16px;
		}

		&[data-selected='true']::before {
			height: 42px;
		}

		.server-sidebar-icon {
			background-color: var(--secondary-background);
			color: inherit;
			border-radius: 100%;
			width: 42px;
			justify-content: center;
			align-items: center;
			display: flex;
			min-height: 42px;
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

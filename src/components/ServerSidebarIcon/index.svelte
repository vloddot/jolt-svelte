<script lang="ts">
	import './index.css';
	import '$lib/index.css';

	/**
	 * Link to go to on press.
	 */
	export let href: string;

	/**
	 * Tooltip for icon.
	 */
	export let tooltip: string;

	/**
	 * Icon to show.
	 */
	export let icon: string | undefined;

	/**
	 * Force to show icon (unless `icon` is `undefined`), ignoring low data mode.
	 */
	export let showIcon: boolean;
</script>

<div class="group m-0">
	<span class="sidebar-tooltip group-hover:scale-100">
		{tooltip}
	</span>
	<a {href} aria-label={tooltip}>
		{#if icon !== undefined && showIcon}
			<img
				class="sidebar-icon group-hover:rounded-xl group-hover:bg-green-600 group-hover:text-white"
				src={icon}
				alt={tooltip}
			/>
		{:else}
			<span
				class="sidebar-icon group-hover:rounded-xl group-hover:bg-green-600 group-hover:text-white"
				>{tooltip
					.split(' ')
					.slice(0, 2)
					.map((s) => s[0])
					.join('')}
			</span>
		{/if}
	</a>
</div>

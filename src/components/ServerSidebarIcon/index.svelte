<script lang="ts">
	import './index.css';
	import '$lib/index.css';

	/**
	 * Path to go to for navigation.
	 */
	export let href: string;

	/**
	 * Tooltip for icon.
	 */
	export let tooltip: string;

	/**
	 * Icon to show.
	 */
	export let icon: string | undefined = undefined;

	$: tooltipAbbreviation = tooltip
		.split(' ')
		.map((s) => s[0])
		.join('');
</script>

<div class="group m-0">
	<span class="sidebar-tooltip group-hover:scale-100">
		{tooltip}
	</span>
	<a {href} aria-label={tooltip}>
		{#if icon == undefined}
			<span
				class="sidebar-icon group-hover:rounded-xl group-hover:bg-blue-500 overflow-ellipsis"
			>
				<!-- abbreviation of the tooltip -->
				{tooltipAbbreviation}
			</span>
		{:else}
			<img
				class="sidebar-icon group-hover:rounded-xl group-hover:bg-blue-500 group-hover:text-white"
				src={icon}
				alt={tooltip}
			/>
		{/if}
	</a>
</div>

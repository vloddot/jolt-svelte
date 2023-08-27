<script lang="ts">
	import { page } from '$app/stores';
	import './index.css';
	interface Section {
		title: string;
		href: string;
	}

	const sections: Section[] = [
		{
			title: 'Text & Images',
			href: '/settings/text'
		}
	];
</script>

<div class="grid-container">
	<div>
		{#each sections as { title, href }}
			<a {href}>
				<div class={href == $page.url.pathname ? 'bg-gray-400' : 'hover:bg-gray-600'}>
					{title}
				</div>
			</a>
		{/each}

		<button on:click={() => history.back()}>Leave</button>
	</div>
	<div>
		<slot />
	</div>
</div>

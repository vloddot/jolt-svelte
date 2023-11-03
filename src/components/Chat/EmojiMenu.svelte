<script lang="ts">
	import { getContext } from '$lib/context';
	import { clientKey } from '@routes/context';
	import { messageInputKey } from '.';

	const client = getContext(clientKey)!;
	const messageInput = getContext(messageInputKey)!;

	let searchInput = '';
	$: searchWordFrequency = calculateWordFrequency(searchInput);

	function calculateWordFrequency(input: string): Record<string, number> {
		const frequencies: Record<string, number> = {};
		for (const c of input) {
			const uppercase = c.toUpperCase();
			if (uppercase in frequencies) {
				frequencies[uppercase]++;
				continue;
			}

			frequencies[uppercase] = 1;
		}

		return frequencies;
	}

	let emojis = Array.from(client.api.cache.emojis.values());

	function calculateScore(name: string) {
		if (searchInput.length == 0) {
			return name.length;
		}

		const wordFrequency = calculateWordFrequency(name);

		let numberOfMatches = 0;
		for (const [c, frequency] of Object.entries(wordFrequency)) {
			const searchFrequency = searchWordFrequency[c];
			if (searchFrequency != undefined) {
				numberOfMatches += Math.min(searchFrequency, frequency);
			}
		}

		return numberOfMatches / name.length;
	}

	$: {
		if (searchInput.length == 0) {
			emojis = Array.from(client.api.cache.emojis.values());
		} else {
			emojis = emojis
				.map((emoji) => [calculateScore(emoji.name), emoji])
				.filter(([score]) => score != 0)
				.sort(([scoreA], [scoreB]) => (scoreA as number) - (scoreB as number))
				.map(([, emoji]) => emoji as Emoji)
				.toReversed();
		}
	}
</script>

<div class="emoji-container">
	<input type="text" placeholder="Search for emojis" bind:value={searchInput} />
	<div>
		{#each emojis as emoji}
			<button on:click={() => messageInput.update((input) => input + `:${emoji._id}:`)}>
				<img
					width="28px"
					height="28px"
					src="https://autumn.revolt.chat/emojis/{emoji._id}"
					alt={emoji.name}
				/>
			</button>
		{/each}
	</div>
</div>

<style lang="scss">
	.emoji-container {
		display: flex;
		flex-direction: column;
		position: absolute;
		right: 10px;
		bottom: 10px;
		width: 370px;
		height: 420px;
		overflow-y: scroll;
		background-color: var(--background);

		input {
			margin: 8px;
		}

		button {
			background-color: transparent;
			border-radius: 0;

			&:hover {
				background-color: var(--hover);
			}
		}
	}
</style>

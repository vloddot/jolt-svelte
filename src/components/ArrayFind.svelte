<script lang="ts">
	type T = $$Generic<unknown>;

	export let array: T[];
	export let predicate: Parameters<T[]['find']>[0];

	$: item = array.find(predicate);
</script>

<slot {item} />

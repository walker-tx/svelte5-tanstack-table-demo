<script lang="ts">
	import type { City } from '$lib/data';
	import type { HeaderContext } from '@tanstack/table-core';

	type $$Props = {
		label: string;
		header: HeaderContext<City, unknown>;
	};

	export let label: $$Props['label'];
	export let header: $$Props['header'];
</script>

<div class="cell-wrapper">
	<span>{label}</span>
	{#if header.column.getCanSort()}
		<button onclick={() => header.column.toggleSorting()}>Sort</button>
	{/if}
</div>

<style>
	.cell-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}
</style>

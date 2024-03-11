<script lang="ts">
	import type { City } from '$lib/data';
	import type { HeaderContext } from '@tanstack/table-core';

	type Props = {
		label: string;
		header: HeaderContext<City, unknown>;
	};

	const { label, header } = $props<Props>();

	function handleSelect(e: Event) {
		const target = e.target as HTMLSelectElement;
		header.column.setFilterValue(target.value);
	}
</script>

<div class="cell-wrapper">
	<span>{label}</span>
	<div class="control-wrapper">
		{#if header.column.getCanSort()}
			<button onclick={() => header.column.toggleSorting()}>
				Sort
				{#if header.column.getIsSorted() === 'asc'}
					&#x25B2;
				{:else if header.column.getIsSorted() === 'desc'}
					&#x25BC;
				{/if}
			</button>
		{/if}
		{#if header.column.getCanFilter()}
			<select value={header.column.getFilterValue()} onchange={handleSelect}>
				<option value={undefined}>All</option>
				{#each header.column.getFacetedUniqueValues() as value}
					<option value={value[0]}>{value[0]} ({value[1]})</option>
				{/each}
			</select>
		{/if}
	</div>
</div>

<style>
	.cell-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}

	.control-wrapper {
		display: flex;
		gap: 0.5rem;
	}
</style>

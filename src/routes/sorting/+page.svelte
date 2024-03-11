<script lang="ts">
	import { makeCityData, type City } from '$lib/data';
	import { createSvelteTable, renderComponent } from '$lib/table';
	import FlexRender from '$lib/table/flex-render.svelte';
	import {
		createColumnHelper,
		getCoreRowModel,
		getFacetedRowModel,
		getFacetedUniqueValues,
		getFilteredRowModel,
		getSortedRowModel,
		type TableOptions
	} from '@tanstack/table-core';
	import SortHeader from './_components/SortHeader.svelte';

	const columnHelper = createColumnHelper<City>();

	const defaultColumns = [
		columnHelper.accessor('name', {
			header: (header) => renderComponent(SortHeader, { label: 'Name', header })
		}),
		columnHelper.accessor('state', {
			header: (header) => renderComponent(SortHeader, { label: 'State', header })
		})
	];

	let data = makeCityData();

	console.log({ data });

	let options: TableOptions<City> = {
		data,
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues()
	};

	let table = createSvelteTable(options);
</script>

<div id="control-bar">
	<strong>Controls:</strong>
	<button onclick={() => table().resetSorting()}>Reset Sorting</button>
	<button onclick={() => table().resetColumnFilters()}>Reset Filters</button>
	<button onclick={() => table().reset()}>Reset All</button>
</div>
<hr />
<div class="table-body">
	{#each table().getHeaderGroups() as headerGroup}
		<div class="table-row">
			{#each headerGroup.headers as header}
				<div class="table-cell">
					<FlexRender content={header.column.columnDef.header} context={header.getContext()} />
				</div>
			{/each}
		</div>
	{/each}
	{#each table().getRowModel().rows as row}
		<div class="table-row">
			{#each row.getAllCells() as cell}
				<div class="table-cell">
					<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
				</div>
			{/each}
		</div>
	{/each}
	{#each table().getFooterGroups() as footerGroup}
		<div class="table-row">
			{#each footerGroup.headers as footer}
				<div class="table-cell">
					<FlexRender content={footer.column.columnDef.footer} context={footer.getContext()} />
				</div>
			{/each}
		</div>
	{/each}
</div>

<style>
	#control-bar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}
</style>

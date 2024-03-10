<script lang="ts">
	import { makeCityData, type City } from '$lib/data';
	import {
		createSvelteTable,
		renderComponent
	} from '$lib/table';
	import FlexRender from '$lib/table/FlexRender.svelte';
	import {
		createColumnHelper,
		getCoreRowModel,
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

	const options: TableOptions<City> = {
		data: makeCityData(),
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel()
	};

	$: table = createSvelteTable(options);
</script>

<div class="table-body">
	{#each $table.getHeaderGroups() as headerGroup}
		<div class="table-row">
			{#each headerGroup.headers as header}
				<div class="table-cell">
					<FlexRender content={header.column.columnDef.header} context={header.getContext()} />
				</div>
			{/each}
		</div>
	{/each}
	{#each $table.getRowModel().rows as row}
		<div class="table-row">
			{#each row.getAllCells() as cell}
				<div class="table-cell">
					<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
				</div>
			{/each}
		</div>
	{/each}
	{#each $table.getFooterGroups() as footerGroup}
		<div class="table-row">
			{#each footerGroup.headers as footer}
				<div class="table-cell">
					<FlexRender content={footer.column.columnDef.footer} context={footer.getContext()} />
				</div>
			{/each}
		</div>
	{/each}
</div>

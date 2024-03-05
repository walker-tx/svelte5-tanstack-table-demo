<script lang="ts">
	import { makeCityData, type City } from '$lib/data';
	import { RenderCell, RenderFooter, RenderHeader, renderComponent } from '$lib/table';
	import {
		createTable,
		getCoreRowModel,
		getSortedRowModel,
		type ColumnDef,
		type TableOptionsResolved
	} from '@tanstack/table-core';
	import { writable } from 'svelte/store';
	import SortHeader from './_components/SortHeader.svelte';

	const cityData = makeCityData();

	const defaultColumns: ColumnDef<City>[] = [
		{
			accessorKey: 'name',
			header: (header) => renderComponent(SortHeader, { label: 'Name', header }),
			cell: (info) => info.getValue()
		},
		{
			accessorKey: 'state',
			header: (header) => renderComponent(SortHeader, { label: 'State', header }),
			cell: (info) => info.getValue()
		}
	];

	const createOptions = () => {
		const store = writable<TableOptionsResolved<City>>({
			data: cityData,
			columns: defaultColumns,
			getCoreRowModel: getCoreRowModel(),
			getSortedRowModel: getSortedRowModel(),
			state: { columnPinning: {}, columnVisibility: {} },
			onSortingChange: (updater) => {
				if (updater instanceof Function) {
					store.update((old) => ({
						...old,
						state: { ...old.state, sorting: updater(old.state?.sorting ?? []) }
					}));
				} else {
					store.update((old) => ({
						...old,
						state: { ...old.state, sorting: updater }
					}));
				}
			},
			onStateChange: () => {},
			renderFallbackValue: null
		});

		return {
			subscribe: store.subscribe
		};
	};

	const options = createOptions();

	$: table = createTable($options);
</script>

<div class="table-body">
	{#each table.getHeaderGroups() as headerGroup}
		<div class="table-row">
			{#each headerGroup.headers as header}
				<div class="table-cell">
					<RenderHeader {header} />
				</div>
			{/each}
		</div>
	{/each}
	{#each table.getRowModel().rows as row}
		<div class="table-row">
			{#each row.getAllCells() as cell}
				<div class="table-cell">
					<RenderCell {cell} />
				</div>
			{/each}
		</div>
	{/each}
	{#each table.getFooterGroups() as footerGroup}
		<div class="table-row">
			{#each footerGroup.headers as footer}
				<div class="table-cell">
					<RenderFooter {footer} />
				</div>
			{/each}
		</div>
	{/each}
</div>

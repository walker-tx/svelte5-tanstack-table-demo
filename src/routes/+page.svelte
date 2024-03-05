<script lang="ts">
	import { makePersonData, type Person } from '$lib/data';
	import { RenderCell, RenderFooter, RenderHeader } from '$lib/table';
	import {
		createTable,
		getCoreRowModel,
		type ColumnDef,
		type TableOptionsResolved
	} from '@tanstack/table-core';

	const defaultColumns: ColumnDef<Person>[] = [
		{
			accessorKey: 'firstName',
			cell: (info) => info.getValue(),
			footer: (info) => info.column.id
		},
		{
			accessorFn: (row) => row.lastName,
			id: 'lastName',
			cell: (info) => info.getValue(),
			header: () => 'Last Name',
			footer: (info) => info.column.id
		},
		{
			accessorKey: 'age',
			header: () => 'Age',
			footer: (info) => info.column.id
		},
		{
			accessorKey: 'visits',
			header: () => 'Visits',
			footer: (info) => info.column.id
		},
		{
			accessorKey: 'status',
			header: 'Status',
			footer: (info) => info.column.id
		},
		{
			accessorKey: 'progress',
			header: 'Profile Progress',
			footer: (info) => info.column.id
		}
	];

	const options: TableOptionsResolved<Person> = {
		data: makePersonData(),
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
		state: { columnPinning: {} },
		onStateChange: () => {},
		renderFallbackValue: null
	};

	const table = createTable(options);
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

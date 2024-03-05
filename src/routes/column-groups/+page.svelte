<script lang="ts">
	import { RenderHeader, RenderCell, RenderFooter } from '$lib/table';
	import {
		createTable,
		getCoreRowModel,
		type ColumnDef,
		type TableOptionsResolved
	} from '@tanstack/table-core';
	import { data, type Person } from '$lib/data';

	const defaultColumns: ColumnDef<Person>[] = [
		{
			header: 'Name',
			footer: (props) => props.column.id,
			columns: [
				{
					accessorKey: 'firstName',
					cell: (info) => info.getValue(),
					footer: (props) => props.column.id
				},
				{
					accessorFn: (row) => row.lastName,
					id: 'lastName',
					cell: (info) => info.getValue(),
					header: () => 'Last Name',
					footer: (props) => props.column.id
				}
			]
		},
		{
			header: 'Info',
			footer: (props) => props.column.id,
			columns: [
				{
					accessorKey: 'age',
					header: () => 'Age',
					footer: (props) => props.column.id
				},
				{
					header: 'More Info',
					columns: [
						{
							accessorKey: 'visits',
							header: () => 'Visits',
							footer: (props) => props.column.id
						},
						{
							accessorKey: 'status',
							header: 'Status',
							footer: (props) => props.column.id
						},
						{
							accessorKey: 'progress',
							header: 'Profile Progress',
							footer: (props) => props.column.id
						}
					]
				}
			]
		}
	];

	const options: TableOptionsResolved<Person> = {
		data,
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

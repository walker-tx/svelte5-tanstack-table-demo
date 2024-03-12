<script lang="ts">
	import { makePersonData, type Person } from '$lib/data';
	import FlexRender from '$lib/table/flex-render.svelte';
	import {
		createTable,
		getCoreRowModel,
		type ColumnDef,
		type TableOptionsResolved
	} from '@tanstack/table-core';

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
		data: makePersonData(),
		columns: defaultColumns,
		getCoreRowModel: getCoreRowModel(),
		state: { columnPinning: {} },
		onStateChange: () => {},
		renderFallbackValue: null
	};

	const table = createTable(options);
</script>

<table>
	<thead>
		{#each table.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th colspan={header.colSpan}>
						{#if !header.isPlaceholder}
							<FlexRender content={header.column.columnDef.header} context={header.getContext()} />
						{/if}
					</th>
				{/each}
			</tr>
		{/each}
	</thead>
	<tbody>
		{#each table.getRowModel().rows as row}
			<tr>
				{#each row.getVisibleCells() as cell}
					<td>
						<FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
	<tfoot>
		{#each table.getFooterGroups() as footerGroup}
			<tr>
				{#each footerGroup.headers as footer}
					<th colspan={footer.colSpan}>
						{#if !footer.isPlaceholder}
							<FlexRender content={footer.column.columnDef.footer} context={footer.getContext()} />
						{/if}
					</th>
				{/each}
			</tr>
		{/each}
	</tfoot>
</table>

<style>
	table {
		width: 100%;
		border: solid 1px gray;
	}

	tr {
		border: solid 1px gray;
	}

	th,
	td {
		border: solid 1px gray;
	}
</style>

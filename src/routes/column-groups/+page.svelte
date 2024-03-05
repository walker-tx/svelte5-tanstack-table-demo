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

<table>
	<thead>
		{#each table.getHeaderGroups() as headerGroup}
			<tr>
				{#each headerGroup.headers as header}
					<th colspan={header.colSpan}>
						{#if !header.isPlaceholder}
							<RenderHeader {header} />
						{/if}
					</th>
				{/each}
			</tr>
		{/each}
	</thead>
	<tbody>
		{#each table.getRowModel().rows as row}
			<tr>
				{#each row.getAllCells() as cell}
					<td>
						<RenderCell {cell} />
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
							<RenderFooter {footer} />
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

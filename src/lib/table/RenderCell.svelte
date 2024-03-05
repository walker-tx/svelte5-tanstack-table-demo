<script lang="ts" generics="TData extends unknown, TValue extends unknown">
	import type { Cell, CellContext } from '@tanstack/table-core';
	import { RenderComponentConfig } from './render-component';

	export let cell: Cell<TData, TValue>;
</script>

{#snippet componentCell(
    renderFn: (ctx: CellContext<TData, TValue>) => unknown, 
    renderCtx: CellContext<TData, TValue>)}
	{@const result = renderFn(renderCtx)}
	{#if result instanceof RenderComponentConfig}
		<svelte:component this={result.component} {...result.props} />
	{:else}
		{result}
	{/if}
{/snippet}

{#if !cell.column.columnDef.cell}
	{cell.getValue()}
{:else if cell.column.columnDef.cell instanceof Function}
	{@render componentCell(cell.column.columnDef.cell, cell.getContext())}
{:else}
	{cell.column.columnDef.cell}
{/if}

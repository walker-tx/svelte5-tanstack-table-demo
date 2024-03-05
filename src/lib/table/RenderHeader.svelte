<script lang="ts" generics="TData extends unknown, TValue extends unknown">
	import type { Header, HeaderContext } from '@tanstack/table-core';
	import { RenderComponentConfig } from './render-component';

	export let header: Header<TData, TValue>;
</script>

{#snippet componentHeader(
    renderFn: (ctx: HeaderContext<TData, TValue>) => unknown, 
    renderCtx: HeaderContext<TData, TValue>)}
	{@const result = renderFn(renderCtx)}
	{#if result instanceof RenderComponentConfig}
		<svelte:component this={result.component} {...result.props} />
	{:else}
		{result}
	{/if}
{/snippet}

{#if !header.column.columnDef.header}
	{header.id}
{:else if header.column.columnDef.header instanceof Function}
	{@render componentHeader(header.column.columnDef.header, header.getContext())}
{:else}
	{header.column.columnDef.header}
{/if}

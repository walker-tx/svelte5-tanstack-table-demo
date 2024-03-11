<script
	lang="ts"
	generics="TData, TValue, TContext extends object = HeaderOrCellContext<TData, TValue>"
>
	import type { ColumnDefTemplate } from '@tanstack/table-core';
	import { RenderComponentConfig } from './render-component';
	import type { HeaderOrCellContext } from './types';

	type Props = {
		content: ColumnDefTemplate<TContext> | undefined;
		context: TContext;
	};

	let { content, context } = $props<Props>();
</script>

{#snippet componentCell()}
	{#if typeof content === 'string'}
		{content}
	{:else if content instanceof Function}
		{@const result = content(context)}
		{#if result instanceof RenderComponentConfig}
			<svelte:component this={result.component} {...result.props} />
		{:else}
			{result}
		{/if}
	{/if}
{/snippet}

{@render componentCell()}

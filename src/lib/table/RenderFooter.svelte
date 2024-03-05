<script lang="ts" generics="TData extends unknown, TValue extends unknown">
	import type { Header } from '@tanstack/table-core';
	import RenderHeader from './RenderHeader.svelte';

	export let footer: Header<TData, TValue>;
</script>

<RenderHeader header={footer} />

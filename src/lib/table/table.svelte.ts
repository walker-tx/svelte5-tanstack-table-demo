import {
	createTable,
	type RowData,
	type TableOptions,
	type TableOptionsResolved,
	type TableState
} from '@tanstack/table-core';

export function createSvelteTable<TData extends RowData>(options: TableOptions<TData>) {
	const resolvedOptions: TableOptionsResolved<TData> = {
		state: {},
		onStateChange() {},
		renderFallbackValue: null,
		...options
	};

	const _table = createTable(resolvedOptions);
	let _state = $state<Partial<TableState>>(_table.initialState);

	const table = $derived.by(() => {
		return createTable({
			...resolvedOptions,
			state: { ..._state },
			onStateChange(updater) {
				if (updater instanceof Function) {
					_state = updater({ ...table.getState(), ..._state });
				} else {
					_state = updater;
				}
				resolvedOptions.onStateChange?.(updater);
			}
		});
	});

	return () => table;
}

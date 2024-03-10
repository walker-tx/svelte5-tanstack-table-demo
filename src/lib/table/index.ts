import {
    createTable,
    type RowData,
    type TableOptions,
    type TableOptionsResolved,
    type TableState
} from '@tanstack/table-core';
import { derived, get, readable, writable, type Readable } from 'svelte/store';

export * from '@tanstack/table-core';
export { default as FlexRender } from './FlexRender.svelte';
export { renderComponent } from './render-component';

export function createSvelteTable<TData extends RowData>(
	options: Readable<TableOptions<TData>> | TableOptions<TData>
) {
	const optionsStore = 'subscribe' in options ? options : readable(options);

	const resolvedOptions: TableOptionsResolved<TData> = {
		state: {},
		onStateChange() {},
		renderFallbackValue: null,
		...get(optionsStore)
	};

	const table = createTable(resolvedOptions);
	const stateStore = writable<TableState>(table.initialState);
	const stateOptionStore = derived([stateStore, optionsStore], (s) => s);

	const tableStore = readable(table, (set) => {
		const unsubscribe = stateOptionStore.subscribe(([state, options]) => {
			table.setOptions((prev) => ({
				...prev,
				...options,
				state: { ...state, ...options.state },
				onStateChange(updater) {
					// Handle internal state change...
					if (updater instanceof Function) {
						stateStore.update(updater);
					} else {
						stateStore.set(updater);
					}

					// ...and user-defined state change
					resolvedOptions.onStateChange?.(updater);
				}
			}));

			set(table);
		});

		return () => unsubscribe();
	});

	return tableStore;
}

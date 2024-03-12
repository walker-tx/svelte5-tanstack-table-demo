/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	createTable,
	type RowData,
	type TableOptions,
	type TableOptionsResolved,
	type TableState
} from '@tanstack/table-core';

export function createSvelteTable<TData extends RowData>(options: TableOptions<TData>) {
	const resolvedOptions: TableOptionsResolved<TData> = mergeObjects(
		{
			state: { columnPinning: {} },
			onStateChange() {},
			renderFallbackValue: null,
			mergeOptions: (
				defaultOptions: TableOptions<TData>,
				options: Partial<TableOptions<TData>>
			) => {
				return mergeObjects(defaultOptions, options);
			}
		},
		options
	);

	const table = createTable(resolvedOptions);
	let tableState = $state<TableState>({ ...table.initialState });

	$effect.pre(() => {
		table.setOptions((prev) => {
			return mergeObjects(prev, options, {
				get state() {
					return tableState;
				},
				onStateChange(updater: any) {
					if (updater instanceof Function) {
						tableState = mergeObjects(tableState, updater(tableState));
					} else {
						tableState = updater;
					}
					resolvedOptions.onStateChange?.(updater);
				}
			});
		});
	});

	return table;
}

/** Merges objects together while keeping their getters alive */
export function mergeObjects<T>(...sources: any[]): T {
	const target = {};
	for (let i = sources.length - 1; i >= 0; i--) {
		if (sources[i]) {
			const descriptors = Object.getOwnPropertyDescriptors(sources[i]);
			for (const key in descriptors) {
				if (key in target) continue;
				// TODO this doesn't handle all edge cases (like getters becoming undefined, and then other getters should kick in)
				Object.defineProperty(target, key, descriptors[key]!);
			}
		}
	}
	return target as T;
}

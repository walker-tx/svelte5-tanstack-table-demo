import type { SvelteComponent, ComponentType, ComponentProps } from 'svelte';

export class RenderComponentConfig<TComponent extends SvelteComponent> {
	constructor(
		public component: ComponentType<TComponent>,
		public props: ComponentProps<TComponent> | Record<string, never> = {}
	) {}
}

export const renderComponent = <TComponent extends SvelteComponent>(
	component: ComponentType<TComponent>,
	props: ComponentProps<TComponent>
) => new RenderComponentConfig(component, props);

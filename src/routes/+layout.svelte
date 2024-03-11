<script lang="ts">
	import { faker } from '@faker-js/faker';
	import '../app.css';

	faker.seed(123);
</script>

<div style="padding:1rem;">
	<h1>TanStack-Table Svelte 5 Adapter Demo</h1>
	<nav>
		<ul class="nav-list">
			<li><a href="/">Basic</a></li>
			<li><a href="/column-groups">Column Groups</a></li>
			<li><a href="/sorting">Sorting</a></li>
		</ul>
	</nav>

	<main>
		<slot />
	</main>
</div>

<style>
	.nav-list {
		list-style: none;
		display: flex;
		gap: 1rem;
		padding-left: 0;
	}
</style>

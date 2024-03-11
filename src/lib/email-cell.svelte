<script lang="ts">
	type Props = {
		email: string;
	};

	const { email } = $props<Props>();
</script>

<a href="mailto:{email}">{email}</a>

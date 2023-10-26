<script lang="ts">
	import { page } from '$app/stores';

	const textMap: { [key: number]: string } = {
		404: 'Looks like the page does not exist!'
	};

	$: errorText = textMap[$page.status] ?? 'Something went wrong!';
</script>

<section class="grow grid place-items-center">
	<div class="text-center">
		<div class="mb-32">
			<h1 class="text-9xl mb-8 text-primary">{$page.status}</h1>
			<p class="text-4xl my-0">{$page.error?.message}</p>
			<p class="mt-2">{errorText}</p>
		</div>

		<a href="/" class="btn btn-primary">Take me home</a>
	</div>
</section>

<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	let { title } = data.meta!;
</script>

<svelte:head>
	<title>RsNano | {title}</title>
</svelte:head>

<section class="hero text-center min-h-[16rem] bg-base-200">
	<div class="hero-content">
		<h1 class="text-4xl font-bold m-0">{title}</h1>
	</div>
</section>
<main class="w-full prose px-8 md:px-16 lg:mx-auto max-w-6xl py-16">
	<svelte:component this={data.component} />
</main>

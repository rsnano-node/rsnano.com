<script lang="ts">
	import { LogoBackground } from '$lib/background';
	import { NavArrowDownIcon } from '@indaco/svelte-iconoir/nav-arrow-down';
	import About from './About.svelte';
	import Community from './Community.svelte';
	import Goals from './Goals.svelte';
	import Status from './Status.svelte';
	import WhyRust from './WhyRust.svelte';
</script>

<svelte:head>
	<title>RsNano</title>
</svelte:head>

<section class="relative h-screen w-full">
	<div class="w-full h-full grid place-items-center">
		<div class="text-center">
			<h1 class="text-9xl mb-0">Rs<span class="text-primary">Nano</span></h1>
			<h2 class="text-4xl mt-8">
				<span>A Rust port of <span class="text-primary">Nano</span></span>
				<br />
				<span> the feeless and digital currency </span>
			</h2>
		</div>
		<a href="#about" class="absolute bottom-8 animate-bounce cursor-pointer">
			<NavArrowDownIcon />
		</a>
	</div>
	<LogoBackground />
</section>
<main class="prose max-w-6xl mx-auto flex flex-col gap-16 py-16">
	<About />
	<WhyRust />
	<Status />
	<Goals />
	<Community />
</main>

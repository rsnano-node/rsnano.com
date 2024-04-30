<script lang="ts">
	import { PartyPopper } from '$lib/Icon';
	import { LogoBackground } from '$lib/background';
	import { currentProgress } from '$lib/utils/progress';
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

{#if currentProgress[1] >= 50 && currentProgress[1] < 60}
	<a href="#status" class="z-30 mt-20 -mb-20 h-0 no-underline">
		<div
			class="bg-info text-info-content px-3 py-2 rounded-none text-center cursor-pointer pointer-events-auto"
		>
			<PartyPopper class="inline" />
			<span>We're half-way there! 50% of the codebase is ported!</span>
			<PartyPopper class="inline" />
		</div>
	</a>
{/if}

<section class="relative h-screen w-full">
	<div class="w-full h-full grid place-items-center">
		<div class="text-center mx-8">
			<h1 class="text-7xl lg:text-9xl mb-0">Rs<span class="text-primary">Nano</span></h1>
			<h2 class="text-2xl lg:text-4xl mt-4 lg:mt-8">
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
<main class="w-full prose px-8 md:px-16 lg:mx-auto max-w-6xl flex flex-col gap-16 py-16">
	<About />
	<WhyRust />
	<Status />
	<Goals />
	<Community />
</main>

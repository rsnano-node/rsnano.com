<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { Footer } from '$lib/Footer';
	import { Navbar } from '$lib/Navbar';
	import { NavDrawer } from '$lib/NavDrawer';
	import { themeData, type Theme } from '$lib/stores';
	import { navDrawer } from '$lib/stores/navDrawer';
	import { onMount } from 'svelte';
	import '../app.postcss';
	import { scrolled } from '$lib/stores/scrolledStore';

	const applyTheme = (theme: Theme | undefined) => {
		if (theme === undefined) {
			delete document.body.dataset['theme'];
			return;
		}
		document.body.dataset['theme'] = theme;
	};

	const prefersDarkTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

	let mainContentElement: HTMLElement;

	onMount(() => {
		const storedTheme = themeData.load();
		themeData.subscribe(applyTheme);

		if (storedTheme !== undefined) {
			themeData.set(storedTheme);
		} else {
			const prefferedTheme = prefersDarkTheme() ? 'dark' : 'light';
			themeData.set(prefferedTheme);
		}
	});

	afterNavigate(() => {
		mainContentElement.scroll({ top: 0 });
	});
</script>

<main
	class="w-full h-full bg-base-100 flex flex-col prose max-w-none overflow-hidden drawer drawer-end"
>
	<input id="nav-drawer" type="checkbox" class="drawer-toggle" bind:checked={$navDrawer.open} />
	<div
		class="grow flex flex-col drawer-content overflow-y-scroll scroll-smooth"
		on:scroll={() => {
			$scrolled = mainContentElement.scrollTop;
		}}
		bind:this={mainContentElement}
	>
		<Navbar />
		<div class="grow isolate flex flex-col">
			<slot />
		</div>
		<Footer />
	</div>
	<div class="drawer-side z-50 lg:hidden">
		<NavDrawer />
	</div>
</main>

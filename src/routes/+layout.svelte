<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { Footer } from '$lib/Footer';
	import { NavDrawer } from '$lib/NavDrawer';
	import { Navbar } from '$lib/Navbar';
	import { consent, navDrawer, scrolled, themeData, type Theme } from '$lib/stores';
	import { onMount } from 'svelte';
	import '../app.postcss';

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

		const storedConsent = consent.load();
		if (storedConsent !== undefined) {
			consent.set(storedConsent);
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

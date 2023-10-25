<script lang="ts">
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { Navbar } from '$lib/Navbar';
	import { Footer } from '$lib/Footer';
	import { themeData, type Theme } from '$lib/stores';
	import '../app.postcss';
	import { onMount, tick } from 'svelte';

	// Fix inconsistent scroll behavior. See https://github.com/sveltejs/kit/pull/8724#issuecomment-1424436745
	let scroll_behaviour: string;

	beforeNavigate(() => {
		scroll_behaviour = getComputedStyle(document.documentElement).scrollBehavior;
		document.documentElement.style.scrollBehavior = 'auto';
	});

	afterNavigate(() => {
		if (scroll_behaviour) {
			document.documentElement.style.scrollBehavior = scroll_behaviour;
		}
	});

	const applyTheme = (theme: Theme | undefined) => {
		if (theme === undefined) {
			delete document.body.dataset['theme'];
			return;
		}
		document.body.dataset['theme'] = theme;
	};

	const prefersDarkTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches;

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
</script>

<main class="w-full h-full min-h-screen flex flex-col prose max-w-none">
	<Navbar />
	<div class="grow">
		<slot />
	</div>
	<Footer />
</main>

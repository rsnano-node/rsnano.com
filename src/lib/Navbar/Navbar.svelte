<script lang="ts">
	import { ExternalLink } from '$lib/ExternalLink';
	import { LogoText } from '$lib/Icon';
	import { ThemeToggle } from '$lib/ThemeToggle';
	import { GitHubIcon } from '@indaco/svelte-iconoir';
	import { onMount } from 'svelte';

	let navbarScrolled = false;

	const updateScrollBar = () => {
		navbarScrolled = window.scrollY > 50;
	};

	onMount(() => {
		updateScrollBar();
	});
</script>

<svelte:window on:scroll={updateScrollBar} />

<div
	class="fixed navbar transition-all duration-300 z-40 p-4"
	class:navbar-scrolled={navbarScrolled}
>
	<div class="navbar-start">
		<a href="/" class="btn btn-ghost">
			<LogoText class="h-6" />
		</a>
	</div>
	<div class="navbar-end gap-2">
		<a href="/blog" class="btn btn-ghost font-medium">Blog</a>

		<ThemeToggle />
		<ExternalLink href="https://github.com/simpago/rsnano-node" class="btn btn-ghost btn-square">
			<GitHubIcon />
		</ExternalLink>
	</div>
</div>

<style lang="postcss">
	.navbar-scrolled {
		@apply bg-base-100 bg-opacity-95 backdrop-blur shadow-sm;
	}
</style>

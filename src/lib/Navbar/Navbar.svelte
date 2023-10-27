<script lang="ts">
	import { LogoText } from '$lib/Icon';
	import { Link, links } from '$lib/Link';
	import { ThemeToggle } from '$lib/ThemeToggle';
	import { scrolled } from '$lib/stores/scrolledStore';
	import { GitHubIcon, MenuIcon } from '@indaco/svelte-iconoir';
	import { derived } from 'svelte/store';

	$: navbarScrolled = derived(scrolled, (scrollY) => scrollY > 50);
</script>

<div
	class="fixed navbar transition-all duration-300 z-40 p-4"
	class:navbar-scrolled={$navbarScrolled}
>
	<div class="navbar-start gap-2">
		<Link data={links.home} class="inline-flex btn btn-ghost normal-case text-xl">
			<LogoText class="h-6" />
		</Link>
	</div>
	<div class="navbar-end gap-2">
		<Link
			data={links.blog}
			class="inline-flex btn btn-ghost font-medium max-lg:hidden no-underline"
		/>
		<Link
			data={{ ...links.github, icon: undefined }}
			class="inline-flex btn btn-ghost btn-square max-lg:hidden"
		>
			<GitHubIcon />
		</Link>
		<ThemeToggle class="max-lg:hidden" />
		<div class="dropdown lg:hidden">
			<label for="nav-drawer" class="drawer-button btn btn-ghost btn-square">
				<MenuIcon />
			</label>
		</div>
	</div>
</div>

<style lang="postcss">
	.navbar-scrolled {
		@apply bg-base-100 bg-opacity-95 backdrop-blur shadow-sm;
	}
</style>

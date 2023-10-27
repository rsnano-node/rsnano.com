<script lang="ts">
	import { themeData } from '$lib/stores';
	import { HalfMoonIcon, SunLightIcon } from '@indaco/svelte-iconoir';
	import { twMerge } from 'tailwind-merge';

	let className: string | undefined = undefined;

	export { className as class };

	const toggleTheme = () => {
		themeData.update((theme) => {
			return theme === 'dark' ? 'light' : 'dark';
		});
	};
</script>

<button class={twMerge('btn btn-ghost btn-square', className)} on:click={toggleTheme}>
	{#if $themeData === 'dark'}
		<SunLightIcon />
	{:else}
		<HalfMoonIcon />
	{/if}
</button>

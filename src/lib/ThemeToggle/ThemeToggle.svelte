<script lang="ts">
	import { themeData } from '$lib/stores';
	import { HalfMoonIcon, SunLightIcon } from '@indaco/svelte-iconoir';

	const toggleTheme = () => {
		themeData.update((theme) => {
			return theme === 'dark' ? 'light' : 'dark';
		});
	};
</script>

<button class="btn btn-ghost btn-square" on:click={toggleTheme}>
	{#if $themeData === 'dark'}
		<SunLightIcon />
	{:else}
		<HalfMoonIcon />
	{/if}
</button>

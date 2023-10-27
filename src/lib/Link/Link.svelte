<script lang="ts">
	import type { LinkData } from '$lib/Link/links';
	import { OpenNewWindowIcon } from '@indaco/svelte-iconoir';
	import { twMerge } from 'tailwind-merge';

	export let data: LinkData;
	export let showIcon = false;
	export let showExternalIcon = false;
	export let linkHover = false;

	let className: string | undefined = undefined;

	export { className as class };
</script>

<span class="inline-flex">
	<a
		href={data.href}
		target={data.external ? '_blank' : '_self'}
		class={twMerge(
			'link peer inline-flex items-center gap-2',
			linkHover && 'link-hover',
			className
		)}
	>
		{#if showIcon}
			<svelte:component this={data.icon} class="w-4 h-4" />
		{/if}
		{#if !$$slots.default}
			{data.title}
		{:else}
			<slot />
		{/if}
	</a>
	{#if data.external && showExternalIcon}
		<OpenNewWindowIcon
			class="inline ml-1 w-3 h-auto transition-opacity opacity-0 peer-hover:opacity-100"
		/>
	{/if}
</span>

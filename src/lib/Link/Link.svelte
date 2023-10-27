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

<span>
	<a
		href={data.href}
		target={data.external ? '_blank' : '_self'}
		class={twMerge('link peer inline align-middle', linkHover && 'link-hover', className)}
	>
		{#if showIcon}
			<svelte:component this={data.icon} class="w-4 h-4 inline mr-2" />{/if}{#if !$$slots.default}
			<span>{data.title}</span>
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

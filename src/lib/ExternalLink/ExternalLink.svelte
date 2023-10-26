<script lang="ts">
	import { OpenNewWindowIcon } from '@indaco/svelte-iconoir';
	import { twMerge } from 'tailwind-merge';

	export let href: string;

	let className: string | undefined = undefined;

	export { className as class };
</script>

<span class="inline-flex">
	<a {href} target="_blank" class={twMerge('link link-hover peer', className)}>
		<slot />
	</a>
	<OpenNewWindowIcon
		class="inline ml-1 w-3 h-auto transition-opacity opacity-0 peer-hover:opacity-100"
	/>
</span>

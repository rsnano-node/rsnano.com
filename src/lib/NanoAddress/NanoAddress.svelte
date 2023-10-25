<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	let className: string | undefined = undefined;

	export { className as class };
	export let address: string;

	const PREFIX_LENGTH = 12;
	const SUFFIX_LENGTH = 6;

	$: prefix = address.substring(0, PREFIX_LENGTH);
	$: main = address.substring(PREFIX_LENGTH, address.length - SUFFIX_LENGTH);
	$: suffix = address.substring(address.length - SUFFIX_LENGTH);
</script>

<span class={twMerge('inline-flex font-medium', className)}>
	<span class="text-nano-blue">{prefix}</span>
	{main}
	<span class="text-nano-blue">{suffix}</span>
</span>

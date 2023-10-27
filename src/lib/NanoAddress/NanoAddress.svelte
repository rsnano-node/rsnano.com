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

<p
	class={twMerge(
		'inline [overflow-wrap:anywhere] font-medium m-0 [text-decoration:inherit]',
		className
	)}
>
	<span class="text-primary mx-0">{prefix}</span><span>{main}</span><span class="text-primary mx-0"
		>{suffix}</span
	>
</p>

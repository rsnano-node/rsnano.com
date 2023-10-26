<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let exampleText: HTMLElement, textBounds: DOMRect;

	let textCountX: number, textCountY: number;
	let marginMaxArray: number[] = [],
		marginMinArray: number[] = [];

	let mounted = false;

	onMount(() => {
		textBounds = exampleText.getBoundingClientRect();
		calculateTextCount();
		mounted = true;

		setTimeout(() => {
			marginArray = marginMaxArray;
		});
	});

	function calculateTextCount() {
		console.log(window.outerHeight, window.outerWidth);
		textCountX = Math.ceil(window.outerWidth / textBounds.width) * 2;
		textCountY = Math.ceil(window.outerHeight / textBounds.height) * 2;

		// generate max offset between + or - 100 and 50px
		marginMaxArray = Array.from({ length: textCountY }, (_, k) => {
			let sign = k % 2 === 0 ? 1 : -1;

			// prevent text blocks being "stacked" upon each other
			let textOffset = textBounds.width * 0.5 * ((k % 2) + 1);

			// calulates how many text
			let textCount = Math.ceil(Math.random() * 3) * textBounds.width;

			return sign * textOffset + textCount;
		});

		marginMinArray = Array(textCountY).fill(0);
	}

	let marginArray = marginMinArray;
</script>

<svelte:window on:resize={calculateTextCount} />

<span id="rsnano-blog-bg" class="fixed invisible rsnano-text" bind:this={exampleText}>RsNano</span>

<div class="shadow-mask" />
<div
	class="absolute inset-0 overflow-hidden grid place-items-center select-none -z-[1]"
	role="presentation"
>
	{#if mounted}
		<div class="absolute -rotate-[22.5deg]" transition:fade>
			{#each Array(textCountY) as _, i}
				<div class="flex transition-all duration-1000" style:margin-left={`${marginArray[i]}px`}>
					{#each Array(textCountX) as _}
						<span id="rsnano-blog-bg" class="rsnano-text">RsNano</span>
					{/each}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.rsnano-text {
		@apply text-9xl text-primary opacity-10 font-extrabold mx-4 my-2;
	}

	.shadow-mask {
		@apply absolute inset-0 w-full h-full;

		background: radial-gradient(circle, hsl(var(--b1) / 0%) 70%, hsl(var(--b1) / 100%) 90%);
	}
</style>

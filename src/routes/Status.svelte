<script lang="ts">
	import { Section } from '$lib/Section';
	import { StatusGraph } from '$lib/Status';
	import { currentProgress } from '$lib/utils/progress';
	import 'chartjs-adapter-date-fns';
</script>

<Section id="status" title="Current Status">
	<p>Visit the <a href="/blog">dev blog</a> for the latest progress report.</p>
	<p>We keep track of how much C++ code is already translated:</p>
	<div class="w-full max-h-96 flex gap-16 items-center">
		<div class="basis-0 relative text-center shrink">
			<h1 class="my-0 whitespace-nowrap">
				<span class="text-6xl text-primary">{currentProgress[1]}</span><span class="text-3xl"
					>%</span
				>
			</h1>
			<p class="w-full mt-2">of the codebase is currently written in Rust.</p>
		</div>
		<div class="grow mt-16">
			<StatusGraph />
		</div>
	</div>
</Section>

<script lang="ts">
	import { Link, links } from '$lib/Link';
	import { Section } from '$lib/Section';
	import { StatusGraph } from '$lib/Status';
	import { currentProgress } from '$lib/utils/progress';
	import 'chartjs-adapter-date-fns';
</script>

<Section id="status" title="Current Status">
	<p>Visit the <Link data={links.blog}>dev blog</Link> for the latest progress report.</p>
	<p>We keep track of how much C++ code is already translated:</p>
	<div class="w-full gridish lg:flex-nowrap max-lg:gap-0 pt-8">
		<div class="basis-1/4 text-center shrink">
			<h2 class="my-0 whitespace-nowrap">
				<span class="text-6xl text-primary">{currentProgress[1]}</span><span class="text-3xl"
					>%</span
				>
			</h2>
			<p class="w-full mt-2">of the codebase is currently written in Rust.</p>
		</div>
		<StatusGraph class="grow" />
	</div>
</Section>

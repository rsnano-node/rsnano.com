<script>
	import { Card } from '$lib/Card';
	import { RustIcon } from '$lib/Icon';
	import Section from '$lib/Section/Section.svelte';
	import { AppleShortcutsIcon, TestTubeIcon } from '@indaco/svelte-iconoir';
</script>

<Section id="goals" title="Goals">
	<div class="gridish gridish-3 [&>*]:min-w-[16rem]">
		<Card title="100% Rust">
			<RustIcon slot="icon" class="w-32 h-32" />
			<p>
				Currently, about 40% of the code base is ported. Our goal is to port 100% of the C++ code to
				Rust.
			</p>
		</Card>
		<Card title="Well tested">
			<TestTubeIcon slot="icon" size="8rem" stroke-width="2" />
			<p>
				We want to expand the test suite, make it faster and completely stable. This will enable us
				to catch bugs early and improve stability of the Nano Network.
			</p>
		</Card>
		<Card title="Architecture">
			<AppleShortcutsIcon slot="icon" size="8rem" stroke-width="2" />
			<p>
				We want to improve the Software Architecture and align it with modern Rust standards. This
				will enable us to add improvements more easily.
			</p>
		</Card>
	</div>
</Section>

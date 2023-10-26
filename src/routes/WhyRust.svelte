<script lang="ts">
	import { Card } from '$lib/Card';
	import { FlashIcon } from '@indaco/svelte-iconoir/flash';
	import { StatUpIcon } from '@indaco/svelte-iconoir/stat-up';
	import { TowerCheckIcon } from '@indaco/svelte-iconoir/tower-check';

	import { Section } from '$lib/Section';
</script>

<Section id="why-rust" title="Why Rust?">
	<div class="grid grid-cols-3 gap-16">
		<Card title="Performance">
			<FlashIcon slot="icon" size={120} stroke-width={2} />
			<p>
				Rust is blazingly fast and offers comparable performance to C++ with no runtime or garbage
				collection.
			</p>
			<p>This helps the Nano network continue to confirm transactions in well under 1 second.</p>
		</Card>
		<Card title="Reliability">
			<TowerCheckIcon slot="icon" size={120} stroke-width={2} />
			<p>
				Rust guarantees memory-safety and thread safety. Many bugs are eliminated at compile time,
				like buffer overflows or race conditions.
			</p>
			<p>This makes the Nano network more secure and prevents exploits from bad actors.</p>
		</Card>
		<Card title="Productivity">
			<StatUpIcon slot="icon" size={120} stroke-width={2} />
			<p>
				Because of Rusts great documentation, helpful compiler, and constantly growing eco-system,
				refactoring and contributing to RsNano is easy.
			</p>
			<p>This enables continous and faster improvement of the Nano network.</p>
		</Card>
	</div>
</Section>

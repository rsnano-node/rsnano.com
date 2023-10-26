<script lang="ts">
	import { Section } from '$lib/Section';
</script>

<Section id="about" title="About">
	<p class="font-bold">RsNano is a Rust port of the original nano-node.</p>
	<p>
		The original nano-node is written in C++. C++ is a very powerful language, but it makes it easy
		to introduce potentially exploitable bugs, like buffer overflows, dangling pointers, race
		conditions or integer overflows.
	</p>
	<p>
		Rust, on the other hand, offers similar performance characteristics as C++, but guarantees
		memory safety and thread safety at compile time.
	</p>
</Section>

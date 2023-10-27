<script lang="ts">
	export let id: string;
	export let title: string;
</script>

<section {id} class="scroll-m-24">
	<h1 class="relative">
		<a href="#{id}" class="group no-underline relative [font-weight:inherit]">
			<span
				class="absolute -ml-14 -top-0.5 btn btn-ghost btn-square bg-transparent opacity-0 group-hover:opacity-100 [font-size:inherit] max-lg:hidden"
				>#</span
			>
			<span class="no-underline">{title}</span>
		</a>
	</h1>
	<slot />
</section>

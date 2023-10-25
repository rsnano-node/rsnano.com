<script lang="ts">
	export let id: string;
	export let title: string;
</script>

<section {id} class="scroll-m-24">
	<h1>{title}</h1>
	<slot />
</section>

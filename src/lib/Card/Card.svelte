<script lang="ts">
	export let title: string;
</script>

<div class="card items-center text-center">
	<slot name="icon" />
	<h3 class="text-primary font-bold text-3xl">{title}</h3>
	<slot />
</div>

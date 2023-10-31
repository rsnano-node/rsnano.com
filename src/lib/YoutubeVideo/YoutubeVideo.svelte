<script lang="ts">
	export let src: string;
</script>

<div class="mx-auto w-full lg:w-1/2 aspect-video">
	<iframe
		class="w-full h-full"
		{src}
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen={true}
	/>
</div>

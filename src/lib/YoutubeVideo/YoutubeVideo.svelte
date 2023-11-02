<script lang="ts">
	import { Link, links } from '$lib/Link';
	import { consent } from '$lib/stores';

	export let src: string;
</script>

<div class="mx-auto w-full lg:w-1/2 aspect-video">
	{#if $consent.youtube}
		<iframe
			class="w-full h-full"
			{src}
			title="YouTube video player"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen={true}
		/>
	{:else}
		<div class="card w-full h-full bg-base-200">
			<div class="card-body max-h-full max-lg:p-6">
				<h2 class="card-title my-0">YouTube blocked due to privacy settings</h2>
				<div class="grow overflow-y-auto min-h-12">
					<p class="text-sm">Please accept YouTube cookies to play this video.</p>
					<p class="text-sm">
						By accepting you will be accessing content from YouTube, a service provided by an
						external third party.
					</p>
					<p class="text-sm">
						<Link data={links.youtubePrivacy} showExternalIcon />
					</p>
				</div>
				<div class="card-actions justify-center">
					<button class="btn btn-primary max-w-full" on:click={() => ($consent.youtube = true)}>
						Accept required services and load content
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>

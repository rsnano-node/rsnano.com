<script lang="ts">
	import { BlogBackground, BlogPostPlaceholderBackground } from '$lib/background';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>RsNano | Blog</title>
</svelte:head>
<section class="relative h-screen w-full">
	<div class="w-full h-full grid place-items-center">
		<div class="text-center">
			<h1 class="text-9xl mb-0">Rs<span class="text-nano-blue">Nano</span> Blog</h1>
			<h2 class="text-4xl mt-8">Latest Development Updates</h2>
		</div>
	</div>
	<BlogBackground />
</section>
<main class="prose max-w-4xl mx-auto py-16">
	<h1 class="w-full">Recent posts</h1>
	{#each data.posts as post}
		<a
			class="card mx-auto flex flex-row hover:bg-base-200 transition-colors no-underline mt-8"
			href="/blog/post/{post.slug}"
		>
			<figure class="w-1/3 aspect-video m-6 p-6">
				<BlogPostPlaceholderBackground />
			</figure>
			<div class="card-body w-2/3 py-0">
				<h2 id="blog-{post.slug}" class="card-title flex-col items-start">
					<span class="text-xs opacity-60">
						{post.meta.date.toLocaleDateString()}
					</span>
					{post.meta.title}
				</h2>
				<p>
					{post.summary}
				</p>
			</div>
		</a>
	{/each}
</main>

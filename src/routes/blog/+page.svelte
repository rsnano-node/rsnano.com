<script lang="ts">
	import { BlogBackground, BlogPostPlaceholderBackground } from '$lib/background';
	import { format } from 'date-fns';
	import type { PageData } from './$types';
	import Section from '$lib/Section/Section.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>RsNano | Blog</title>
</svelte:head>
<section class="relative h-screen w-full">
	<div class="w-full h-full grid place-items-center">
		<div class="text-center mx-8">
			<h1 class="text-7xl lg:text-9xl mb-0">Rs<span class="text-primary">Nano</span> Blog</h1>
			<h2 class="text-2xl lg:text-4xl mt-4 lg:mt-8">Latest Development Updates</h2>
		</div>
	</div>
	<BlogBackground />
</section>
<main class="w-full prose px-8 md:px-16 lg:mx-auto max-w-6xl flex flex-col gap-16 py-16">
	<Section id="recent-posts" title="Recent posts">
		{#each data.posts as post}
			<a
				class="card mx-auto flex items-center lg:flex-row hover:bg-base-200 transition-colors no-underline mt-8"
				href="/blog/post/{post.slug}"
			>
				<figure class="w-full md:w-2/3 lg:w-1/3 aspect-video m-2 lg:m-6 p-6">
					<BlogPostPlaceholderBackground />
				</figure>
				<div class="card-body lg:w-2/3 py-0">
					<h2 id="blog-{post.slug}" class="card-title text-2xl my-2 flex-col items-start">
						<span class="text-xs opacity-60">
							{format(post.meta.date, 'yyyy-MM-dd')}
						</span>
						{post.meta.title}
					</h2>
					<p>
						{post.meta.summary}
					</p>
				</div>
			</a>
		{/each}
	</Section>
</main>

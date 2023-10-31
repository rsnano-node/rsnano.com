import { loadAllBlogPosts } from '$lib/utils/blog';
import type { PageLoad } from './$types';
import type { EntryGenerator } from './post/[slug]/$types';

export const prerender = true;

export const load: PageLoad = async () => {
	const posts = await loadAllBlogPosts();

	return { posts };
};

export const entries: EntryGenerator = async () => {
	const posts = await loadAllBlogPosts();

	return posts.map((post) => ({ slug: post.slug }));
};

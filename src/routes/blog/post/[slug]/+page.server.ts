import { loadBlogPost } from '$lib/utils/blog';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
	const blogPost = await loadBlogPost(params.slug);

	if (blogPost === undefined) {
		throw error(404);
	}

	return blogPost;
};

import { loadBlogPost } from '$lib/utils/blog';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ params }) => {
	const blogPost = await loadBlogPost(params.slug);

	if (blogPost === undefined)
		return {
			status: 404
		};

	return blogPost;
};

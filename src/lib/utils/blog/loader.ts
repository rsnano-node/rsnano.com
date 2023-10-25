import { Metadata, type BlogPost } from './types';
import { parser } from './parser';
import fs from 'fs';
import * as path from 'path';
import { BLOG_POST_FILE_EXTENSION, BLOG_POST_PATH } from './index';

export const loadAllBlogPosts = async (): Promise<BlogPost[]> => {
	const allPosts: BlogPost[] = [];

	const files = fs.readdirSync(BLOG_POST_PATH);
	const blogPostFileNames = files.filter((file) => file.endsWith(BLOG_POST_FILE_EXTENSION));

	for (const file of blogPostFileNames) {
		const data = await loadBlogPostFile(file);

		if (data === undefined) {
			console.error(`Failed to load post data for ${file}!`);
			continue;
		}

		allPosts.push(data);
	}

	return allPosts;
};

const loadBlogPostFile = async (file: string): Promise<BlogPost | undefined> => {
	const slug = file.substring(0, file.length - BLOG_POST_FILE_EXTENSION.length);
	const content = fs.readFileSync(path.join(BLOG_POST_PATH, file));

	console.debug(`Parsing blog post <${slug}>`);
	const res = await parser.process(content);

	const summary = res.data.summary as string;

	console.debug(`Parsing metadata`);
	const meta = Metadata.parse(res.data.matter);

	return {
		slug,
		meta,
		html: res.value.toString(),
		summary
	};
};

export const loadBlogPost = async (slug: string): Promise<BlogPost | undefined> => {
	const file = slug + BLOG_POST_FILE_EXTENSION;
	return loadBlogPostFile(file);
};

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

	// sort blog post by date
	allPosts.sort((a, b) => b.meta.date.getTime() - a.meta.date.getTime());

	return allPosts;
};

const loadBlogPostFile = async (file: string): Promise<BlogPost | undefined> => {
	const slug = path.basename(path.normalize(file), BLOG_POST_FILE_EXTENSION);
	const filePath = path.join(BLOG_POST_PATH, file);

	if (!fs.existsSync(filePath)) {
		return undefined;
	}

	if (!filePath.startsWith(BLOG_POST_PATH)) {
		console.warn(`User tried to access invalid path <${filePath}>`);
		return undefined;
	}

	const content = fs.readFileSync(filePath);

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

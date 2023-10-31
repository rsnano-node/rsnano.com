import { Metadata, type BlogPost, type MdsvexImport } from './types';

type ModuleResolver = () => Promise<MdsvexImport>;

const loadAllBlogPostModules = (): [slug: string, resolver: ModuleResolver][] => {
	const modules = import.meta.glob('../../../../blog/posts/*.{md,svx}');

	return Object.entries(modules).map(([file, resolver]) => {
		const slug = file.replace(/^\/?(.+\/)*(.+)\.(.+)$/, '$2');
		return [slug, resolver as ModuleResolver];
	});
};

const callBlogPostResolver = async (
	slug: string,
	resolver: ModuleResolver
): Promise<BlogPost | undefined> => {
	try {
		const module = await resolver();

		const meta = Metadata.parse(module.metadata);

		return {
			component: module.default,
			meta,
			slug
		};
	} catch (e) {
		console.error(`Failed to load post data <${slug}>!`, e);
		return undefined;
	}
};

export const loadAllBlogPosts = async (): Promise<BlogPost[]> => {
	const allPosts: BlogPost[] = [];

	const modules = loadAllBlogPostModules();

	for (const module of modules) {
		const data = await callBlogPostResolver(...module);

		if (data !== undefined) {
			allPosts.push(data);
		}
	}

	// sort blog post by date
	allPosts.sort((a, b) => b.meta.date.getTime() - a.meta.date.getTime());

	return allPosts;
};

export const loadBlogPost = async (slug: string): Promise<BlogPost | undefined> => {
	const modules = loadAllBlogPostModules();

	const blogModule = modules.find(([moduleSlug]) => moduleSlug === slug);

	if (blogModule === undefined) {
		console.warn(`User tried to access invalid blog entry <${slug}>`);
		return undefined;
	}

	return await callBlogPostResolver(...blogModule);
};

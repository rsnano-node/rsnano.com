import z from 'zod';

export const Metadata = z.object({
	title: z.string(),
	date: z.coerce.date(),
	draft: z.boolean().optional()
});

export type Metadata = z.infer<typeof Metadata>;

export type BlogPost = {
	slug: string;
	meta: Metadata;
	html: string;
	summary: string;
};

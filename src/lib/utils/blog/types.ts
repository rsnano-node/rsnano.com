import type { SvelteComponent } from 'svelte';
import z from 'zod';

export const Metadata = z.object({
	title: z.string(),
	date: z.coerce.date(),
	draft: z.boolean().optional(),
	summary: z.string({ required_error: 'Text summary generation failed!' })
});

export type Metadata = z.infer<typeof Metadata>;

export type BlogPost = {
	component: ConstructorOfATypedSvelteComponent;
	meta: Metadata;
	slug: string;
};

export type MdsvexImport = {
	default: SvelteComponent;
	metadata: Record<string, string>;
};

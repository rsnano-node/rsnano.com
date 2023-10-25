import { remarkFrontMatterYaml, remarkSummarizer } from './remarkPlugin';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

export const parser = unified()
	.use(remarkParse)
	.use(remarkRehype)
	.use(rehypeStringify)
	.use(remarkFrontmatter, ['yaml'])
	.use(remarkFrontMatterYaml)
	.use(remarkSummarizer);

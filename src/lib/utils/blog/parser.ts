import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { remarkFrontMatterYaml, remarkSummarizer } from './remarkPlugin';

export const parser = unified()
	.use(remarkParse)
	.use(remarkRehype, {
		allowDangerousHtml: true
	})
	.use(rehypeRaw)
	.use(rehypeStringify)
	.use(remarkFrontmatter, ['yaml'])
	.use(remarkFrontMatterYaml)
	.use(remarkSummarizer);

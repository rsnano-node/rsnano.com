import type { Text } from 'mdast';
import type { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { matter } from 'vfile-matter';

export const remarkFrontMatterYaml = (): Transformer => {
	return (_, file) => {
		matter(file);
	};
};

export const remarkSummarizer = (): Transformer => {
	return (tree, file) => {
		let summary = '';

		visit(tree, 'text', (node: Text) => {
			const text = node.value;

			if (summary.length < 100) {
				summary += ' ' + text;
			}
		});

		file.data['summary'] = summary;
	};
};

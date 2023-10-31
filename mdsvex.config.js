import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import { visit } from 'unist-util-visit';

const config = defineConfig({
	extensions: ['.svelte.md', '.md', '.svx'],

	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [
		() => {
			return (tree, file) => {
				let summary = [];
				let summaryLength = 0;

				visit(tree, 'text', (node) => {
					if (summaryLength >= 100) {
						return;
					}

					const remainingLength = 100 - summaryLength;

					let text = node.value.trim();

					// new text would surpass summaryLength
					if (text.length > remainingLength) {
						// check for next ' ' after remainingLength
						const index = text.indexOf(' ', remainingLength);
						if (index > 0) {
							text = text.substring(0, index);
						}
					}

					summaryLength += text.length;
					summary.push(text);
				});

				// add summary to frontmatter data
				if (!file.data.fm) {
					file.data.fm = {};
				}
				file.data.fm.summary = summary.join(' ');
			};
		}
	],
	rehypePlugins: []
});

export default config;

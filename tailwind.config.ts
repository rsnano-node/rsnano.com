import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import themes from 'daisyui/src/theming/themes';

/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif']
			}
		}
	},
	daisyui: {
		themes: [
			{
				light: {
					...themes['[data-theme=light]'],
					'primary': '#209CE9',
					'base-100': '#f4fafe',
					'base-200': '#eff4f7',
					'base-300': '#dee8ef',
					'info': '#1e7db8',
					// Prism theme adapted from: https://github.com/PrismJS/prism-themes/blob/master/themes/prism-material-light.css
					'--prism-bc': '#90a4ae',
					'--prism-bg': '#eff4f7',
					'--prism-selection-bg': '#cceae7',
					'--prism-selection-bc': '#263238',
					'--prism-css-bc': '#f76d47',
					'--prism-tkn-atrule': '#7c4dff',
					'--prism-tkn-attr-name': '#39adb5',
					'--prism-tkn-attr-value': '#f6a434',
					'--prism-tkn-attribute': '#f6a434',
					'--prism-tkn-boolean': '#7c4dff',
					'--prism-tkn-builtin': '#39adb5',
					'--prism-tkn-cdata': '#39adb5',
					'--prism-tkn-char': '#39adb5',
					'--prism-tkn-class': '#39adb5',
					'--prism-tkn-class-name': '#6182b8',
					'--prism-tkn-color': '#90a4ae',
					'--prism-tkn-comment': '#aabfc9',
					'--prism-tkn-constant': '#7c4dff',
					'--prism-tkn-deleted': '#e53935',
					'--prism-tkn-doctype': '#aabfc9',
					'--prism-tkn-entity': '#e53935',
					'--prism-tkn-function': '#7c4dff',
					'--prism-tkn-hexcode': '#f76d47',
					'--prism-tkn-id': '#7c4dff',
					'--prism-tkn-important': '#7c4dff',
					'--prism-tkn-inserted': '#39adb5',
					'--prism-tkn-keyword': '#7c4dff',
					'--prism-tkn-number': '#f76d47',
					'--prism-tkn-operator': '#39adb5',
					'--prism-tkn-prolog': '#aabfc9',
					'--prism-tkn-property': '#39adb5',
					'--prism-tkn-pseudo-class': '#f6a434',
					'--prism-tkn-pseudo-element': '#f6a434',
					'--prism-tkn-punctuation': '#39adb5',
					'--prism-tkn-regex': '#6182b8',
					'--prism-tkn-selector': '#e53935',
					'--prism-tkn-string': '#f6a434',
					'--prism-tkn-symbol': '#7c4dff',
					'--prism-tkn-tag': '#e53935',
					'--prism-tkn-unit': '#f76d47',
					'--prism-tkn-url': '#e53935',
					'--prism-tkn-variable': '#e53935'
				},
				dark: {
					...themes['[data-theme=dark]'],
					'primary': '#209CE9',
					'base-100': '#051723',
					'base-200': '#031017',
					'base-300': '#02080c',
					'info': '#0A4366',
					// Prism theme adapted from: https://github.com/PrismJS/prism-themes/blob/master/themes/prism-material-oceanic.css
					'--prism-bc': '#c3cee3',
					'--prism-bg': '#031017',
					'--prism-selection-bg': '#363636',
					'--prism-selection-bc': '#c3cee3',
					'--prism-css-bc': '#fd9170',
					'--prism-tkn-atrule': '#c792ea',
					'--prism-tkn-attr-name': '#ffcb6b',
					'--prism-tkn-attr-value': '#c3e88d',
					'--prism-tkn-attribute': '#c3e88d',
					'--prism-tkn-boolean': '#c792ea',
					'--prism-tkn-builtin': '#ffcb6b',
					'--prism-tkn-cdata': '#80cbc4',
					'--prism-tkn-char': '#80cbc4',
					'--prism-tkn-class': '#ffcb6b',
					'--prism-tkn-class-name': '#f2ff00',
					'--prism-tkn-color': '#f2ff00',
					'--prism-tkn-comment': '#546e7a',
					'--prism-tkn-constant': '#c792ea',
					'--prism-tkn-deleted': '#f07178',
					'--prism-tkn-doctype': '#546e7a',
					'--prism-tkn-entity': '#f07178',
					'--prism-tkn-function': '#c792ea',
					'--prism-tkn-hexcode': '#f2ff00',
					'--prism-tkn-id': '#c792ea',
					'--prism-tkn-important': '#c792ea',
					'--prism-tkn-inserted': '#80cbc4',
					'--prism-tkn-keyword': '#c792ea',
					'--prism-tkn-number': '#fd9170',
					'--prism-tkn-operator': '#89ddff',
					'--prism-tkn-prolog': '#546e7a',
					'--prism-tkn-property': '#80cbc4',
					'--prism-tkn-pseudo-class': '#c3e88d',
					'--prism-tkn-pseudo-element': '#c3e88d',
					'--prism-tkn-punctuation': '#89ddff',
					'--prism-tkn-regex': '#f2ff00',
					'--prism-tkn-selector': '#f07178',
					'--prism-tkn-string': '#c3e88d',
					'--prism-tkn-symbol': '#c792ea',
					'--prism-tkn-tag': '#f07178',
					'--prism-tkn-unit': '#f07178',
					'--prism-tkn-url': '#fd9170',
					'--prism-tkn-variable': '#f07178'
				}
			}
		]
	},
	plugins: [typography, daisyui]
};

module.exports = config;

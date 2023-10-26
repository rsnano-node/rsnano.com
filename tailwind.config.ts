import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';
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
					'base-300': '#dee8ef'
				},
				dark: {
					...themes['[data-theme=dark]'],
					'primary': '#209CE9',
					'base-100': '#031017',
					'base-200': '#02080c',
					'base-300': '#010305'
				}
			}
		]
	},
	plugins: [typography, daisyui]
};

module.exports = config;

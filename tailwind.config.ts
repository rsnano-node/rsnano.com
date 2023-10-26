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
					primary: '#209CE9'
				},
				dark: {
					...themes['[data-theme=dark]'],
					primary: '#209CE9'
				}
			}
		]
	},
	plugins: [typography, daisyui]
};

module.exports = config;

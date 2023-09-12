const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const tailwindcssNesting = require('tailwindcss/nesting');

const config = {
	plugins: [tailwindcssNesting(), tailwindcss(), autoprefixer()]
};

module.exports = config;

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
const path = require('path');
const sveltePreprocess = require('svelte-preprocess');

module.exports = {
	stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
	addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-svelte-csf'],
	svelteOptions: {
		preprocess: [
			//require("../svelte.config.js").preprocess]
			sveltePreprocess({
				replace: [
					['~', path.resolve('./src')],
					//[/\$app/, '@sveltejs/kit/assets/runtime/env'],
				],
				defaults: {
					style: 'scss',
				},
				postcss: true,
				scss: {
					prependData: `@import 'src/styles/_variables.scss';`,
				},
			}),
		],
	},
};

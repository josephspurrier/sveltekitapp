module.exports = {
	root: true,
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2019,
		project: 'tsconfig.json',
		extraFileExtensions: ['.cjs'],
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:cypress/recommended',
		'plugin:prettier/recommended',
	],
	plugins: ['svelte3', 'prettier', '@typescript-eslint'],
	ignorePatterns: ['*.config.js'],
	overrides: [{ files: ['*.svelte'], processor: 'svelte3/svelte3' }],
	settings: {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		'svelte3/typescript': () => require('typescript'),
	},
	rules: {
		// Don't allow relative imports. VSCode will also use absolute imports by default.
		'no-restricted-imports': [
			'error',
			{
				patterns: [
					'./*',
					'../*',
					'!./*.css', // Allow relative imports for CSS.
					'!../*.css', // Allow relative imports for CSS.
					'!./*.scss', // Allow relative imports for SCSS.
					'!../*.scss', // Allow relative imports for SCSS.
				],
			},
		],
	},
};

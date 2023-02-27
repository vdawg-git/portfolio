const ts = require("typescript")

const defaultRules = {}

module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:unicorn/recommended",
		"prettier"
	],
	plugins: ["svelte3", "@typescript-eslint"],
	ignorePatterns: ["node_modules/**", "**/dist/**", "*.cjs"],
	overrides: [
		{
			files: ["*.{svelte,svx}"],
			processor: "svelte3/svelte3"
		}
	],
	settings: {
		"svelte3/typescript": () => require("typescript")
	},
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		ecmaFeatures: {
			classes: false
		}
	},
	env: {
		es2021: true,
		node: true,
		browser: true
	},
	rules: {
		"no-console": "off",
		"import/prefer-default-export": "off",
		"unicorn/filename-case": "off",
		"@typescript-eslint/no-misused-promises": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"no-restricted-syntax": "off",
		"import/no-unresolved": "off",
		"import/order": "off",
		"unicorn/prefer-module": "off",
		"no-use-before-define": "off",
		"no-undef": "off",
		"unicorn/no-array-callback-reference": "off",
		"unicorn/no-array-reduce": "off",
		"unicorn/no-useless-undefined": "off",
		"unicorn/prevent-abbreviations": [
			"error",
			{
				ignore: ["\\.e2e$"]
			}
		],
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"spaced-comment": ["error", "always", { markers: ["/", "?", "!"] }],
		"no-underscore-dangle": "off",
		"@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: true }],
		"no-shadow": "off",
		"@typescript-eslint/no-shadow": ["error", { ignoreTypeValueShadow: true }],
		"func-style": ["error", "declaration"],
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/consistent-type-imports": "error"
	}
}

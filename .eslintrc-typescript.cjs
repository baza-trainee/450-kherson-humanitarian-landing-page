module.exports = {
	rules: {
		// TypeScript Rules
		'@typescript-eslint/consistent-indexed-object-style': ['warn', 'record'],
		'@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],
		'@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports' }],
		'@typescript-eslint/method-signature-style': 'warn',
		'@typescript-eslint/naming-convention': ['warn',
			{ selector: 'interface', format: ['PascalCase'] },
			{ selector: 'enum', format: ['PascalCase'] },
			{ selector: 'typeLike', format: ['PascalCase'] },
		],
		'@typescript-eslint/no-duplicate-enum-values': 'warn',
		'@typescript-eslint/unified-signatures': 'warn',

		// Extension Rules
		'no-loop-func': 'off',
		'@typescript-eslint/no-loop-func': 'error',
		'no-loss-of-precision': 'off',
		'@typescript-eslint/no-loss-of-precision': 'warn',
		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': [2],
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': 'warn',
		'no-useless-constructor': 'off',
		'@typescript-eslint/no-useless-constructor': 'warn'
	}
}

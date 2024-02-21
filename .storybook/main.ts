import path from 'path';

import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	staticDirs: ['../public'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-onboarding',
		'@storybook/addon-interactions',
		{
			name: '@storybook/addon-styling',
			options: {
				postCss: {
					implementation: require('postcss'),
					// postcssOptions: {
					// 	plugins: [require('autoprefixer')],
					// },
				},
			},
		},
	],
	framework: {
		name: '@storybook/nextjs',
		options: {},
	},
	docs: {
		autodocs: 'tag',
	},

	webpackFinal: async (config) => {
		if (config.resolve) {
			config.resolve.alias = {
				...config.resolve.alias,
				'~styles': path.resolve(__dirname, '../src/styles'),
				'~assets': path.resolve(__dirname, '../src/assets'),
				'~api': path.resolve(__dirname, '../src/api'),
				'~components': path.resolve(__dirname, '../src/components'),
				'~constants': path.resolve(__dirname, '../src/constants'),
				'~helpers': path.resolve(__dirname, '../src/helpers'),
				'~hooks': path.resolve(__dirname, '../src/hooks'),
				'~pages': path.resolve(__dirname, '../src/pages'),
				'~store': path.resolve(__dirname, '../src/store'),
				'~types': path.resolve(__dirname, '../src/types'),
				'~utils': path.resolve(__dirname, '../src/utils'),
				'~': path.resolve(__dirname, '../src'),
			};
		}
		return config;
	},
};
export default config;

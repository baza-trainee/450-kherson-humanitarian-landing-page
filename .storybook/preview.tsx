import type { Preview } from '@storybook/react';
import React from 'react';

import 'modern-normalize/modern-normalize.css';
import '~/styles/index.scss';

import { Open_Sans, Unbounded } from 'next/font/google';

const unbounded = Unbounded({
	subsets: ['cyrillic'],
	display: 'swap',
	weight: ['400', '600'],
	style: 'normal',
});

const openSans = Open_Sans({
	subsets: ['cyrillic'],
	display: 'swap',
	weight: ['400', '500', '600', '700'],
	style: 'normal',
});

const preview: Preview = {
	parameters: {
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
	decorators: [
		(Story) => (
			<html
				style={
					{
						'--font-family--unbounded': `${unbounded.style.fontFamily}`,
						'--font-family--open-sans': `${openSans.style.fontFamily}`,
					} as React.CSSProperties
				}
			>
				<Story />
			</html>
		),
	],
};

export default preview;

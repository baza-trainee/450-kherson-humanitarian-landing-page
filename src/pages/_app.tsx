import clsx from 'clsx';
import type { AppProps } from 'next/app';
import { Open_Sans, Unbounded } from 'next/font/google';

import { RootLayout } from '~components/RootLayout/RootLayout';

import 'modern-normalize/modern-normalize.css';
import '~/styles/index.scss';

const unbounded = Unbounded({
	subsets: ['cyrillic'],
	display: 'swap',
	weight: ['400', '600'],
	style: 'normal',
	variable: '--font-family--unbounded',
});

const openSans = Open_Sans({
	subsets: ['cyrillic'],
	display: 'swap',
	weight: ['400', '500', '600', '700'],
	style: 'normal',
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<RootLayout className={clsx([unbounded.variable, openSans.className])}>
			<Component {...pageProps} />
		</RootLayout>
	);
}

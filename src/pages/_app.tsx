import clsx from 'clsx';
import type { AppProps } from 'next/app';
import { Poppins, Unbounded } from 'next/font/google';

import { RootLayout } from '~components/RootLayout/RootLayout';

import 'modern-normalize/modern-normalize.css';
import '~/styles/globals.scss';

const unbounded = Unbounded({
	subsets: ['cyrillic'],
	display: 'swap',
	weight: ['400', '600'],
	style: 'normal',
	variable: '--font-unbounded',
});

const poppins = Poppins({
	subsets: ['devanagari'],
	display: 'swap',
	weight: ['300', '400', '500', '600', '700', '900'],
	style: 'normal',
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<RootLayout className={clsx([unbounded.variable, poppins.className])}>
			<Component {...pageProps} />
		</RootLayout>
	);
}

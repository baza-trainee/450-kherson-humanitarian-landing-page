import type { AppProps } from 'next/app';
import { Open_Sans, Unbounded } from 'next/font/google';

import 'modern-normalize/modern-normalize.css';
import '~/styles/index.scss';

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

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<style jsx global>{`
				:root {
					--font-family--unbounded: ${unbounded.style.fontFamily};
					--font-family--open-sans: ${openSans.style.fontFamily};
				}
			`}</style>
			<Component {...pageProps} />
		</>
	);
}

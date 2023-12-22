import clsx from 'clsx';

import { MainLayout } from '~components/RootLayout/MainLayout/MainLayout';

import { HeaderLite } from './HeaderLite/HeaderLite';

import s from './LayoutLite.module.scss';

interface LayoutLiteProps {
	className?: string;
	children: React.ReactNode;
}

export function LayoutLite({ className, children }: LayoutLiteProps) {
	return (
		<div className={clsx(s.RootLayout, className)}>
			<HeaderLite />
			<MainLayout>{children}</MainLayout>
		</div>
	);
}

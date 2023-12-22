import type React from 'react';

import clsx from 'clsx';

import { FooterLayout } from './FooterLayout/FooterLayout';
import { HeaderLayout } from './HeaderLayout/HeaderLayout';
import { MainLayout } from './MainLayout/MainLayout';

import s from './RootLayout.module.scss';

interface RootLayoutProps {
	className?: string;
	children: React.ReactNode;
}

export function RootLayout({ className, children }: RootLayoutProps) {
	return (
		<div className={clsx(s.RootLayout, className)}>
			<HeaderLayout />
			<MainLayout>{children}</MainLayout>
			<FooterLayout />
		</div>
	);
}

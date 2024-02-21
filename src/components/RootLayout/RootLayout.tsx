import type React from 'react';

import clsx from 'clsx';

import type { FooterData } from '~api/types/footer/FooterData';

import { FooterLayout } from './FooterLayout/FooterLayout';
import { HeaderLayout } from './HeaderLayout/HeaderLayout';
import { MainLayout } from './MainLayout/MainLayout';

import s from './RootLayout.module.scss';

interface RootLayoutProps {
	className?: string;
	children: React.ReactNode;
	footerData?: FooterData;
}

export function RootLayout({ className, children, footerData }: RootLayoutProps) {
	return (
		<div className={clsx(s.RootLayout, className)}>
			<HeaderLayout />
			<MainLayout>{children}</MainLayout>
			<FooterLayout footerData={footerData} />
		</div>
	);
}

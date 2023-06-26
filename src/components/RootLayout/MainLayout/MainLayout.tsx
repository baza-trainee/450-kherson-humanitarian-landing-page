import s from './MainLayout.module.scss';

interface MainLayoutProps {
	children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
	return <main className={s.MainLayout}>{children}</main>;
}

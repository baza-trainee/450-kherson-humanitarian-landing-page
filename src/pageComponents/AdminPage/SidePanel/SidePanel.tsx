import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { apiAuth } from '~/apiAuth';
import { useLoginState } from '~/pageComponents/LogInPage/store/useLoginState';
import { Icon } from '~components/Icon/Icon';
import { ROUTES } from '~constants/ROUTES';
import { useLoaderOverlay } from '~hooks/useLoaderOverlay';

import { useTabsState } from '../store/useTabsState';
import { navigationList } from './navigationList';
import logo from '/public/svg/logo.svg';

import s from './SidePanel.module.scss';

export function SidePanel() {
	const { LoaderOverlay, showLoaderOverlay } = useLoaderOverlay();

	const router = useRouter();

	const isActive = (slug: string) => {
		return router.query.slug === slug && s.active;
	};

	const { logout } = useLoginState((state) => ({
		logout: state.logout,
	}));

	const { setActiveTabId } = useTabsState((state) => ({
		setActiveTabId: state.setActiveTabId,
	}));

	const handleLogOutButtonOnClick = async () => {
		showLoaderOverlay();
		logout();
		setActiveTabId(null);
		await apiAuth.logout();
		router.push(ROUTES.login);
	};

	return (
		<>
			<aside className={s.SidePanel}>
				<div className={s.logo}>
					<Link href={ROUTES.home}>
						<Image src={logo} alt="logo" width={200} height={80} />
					</Link>
				</div>
				<nav className={s.navigation}>
					{navigationList.map((listItem) => (
						<Link
							key={listItem.slug}
							href={{
								pathname: `${ROUTES.admin}/[slug]`,
								query: { slug: listItem.slug },
							}}
							className={clsx(s.navigationItem, isActive(listItem.slug))}
						>
							{listItem.title}
						</Link>
					))}
				</nav>
				<div className={s.bottom}>
					<Link
						href={{
							pathname: `${ROUTES.admin}/change-password`,
						}}
						className={clsx(s.navigationItem, isActive('change-password'))}
					>
						Змінити пароль
					</Link>
					<button className={s.logout} onClick={handleLogOutButtonOnClick}>
						<Icon icon="icon--log-out" className={s.logoutIcon} />
						Вийти
					</button>
				</div>
			</aside>
			<LoaderOverlay />
		</>
	);
}

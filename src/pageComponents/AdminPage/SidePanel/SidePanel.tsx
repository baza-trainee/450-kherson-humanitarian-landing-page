import clsx from 'clsx';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Icon } from '~components/Icon/Icon';
import { ROUTES } from '~constants/ROUTES';

import { navigationList } from './navigationList';
import logo from '/public/svg/logo.svg';

import s from './SidePanel.module.scss';

export function SidePanel() {
	const router = useRouter();

	const isActive = (slug: string) => router.query.slug === slug && s.active;

	const handleLogOutButtonOnClick = () => {
		Cookies.remove('token');
		router.push(ROUTES.login);
	};

	return (
		<aside className={s.SidePanel}>
			<div className={s.logo}>
				<Image src={logo} alt="logo" width={200} height={80} />
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
	);
}

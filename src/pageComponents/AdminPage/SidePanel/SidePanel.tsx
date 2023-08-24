import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Icon } from '~components/Icon/Icon';

import { navigationList } from './navigationList';
import logo from '/public/svg/logo.svg';

import s from './SidePanel.module.scss';

export function SidePanel() {
	const { query } = useRouter();

	const isActive = (slug: string) => query.slug === slug && s.active;

	return (
		<aside className={s.SidePanel}>
			<div className={s.logo}>
				<Image src={logo} alt="logo" width={142} height={60} />
			</div>
			<nav className={s.navigation}>
				{navigationList.map((listItem) => (
					<Link
						key={listItem.slug}
						href={{
							pathname: '/admin/[slug]',
							query: { slug: listItem.slug },
						}}
						className={clsx(s.navigationItem, isActive(listItem.slug))}
					>
						{listItem.title}
					</Link>
				))}
			</nav>
			<button className={s.logout}>
				<Icon
					icon="icon--log-out"
					colors={{
						default: 'var(--color--warning-1)',
						hover: 'var(--color--primary-1)',
						click: 'var(--color--warning-1)',
					}}
				/>
				Вийти
			</button>
		</aside>
	);
}

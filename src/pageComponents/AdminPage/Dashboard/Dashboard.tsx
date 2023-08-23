import { useRouter } from 'next/router';

import { ContentBoard } from './ContentBoard/ContentBoard';
import { Tabs } from './Tabs/Tabs';

import s from './Dashboard.module.scss';

export function Dashboard() {
	const router = useRouter();
	console.log('router.query.slug: ', router.query.slug);
	return (
		<div className={s.Dashboard}>
			<Tabs />
			<ContentBoard />
		</div>
	);
}

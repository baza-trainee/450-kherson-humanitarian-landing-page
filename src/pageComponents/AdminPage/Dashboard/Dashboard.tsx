import { ContentBoard } from './ContentBoard/ContentBoard';
import { Tabs } from './Tabs/Tabs';

import s from './Dashboard.module.scss';

export function Dashboard() {
	return (
		<div className={s.Dashboard}>
			<Tabs />
			<ContentBoard />
		</div>
	);
}

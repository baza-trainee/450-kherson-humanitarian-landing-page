import { Dashboard } from './Dashboard/Dashboard';
import { SidePanel } from './SidePanel/SidePanel';

import s from './AdminPage.module.scss';

export function AdminPage() {
	return (
		<main className={s.AdminPage}>
			<SidePanel />
			<Dashboard />
		</main>
	);
}

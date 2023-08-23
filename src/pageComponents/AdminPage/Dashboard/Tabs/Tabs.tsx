import { Button } from '~components/Buttons/Button';
import { Icon } from '~components/Icon/Icon';

import s from './Tabs.module.scss';

interface TabsProps {
	nothing?: unknown;
}

const isEditable = true;
const tabs = [
	{ id: 1, title: 'Таб 1', callback: () => console.log('1'), isActive: false },
	{ id: 2, title: 'Таб 2', callback: () => console.log('2'), isActive: false },
	{ id: 3, title: 'Таб 3', callback: () => console.log('3'), isActive: true },
	{ id: 4, title: 'Таб 4', callback: () => console.log('4'), isActive: false },
];

export function Tabs({ nothing }: TabsProps) {
	const isActiveClass = (isActive: boolean) => (isActive ? s.active : '');
	const isActiveType = (isActive: boolean) => (isActive ? 'primary' : 'secondary');

	return (
		<div className={s.Tabs}>
			{tabs.map((tab) => (
				<Button
					key={tab.id}
					type={isActiveType(tab.isActive)}
					className={isActiveClass(tab.isActive)}
					onClick={tab.callback}
				>
					{tab.title}
				</Button>
			))}
			{isEditable && (
				<Button type="secondary">
					<Icon icon="icon--plus" />
				</Button>
			)}
		</div>
	);
}

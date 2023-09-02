import { useEffect, useState } from 'react';

import { Button } from '~components/Buttons/Button';
import { Icon } from '~components/Icon/Icon';
import { Loader } from '~components/Loader/Loader';

import { fetchListData } from './fetchHelpers/fetchListData';

import s from './Tabs.module.scss';

export interface Tab {
	title: string;
	name: string;
	id: string;
}

export interface TabsData {
	tabs: Tab[];
	isEditable: boolean;
}

interface TabsProps {
	slug?: string | string[];
	activeTab: number;
	setActiveTab: (activeTab: number) => void;
	setActiveTabId: (activeTabId: string) => void;
	setActiveTabName: (tabName: string) => void;
}

export function Tabs({ slug, activeTab, setActiveTab, setActiveTabId, setActiveTabName }: TabsProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [tabsData, setTabsData] = useState<TabsData | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			setError('');
			if (slug === 'lists') {
				setTabsData(await fetchListData());
			} else {
				setTabsData(null);
			}
			setIsLoading(false);
		};
		fetchData();
	}, [slug]);

	const isActiveType = (isActive: boolean) => (isActive ? 'primary' : 'secondary');
	const isActiveClass = (isActive: boolean) => (isActive ? s.active : '');

	const handleTabOnClick = (index: number) => {
		setActiveTab(index);
		setActiveTabId(tabsData?.tabs[index].id || '');
		setActiveTabName(tabsData?.tabs[index].name || '');
	};

	return (
		<div className={s.Tabs}>
			{isLoading && !tabsData && <Loader />}
			{!isLoading && tabsData && (
				<>
					{tabsData.tabs.map((tab, i) => (
						<Button
							key={tab.id}
							type={isActiveType(tab.name === tabsData.tabs[activeTab].name)}
							className={isActiveClass(tab.name === tabsData.tabs[activeTab].name)}
							onClick={() => handleTabOnClick(i)}
						>
							{tab.title}
						</Button>
					))}
					{tabsData.isEditable && (
						<Button type="secondary">
							<Icon
								icon="icon--plus"
								colors={{
									default: 'var(--color--primary-2)',
								}}
							/>
						</Button>
					)}
				</>
			)}
		</div>
	);
}

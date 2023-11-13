import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import { Button } from '~components/Buttons/Button';
import { Icon } from '~components/Icon/Icon';
import { Loader } from '~components/Loader/Loader';
import { getIndexByKey } from '~helpers/getIndexByKey';
import { getMatch } from '~helpers/getMatch';
import { useParams } from '~hooks/useParams';

import { useListsState } from '../../store/useListsState';
import { useTabsState } from '../../store/useTabsState';
import { fetchChangePasswordData } from './fetchHelpers/fetchChangePasswordData';
import { fetchHeroData } from './fetchHelpers/fetchHeroData';
import { fetchListData } from './fetchHelpers/fetchListData';
import { getOurAchievementsData } from './fetchHelpers/getOurAchievementsData';

import s from './Tabs.module.scss';

export interface Tab {
	title: string;
	id: string;
}

export interface TabsData {
	tabs: Tab[];
	isEditable: boolean;
}

export function Tabs() {
	const router = useRouter();
	const { query } = router;
	const [tabsTitleName, setTabsTitleName] = useState<string>('');
	const { setParams } = useParams();

	const isListsDataLoading = useListsState((state) => state.isLoading);
	const isDataLoading = isListsDataLoading;

	const {
		isBlocked,
		isLoading,
		tabsData,
		activeTabId,
		setActiveTabId,
		getTabsData,
		setTabsData,
		setIsModalChangesOpen,
	} = useTabsState((state) => ({
		isBlocked: state.isBlocked,
		isLoading: state.isLoading,
		activeTabId: state.activeTabId,
		tabsData: state.tabsData,
		setActiveTabId: state.setActiveTabId,
		getTabsData: state.getTabsData,
		setTabsData: state.setTabsData,
		setIsModalChangesOpen: state.setIsModalChangesOpen,
	}));

	//* 1. Get page route and fetch tabs data
	//* Set fetching helpers function here ↓
	// If isEditable set Title to your block setTabsTitleName('Your title name')
	useEffect(() => {
		const fetchData = getMatch(query?.slug?.toString(), {
			lists: async () => await getTabsData(fetchListData),
			hero: async () => {
				await getTabsData(fetchHeroData);
				setTabsTitleName('Банер');
			},
			'change-password': async () => await getTabsData(fetchChangePasswordData),
			'our-achievements': async () => await getTabsData(getOurAchievementsData),
			_: () => setTabsData(null),
		});
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.slug]);

	

	useEffect(() => {
		if (
			!query?.id ||
			(query?.id && tabsData && getIndexByKey(tabsData?.tabs, 'id', query?.id) < 0)
		) {
			if (tabsData?.tabs?.length && tabsData?.tabs[0].id) {
				if (activeTabId === 'new') {
					setParams({ id: tabsData?.tabs[tabsData?.tabs?.length - 1].id });
					setActiveTabId(tabsData?.tabs[tabsData?.tabs?.length - 1].id);
				} else {
					setParams({ id: tabsData?.tabs[0].id });
					setActiveTabId(tabsData?.tabs[0].id);
				}
			} else if (tabsData?.isEditable) {
				setParams({ id: 'empty' });
				setActiveTabId('empty');
			}
		} else if (query?.id) {
			setActiveTabId(query?.id?.toString());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tabsData]);

	const isActiveType = (isActive: boolean) => (isActive ? 'primary' : 'secondary');
	const isActiveClass = (isActive: boolean) => (isActive ? s.active : '');

	const handleTabOnClick = (id: string) => {
		if (isBlocked) setIsModalChangesOpen(true);
		else {
			if (tabsData) {
				if (tabsData.tabs.find((item) => item.id === 'new')) {
					tabsData.tabs.pop();
				}
			}
			setActiveTabId(id);
			setParams({ id: id });
		}
	};

	const handleAddNewTabOnClick = () => {
		if (isBlocked) setIsModalChangesOpen(true);
		else {
			if (tabsData) {
				if (tabsData.tabs.find((item) => item.id === 'new')) {
					setActiveTabId('new');
					setParams({ id: 'new' });
				} else {
					tabsData.tabs.push({
						title: `${tabsTitleName} ${tabsData.tabs.length + 1}`,
						id: 'new',
					});
					setActiveTabId('new');
					setParams({ id: 'new' });
				}
			}
		}
	};

	return (
		<div className={s.Tabs}>
			{(isLoading || !tabsData) && <Loader />}
			{!isLoading && tabsData && (
				<>
					{tabsData.tabs.map((tab) => (
						<Button
							key={tab.id}
							type={isActiveType(tab.id === activeTabId)}
							className={clsx(s.TabButton, isActiveClass(tab.id === activeTabId))}
							onClick={() => handleTabOnClick(tab.id)}
							disabled={isDataLoading && tab.id !== activeTabId}
						>
							{tab.title}
						</Button>
					))}
					{tabsData.isEditable && (
						<Button
							type="secondary"
							onClick={handleAddNewTabOnClick}
							disabled={isDataLoading}
						>
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

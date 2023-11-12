import { useEffect } from 'react';

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
import { fetchAboutUsData } from './fetchHelpers/fetchAboutUsData';
import { fetchChangePasswordData } from './fetchHelpers/fetchChangePasswordData';
import { fetchListData } from './fetchHelpers/fetchListData';

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

	const { setParams } = useParams();

	const isListsDataLoading = useListsState((state) => state.isLoading);
	const isDataLoading = isListsDataLoading;

	const { isLoading, tabsData, activeTabId, setActiveTabId, getTabsData, setTabsData } =
		useTabsState((state) => ({
			isLoading: state.isLoading,
			activeTabId: state.activeTabId,
			tabsData: state.tabsData,
			setActiveTabId: state.setActiveTabId,
			getTabsData: state.getTabsData,
			setTabsData: state.setTabsData,
		}));

	//* 1. Get page route and fetch tabs data
	//* Set fetching helpers function here ↓
	useEffect(() => {
		const fetchData = getMatch(query?.slug?.toString(), {
			lists: async () => await getTabsData(fetchListData),
			'about-us': async () => await getTabsData(fetchAboutUsData),
			'change-password': async () => await getTabsData(fetchChangePasswordData),
			_: () => setTabsData(null),
		});
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.slug]);

	//* 2. Check is id in address or is id correct
	//* and if its needed set id to url params
	useEffect(() => {
		if (
			!query?.id ||
			(query?.id && tabsData && getIndexByKey(tabsData?.tabs, 'id', query?.id) < 0)
		) {
			if (tabsData?.tabs?.length && tabsData?.tabs[0].id) {
				setParams({ id: tabsData?.tabs[0].id });
				setActiveTabId(tabsData?.tabs[0].id);
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
		setActiveTabId(id);
		setParams({ id: id });
	};

	const handleAddNewTabOnClick = () => {
		console.log('handleAddNewTabOnClick');
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

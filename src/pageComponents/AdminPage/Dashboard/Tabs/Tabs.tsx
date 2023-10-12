import { useEffect } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import { Button } from '~components/Buttons/Button';
import { Icon } from '~components/Icon/Icon';
import { Loader } from '~components/Loader/Loader';
import { getIndexByKey } from '~helpers/getIndexByKey';
import { useParams } from '~hooks/useParams';

import { useBoardsState } from '../../store/useBoardsState';
import { useTabsState } from '../../store/useTabsState';
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
	const { isDataLoading, getBoardDataById } = useBoardsState((state) => ({
		isDataLoading: state.isLoading,
		getBoardDataById: state.getBoardDataById,
	}));

	const router = useRouter();
	const { query } = router;

	const { setParams } = useParams();

	const { isLoading, tabsData, activeTabId, setActiveTabId, getTabsData, setTabsData } =
		useTabsState((state) => ({
			isLoading: state.isLoading,
			activeTabId: state.activeTabId,
			tabsData: state.tabsData,
			setActiveTabId: state.setActiveTabId,
			getTabsData: state.getTabsData,
			setTabsData: state.setTabsData,
		}));

	useEffect(() => {
		const fetchData = async () => {
			//* set fetching helpers function here ↓
			if (query?.slug === 'lists') {
				await getTabsData(fetchListData);
			} else {
				setTabsData(null);
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.slug]);

	useEffect(() => {
		const fetchData = async () => {
			//* set fetching helpers function here ↓
			if (query?.slug === 'our-achievements') {
				await getTabsData(getOurAchievementsData);
			} else {
				setTabsData(null);
			}
		};
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.slug]);

	useEffect(() => {
		if (
			(!query?.id && tabsData?.tabs[0].id) ||
			(query?.id && tabsData && getIndexByKey(tabsData?.tabs, 'id', query?.id) < 0)
		) {
			setActiveTabId(tabsData?.tabs[0].id);
			setParams({ id: tabsData?.tabs[0].id });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tabsData]);

	useEffect(() => {
		if (!activeTabId) {
			setActiveTabId(query?.id?.toString() || '');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query?.id]);

	useEffect(() => {
		const fetchData = async () => {
			if (activeTabId && query?.slug) {
				getBoardDataById(query?.slug?.toString(), activeTabId);
			}
		};
		if (activeTabId) fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeTabId]);

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
			{(isLoading || !activeTabId || !query?.id) && <Loader />}
			{!isLoading && activeTabId && query?.id && tabsData && (
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
						<Button type="secondary" onClick={handleAddNewTabOnClick}>
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

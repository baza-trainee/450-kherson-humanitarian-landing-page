import { useEffect, useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';

import { Button } from '~components/Buttons/Button';
import { Icon } from '~components/Icon/Icon';
import { Loader } from '~components/Loader/Loader';
import { ModalPop } from '~components/ModalPop/ModalPop';
import { getIndexByKey } from '~helpers/getIndexByKey';
import { getMatch } from '~helpers/getMatch';
import { useParams } from '~hooks/useParams';

import { useAboutUsState } from '../../store/useAboutUsState';
import { useDonationsState } from '../../store/useDonationsState';
import { useHeroesState } from '../../store/useHeroesState';
import { useListsState } from '../../store/useListsState';
import { useOurActivityState } from '../../store/useOurActivityState';
import { usePartnersState } from '../../store/usePartnersState';
import { useTabsState } from '../../store/useTabsState';
import { newTabsTitleNames } from './data/newTabsTitleNames';
import { fetchAboutUsData } from './fetchHelpers/fetchAboutUsData';
import { fetchChangePasswordData } from './fetchHelpers/fetchChangePasswordData';
import { fetchDonationsData } from './fetchHelpers/fetchDonationsData';
import { fetchHeroData } from './fetchHelpers/fetchHeroData';
import { fetchListData } from './fetchHelpers/fetchListData';
import { fetchOurActivityData } from './fetchHelpers/fetchOurActivityData';
import { fetchPartnersData } from './fetchHelpers/fetchPartnersData';

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
	const [isModalTabsClickBlockedOpen, setIsModalTabsClickBlockedOpen] = useState<boolean>(false);

	const { setParams } = useParams();

	const isListsDataLoading = useListsState((state) => state.isLoading);
	const isAboutUsDataLoading = useAboutUsState((state) => state.isLoading);
	const isHeroDataLoading = useHeroesState((state) => state.isLoading);
	const isDonationsDataLoading = useDonationsState((state) => state.isLoading);
	const isOurActivityDataLoading = useOurActivityState((state) => state.isLoading);
	const isPartnersDataLoading = usePartnersState((state) => state.isLoading);
  
	const isDataLoading =
		isListsDataLoading ||
		isHeroDataLoading ||
		isOurActivityDataLoading ||
		isPartnersDataLoading ||
		isAboutUsDataLoading ||
		isDonationsDataLoading;
	//* use your state loading ⭡

	const {
		isTabsClickBlocked,
		isLoading,
		tabsData,
		activeTabId,
		setActiveTabId,
		getTabsData,
		setTabsData,
	} = useTabsState((state) => ({
		isTabsClickBlocked: state.isTabsClickBlocked,
		isLoading: state.isLoading,
		activeTabId: state.activeTabId,
		tabsData: state.tabsData,
		setActiveTabId: state.setActiveTabId,
		getTabsData: state.getTabsData,
		setTabsData: state.setTabsData,
	}));

	//* 1. Get page route and fetch tabs data
	//* Set fetching helpers function here ↓
	// If isEditable set Title to your new block
	useEffect(() => {
		const fetchData = getMatch(query?.slug?.toString(), {
			lists: async () => await getTabsData(fetchListData),
			hero: async () => {
				await getTabsData(fetchHeroData);
				setTabsTitleName(newTabsTitleNames.hero);
			},
			donations: async () => {
				await getTabsData(fetchDonationsData);
				setTabsTitleName(newTabsTitleNames.donations);
			},
			'about-us': async () => await getTabsData(fetchAboutUsData),
			'change-password': async () => await getTabsData(fetchChangePasswordData),
			'our-activity': async () => {
				await getTabsData(fetchOurActivityData);
				setTabsTitleName(newTabsTitleNames['our-activity']);
			},
			'our-partners': async () => {
				await getTabsData(fetchPartnersData);
				setTabsTitleName(newTabsTitleNames['our-partners']);
			},
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
		if (isTabsClickBlocked) setIsModalTabsClickBlockedOpen(true);
		else {
			if (tabsData && tabsData.tabs.find((item) => item.id === 'new')) {
				tabsData.tabs.pop();
				tabsData.isEditable = true;
			}
			setActiveTabId(id);
			setParams({ id: id });
		}
	};

	const handleAddNewTabOnClick = () => {
		if (isTabsClickBlocked) setIsModalTabsClickBlockedOpen(true);
		else {
			if (tabsData) {
				tabsData.tabs.push({
					title:
						tabsTitleName === newTabsTitleNames.donations
							? `${tabsTitleName}`
							: `${tabsTitleName} ${tabsData.tabs.length + 1}`,
					id: 'new',
				});
				tabsData.isEditable = false;
				setActiveTabId('new');
				setParams({ id: 'new' });
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
					{
						isModalTabsClickBlockedOpen && (
							<ModalPop
								isOpen={isModalTabsClickBlockedOpen}
								onClose={() => setIsModalTabsClickBlockedOpen(false)}
								title="Увага!"
								type="error"
								leftButton={() => (
									<Button onClick={() => setIsModalTabsClickBlockedOpen(false)}>
										Зрозуміло
									</Button>
								)}
							>
								На сторінці є незбережені зміни. Для продовження необхідно зберегти або
								скасувати зміни
							</ModalPop>
						) //modal on clicking between tabs if are changes in form
					}
				</>
			)}
		</div>
	);
}

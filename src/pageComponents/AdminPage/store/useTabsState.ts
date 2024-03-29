import { create } from 'zustand';

import type { ErrorResponse } from '~api/types/backend/responses/ErrorResponse';
import { returnAppError } from '~helpers/returnAppError';

import type { TabsData } from '../Dashboard/Tabs/Tabs';

interface UseTabsState {
	isTabsClickBlocked: boolean;
	isLoading: boolean;
	error: ErrorResponse | null;
	tabsData: TabsData | null;
	activeTabId: string | null;
	setActiveTabId: (activeTabId: string | null) => void;
	getTabsData: (callback: () => Promise<TabsData>) => Promise<void>;
	setTabsData: (tabsData: TabsData | null) => void;
	setIsTabsClickBlocked: (isTabsClickBlocked: boolean) => void;
}

export const useTabsState = create<UseTabsState>((set) => ({
	isTabsClickBlocked: false,
	isLoading: false,
	error: null,
	tabsData: null,
	activeTabId: null,
	setActiveTabId: (activeTabId) => {
		set({ activeTabId });
	},

	getTabsData: async (callback) => {
		set({ isLoading: true });
		set({ error: null });

		try {
			const resp = await callback();
			if ('tabs' in resp) {
				set({ tabsData: resp });
			} else {
				set({ error: resp });
			}
		} catch (error) {
			set({ error: returnAppError(error) });
		} finally {
			set({ isLoading: false });
			set({ isTabsClickBlocked: false });
		}
	},
	setTabsData: (tabsData) => {
		set(() => ({ tabsData }));
	},
	setIsTabsClickBlocked: (isTabsClickBlocked) => {
		set({ isTabsClickBlocked: isTabsClickBlocked });
	},
}));

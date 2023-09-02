import { useState } from 'react';

import { useRouter } from 'next/router';

import { ContentBoard } from './ContentBoard/ContentBoard';
import { Tabs } from './Tabs/Tabs';

import s from './Dashboard.module.scss';

export function Dashboard() {
	const router = useRouter();

	const [activeTab, setActiveTab] = useState(0);
	const [activeTabId, setActiveTabId] = useState('');
	const [activeTabName, setActiveTabName] = useState('idp');

	return (
		<div className={s.Dashboard}>
			<Tabs
				slug={router.query.slug}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				setActiveTabId={setActiveTabId}
				setActiveTabName={setActiveTabName}
			/>
			<ContentBoard slug={router.query.slug} activeTabId={activeTabId} activeTabName={activeTabName} />
		</div>
	);
}

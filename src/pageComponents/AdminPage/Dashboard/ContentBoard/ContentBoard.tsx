import { ListsBoard } from './Boards/ListsBoard/ListsBoard';
import { TestBoard } from './Boards/TestBoard/TestBoard';

import s from './ContentBoard.module.scss';

interface ContentBoardProps {
	slug?: string | string[];
	activeTabId: string;
	activeTabName: string;
}

export function ContentBoard({ slug, activeTabId, activeTabName }: ContentBoardProps) {
	return (
		<>
			<div className={s.ContentBoard}>
				{slug === 'lists' && <ListsBoard tabId={activeTabId} tabName={activeTabName} />}
				{slug === 'test' && <TestBoard tabId={activeTabId} tabName={activeTabName} />}
			</div>
		</>
	);
}

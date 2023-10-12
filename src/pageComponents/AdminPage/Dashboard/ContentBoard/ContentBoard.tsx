import { useRouter } from 'next/router';

import { ListsBoard } from './Boards/ListsBoard/ListsBoard';
import { OurAchievements } from './Boards/OurAchievements/OurAchievements';
import { TestBoard } from './Boards/TestBoard/TestBoard';

import s from './ContentBoard.module.scss';

export function ContentBoard() {
	const { query } = useRouter();

	return (
		<div className={s.ContentBoard}>
			{query?.slug === 'lists' && <ListsBoard />}
			{query?.slug === 'test' && <TestBoard />}
			{query?.slug === 'our-achievements' && <OurAchievements />}
			{/* <ListAchievements /> */}
		</div>
	);
}

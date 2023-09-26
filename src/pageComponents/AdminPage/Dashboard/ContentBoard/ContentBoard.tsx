import { useRouter } from 'next/router';

import { HeroBoard } from './Boards/HeroBoard/HeroBoard';
import { ListsBoard } from './Boards/ListsBoard/ListsBoard';
import { TestBoard } from './Boards/TestBoard/TestBoard';

import s from './ContentBoard.module.scss';

export function ContentBoard() {
	const { query } = useRouter();

	return (
		<div className={s.ContentBoard}>
			{query?.slug === 'lists' && <ListsBoard />}
			{query?.slug === 'hero' && <HeroBoard />}
			{query?.slug === 'test' && <TestBoard />}
		</div>
	);
}

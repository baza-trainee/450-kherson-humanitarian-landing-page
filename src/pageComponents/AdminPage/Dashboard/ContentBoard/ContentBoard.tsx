import { useRouter } from 'next/router';

import { ListsBoard } from './Boards/ListsBoard/ListsBoard';

import s from './ContentBoard.module.scss';

export function ContentBoard() {
	const { query } = useRouter();

	return (
		<div className={s.ContentBoard}>
			{query?.slug === 'lists' && <ListsBoard />}
		</div>
	);
}

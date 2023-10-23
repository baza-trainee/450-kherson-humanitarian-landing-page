import { useRouter } from 'next/router';

import { ChangePasswordBoard } from './Boards/ChangePasswordBoard/ChangePasswordBoard';
import { ListsBoard } from './Boards/ListsBoard/ListsBoard';
import { OurActivityBoard } from './Boards/OurActivityBoard/OurActivityBoard';

import s from './ContentBoard.module.scss';

export function ContentBoard() {
	const { query } = useRouter();

	return (
		<div className={s.ContentBoard}>
			{query?.slug === 'lists' && <ListsBoard />}
			{query?.slug === 'change-password' && <ChangePasswordBoard />}
			{query?.slug === 'our-activity' && <OurActivityBoard />}
		</div>
	);
}

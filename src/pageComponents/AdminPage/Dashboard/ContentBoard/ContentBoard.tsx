import { useRouter } from 'next/router';

import { AboutUsBoard } from './Boards/AboutUsBoard/AboutUsBoard';
import { ChangePasswordBoard } from './Boards/ChangePasswordBoard/ChangePasswordBoard';
import { ListsBoard } from './Boards/ListsBoard/ListsBoard';

import s from './ContentBoard.module.scss';

export function ContentBoard() {
	const { query } = useRouter();

	return (
		<div className={s.ContentBoard}>
			{query?.slug === 'lists' && <ListsBoard />}
			{query?.slug === 'about-us' && <AboutUsBoard />}
			{query?.slug === 'change-password' && <ChangePasswordBoard />}
		</div>
	);
}

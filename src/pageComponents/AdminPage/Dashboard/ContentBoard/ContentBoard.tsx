import { useRouter } from 'next/router';

import { ChangePasswordBoard } from './Boards/ChangePasswordBoard/ChangePasswordBoard';
import { HeroBoard } from './Boards/HeroBoard/HeroBoard';
import { ListsBoard } from './Boards/ListsBoard/ListsBoard';
import { OurAchievements } from './Boards/OurAchievements/OurAchievements';

import s from './ContentBoard.module.scss';

export function ContentBoard() {
	const { query } = useRouter();

	return (
		<div className={s.ContentBoard}>
			{query?.slug === 'lists' && <ListsBoard />}
			{query?.slug === 'hero' && <HeroBoard />}

			{query?.slug === 'our-achievements' && <OurAchievements />}
			{query?.slug === 'change-password' && <ChangePasswordBoard />}
		</div>
	);
}

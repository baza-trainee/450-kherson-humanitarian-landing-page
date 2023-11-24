import { useRouter } from 'next/router';

import { ChangePasswordBoard } from './Boards/ChangePasswordBoard/ChangePasswordBoard';
import { DonationsBoard } from './Boards/DonationsBoard/DonationsBoard';
import { HeroBoard } from './Boards/HeroBoard/HeroBoard';
import { ListsBoard } from './Boards/ListsBoard/ListsBoard';
import { OurActivityBoard } from './Boards/OurActivityBoard/OurActivityBoard';
import { PartnersBoard } from './Boards/PartnersBoard/PartnersBoard';

import s from './ContentBoard.module.scss';

export function ContentBoard() {
	const { query } = useRouter();

	return (
		<div className={s.ContentBoard}>
			{query?.slug === 'lists' && <ListsBoard />}
			{query?.slug === 'hero' && <HeroBoard />}
			{query?.slug === 'donations' && <DonationsBoard />}
			{query?.slug === 'change-password' && <ChangePasswordBoard />}
			{query?.slug === 'our-activity' && <OurActivityBoard />}
			{query?.slug === 'our-partners' && <PartnersBoard />}
		</div>
	);
}

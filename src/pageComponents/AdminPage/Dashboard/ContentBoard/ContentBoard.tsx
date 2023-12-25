import { useRouter } from 'next/router';

import { AboutUsBoard } from './Boards/AboutUsBoard/AboutUsBoard';
import { ChangePasswordBoard } from './Boards/ChangePasswordBoard/ChangePasswordBoard';
import { DonationsBoard } from './Boards/DonationsBoard/DonationsBoard';
import { FooterBoard } from './Boards/FooterBoard/FooterBoard';
import { GetHelp } from './Boards/GetHelp/GetHelp';
import { HeroBoard } from './Boards/HeroBoard/HeroBoard';
import { ListsBoard } from './Boards/ListsBoard/ListsBoard';
import { OurAchievements } from './Boards/OurAchievements/OurAchievements';
import { OurActivityBoard } from './Boards/OurActivityBoard/OurActivityBoard';
import { PartnersBoard } from './Boards/PartnersBoard/PartnersBoard';

import s from './ContentBoard.module.scss';

export function ContentBoard() {
	const { query } = useRouter();

	return (
		<div className={s.ContentBoard}>
			{query?.slug === 'lists' && <ListsBoard />}
			{query?.slug === 'hero' && <HeroBoard />}

			{query?.slug === 'our-achievements' && <OurAchievements />}
			{query?.slug === 'donations' && <DonationsBoard />}
			{query?.slug === 'about-us' && <AboutUsBoard />}
			{query?.slug === 'change-password' && <ChangePasswordBoard />}
			{query?.slug === 'our-activity' && <OurActivityBoard />}
			{query?.slug === 'our-partners' && <PartnersBoard />}
			{query?.slug === 'footer' && <FooterBoard />}
			{query?.slug === 'get-help' && <GetHelp />}
		</div>
	);
}

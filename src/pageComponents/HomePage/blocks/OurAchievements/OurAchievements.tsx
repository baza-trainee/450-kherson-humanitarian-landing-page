import { useEffect, useState } from 'react';

import { useOurAchievementsBoardState } from '~/pageComponents/AdminPage/store/useOurAchievementsBoardState';
import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';

import { ButtonHelpUs } from '../../ButtonHelpUs/ButtonHelpUs';

import s from './OurAchievements.module.scss';

export interface FormFields {
	issuedSets: string;
	receivedHelp: string;
	donations: string;
	issueDate: string;
}
interface Block {
	title: string;
	number: string;
	unit: string;
	id: number;
}
export function OurAchievements() {
	const [block, setBlock] = useState({
		issuedSets: '0',
		receivedHelp: '0',
		donations: '0',
		issueDate: '0',
	});
	const { ourAchievementsBoardData, getBoardData } = useOurAchievementsBoardState((state) => ({
		ourAchievementsBoardData: state.ourAchievementsBoardData,
		getBoardData: state.getBoardData,
	}));
	
	useEffect(() => {
		getBoardData('achievements');
	}, [getBoardData]);
	useEffect(() => {
		if (ourAchievementsBoardData) {
			setBlock({
				issuedSets: ourAchievementsBoardData.issuedSets.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') || '0',
				receivedHelp: ourAchievementsBoardData.receivedHelp.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') || '0',
				donations: ourAchievementsBoardData.donations.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') || '0',
				issueDate: ourAchievementsBoardData.issueDate || '0',
			});
		}
	}, [ourAchievementsBoardData]);
	const blocks: Block[] = [
		{
			id: 1,
			title: 'Було видано наборів\nгуманітарної допомоги',
			number: `${block.issuedSets}`,
			unit: 'шт',
		},
		{
			id: 2,
			title: 'Було отримано\nгуманітарної допомоги',
			number: `${block.receivedHelp}`,
			unit: 'тонн',
		},
		{ id: 3, title: 'Нам\nзадонатили', number: `${block.donations}`, unit: 'UAH' },
	];

	return (
		<Section className={s.OurAchievements}>
			<Container className={s.flexContainer}>
				<Text variant="h2">Наші досягнення</Text>
				<Text variant="p">За час існування організації</Text>
				<div className={s.blocks}>
					{blocks.map((b) => {
						return (
							<div className={s.block} key={b.id}>
								<div className={s.content}>
									<Text variant="p" className={s.title} lineBreak>
										{b.title}
									</Text>
									<div className={s.achievement}>
										<Text variant="various1">{b.number}</Text>
										<Text variant="p">{b.unit}</Text>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<Text variant="p">*Інформація подана станом на {block.issueDate}</Text>
				<div className={s.button}>
					<ButtonHelpUs />
				</div>
			</Container>
		</Section>
	);
}

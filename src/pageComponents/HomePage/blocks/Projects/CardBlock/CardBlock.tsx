import { Card } from '~/pageComponents/HomePage/blocks/Projects/Card/Card';
import { cardsData } from '~/pageComponents/HomePage/defaultData/projectsContent';
import type { Projects } from '~api/types/projects/Projects';

import s from './CardBlock.module.scss';

interface CardBlockProps {
	handleProductClick: (id: string) => void;
	width: number;
	projects?: Projects;
}

export function CardBlock({ handleProductClick, width, projects }: CardBlockProps) {
	return (
		<div className={s.swipable}>
			{(projects || cardsData).map((card) => (
				<Card
					key={card.mainPicture.image}
					id={card.id || ''}
					src={card.mainPicture.image}
					title={card.subTitle}
					status={card.projectStatus}
					width={width}
					handleProductClick={handleProductClick}
				/>
			))}
		</div>
	);
}

import { cardsData } from '~/data/projectsContent';
import { Card } from '~/pageComponents/HomePage/blocks/Projects/Card/Card';

import s from './CardBlock.module.scss';

interface CardBlockProps {
	handleProductClick: (id: string) => void;
	width: number;
}

export function CardBlock({ handleProductClick, width }: CardBlockProps) {
	return (
		<div className={s.swipable}>
			{cardsData.map((card) => (
				<Card
					key={card.src}
					src={card.src}
					title={card.title}
					status={card.status}
					width={width}
					handleProductClick={handleProductClick}
				/>
			))}
		</div>
	);
}

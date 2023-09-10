import { cardsData } from '~/data/projectsContent';
import { Text } from '~components/Text/Text';
import { useScreenQuery } from '~hooks/useScreenQuery';

import { CarouselScreenMobile } from '../CarouselScreenMobile/CarouselScreenMobile';
import { CarouselScreenTablet } from '../CarouselScreenTablet/CarouselScreenTablet';

import s from './AboutProject.module.scss';

interface AboutProjectProps {
	productId: string | null;
}

export default function AboutProject({ productId }: AboutProjectProps) {
	const { isScreenTabletSm } = useScreenQuery();

	const arrayIndex = cardsData.findIndex((card) => card.id === productId);
	const { description } = cardsData[arrayIndex];

	return (
		<div className={s.blockContent}>
			{isScreenTabletSm ? (
				<CarouselScreenTablet arrayIndex={arrayIndex} />
			) : (
				<CarouselScreenMobile arrayIndex={arrayIndex} />
			)}
			<div className={s.infoContent}>
				<div className={s.about}>
					<Text variant="h3">{description.title}</Text>
					<Text variant="p">{description.text}</Text>
				</div>
				<div className={s.report}>
					<div className={s.reportData}>
						<div className={s.square}>
							<Text variant="h6" className={s.staticText}>
								Площа виконаних робіт:
							</Text>
							<Text variant="h6" className={s.dynamicText}>
								{description.square}
							</Text>
						</div>
						<div className={s.duration}>
							<Text variant="h6" className={s.staticText}>
								Тривалість проєкту:
							</Text>
							<Text variant="h6" className={s.dynamicText}>
								{description.duration}
							</Text>
						</div>
					</div>
					<Text variant="p">{description.patron}</Text>
				</div>
			</div>
		</div>
	);
}

import { cardsData } from '~/pageComponents/HomePage/defaultData/projectsContent';
import type { Projects } from '~api/types/projects/Projects';
import { Text } from '~components/Text/Text';
import { useScreenQuery } from '~hooks/useScreenQuery';

import { CarouselScreenMobile } from '../CarouselScreenMobile/CarouselScreenMobile';
import { CarouselScreenTablet } from '../CarouselScreenTablet/CarouselScreenTablet';

import s from './AboutProject.module.scss';

interface AboutProjectProps {
	productId: string | null;
	projects?: Projects;
}

export default function AboutProject({ productId, projects }: AboutProjectProps) {
	const { isScreenTabletSm } = useScreenQuery();

	const arrayIndex = (projects || cardsData).findIndex((card) => card.id === productId);
	const description = (projects || cardsData)[arrayIndex];

	return (
		<div className={s.blockContent}>
			{isScreenTabletSm ? (
				<CarouselScreenTablet arrayIndex={arrayIndex} projects={projects} />
			) : (
				<CarouselScreenMobile arrayIndex={arrayIndex} projects={projects} />
			)}
			<div className={s.infoContent}>
				<div className={s.about}>
					<Text variant="h3">{description.subTitle}</Text>
					<Text variant="p" lineBreak>
						{description.text}
					</Text>
				</div>
				<div className={s.report}>
					<div className={s.reportData}>
						<div className={s.square}>
							<Text variant="h6" className={s.staticText}>
								Об&apos;єм виконаних робіт:
							</Text>
							<Text variant="h6" className={s.dynamicText}>
								{`${description.areaCompletedWorks}м2`}
							</Text>
						</div>
						<div className={s.duration}>
							<Text variant="h6" className={s.staticText}>
								Тривалість проєкту:
							</Text>
							<Text variant="h6" className={s.dynamicText}>
								{description.projectDuration}
							</Text>
						</div>
					</div>
					<Text variant="p" lineBreak>
						{description.projectText}
					</Text>
				</div>
			</div>
		</div>
	);
}

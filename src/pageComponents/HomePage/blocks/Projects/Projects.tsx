import { useRef, useState } from 'react';

import type { MotionProps } from 'framer-motion';

import { cardsData } from '~/data/projectsContent';
import { Arrow } from '~components/Arrow/Arrow';
import { Button } from '~components/Buttons/Button';
import { Card } from '~components/Card/Card';
import { Carousel } from '~components/Carousel/Carousel';
import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';
import { useHandleDrag } from '~hooks/useHandleDrag';
import { useHandleResize } from '~hooks/useHandleResize';
import { useScreenQuery } from '~hooks/useScreenQuery';

import s from './Projects.module.scss';

export function Projects() {
	const [position, setPosition] = useState(0);
	const [width, setWidth] = useState(0);
	const carousel = useRef<HTMLDivElement>(null);
	const { isScreenTabletMd, isScreenMobileXl } = useScreenQuery();

	const visibleItems = isScreenTabletMd ? 3 : isScreenMobileXl ? 2 : 1;

	const handleResize = () => {
		if (carousel.current?.offsetWidth) {
			setWidth(carousel.current.offsetWidth / visibleItems);
		}
	};

	useHandleResize(handleResize);

	const onRight = () => {
		if (position < cardsData.length - 1 && position !== cardsData.length - visibleItems) {
			setPosition(position + 1);
		}
	};
	const onLeft = () => {
		if (position > 0) {
			setPosition(position - 1);
		}
	};
	const { handleDragEnd, handleDragStart } = useHandleDrag(onRight, onLeft);

	const animation: MotionProps = {
		initial: { scale: 0 },
		animate: {
			left: `${position * -width}px`,
			scale: 1,
		},
		transition: {
			type: 'spring',
			stiffness: 260,
			damping: 20,
		},
		drag: 'x',
		dragConstraints: { left: 0, right: 0 },
		dragElastic: 0.7,
	};

	const CardBlock = () => (
		<div className={s.swipable}>
			{cardsData.map((card) => (
				<Card key={card.src} src={card.src} title={card.title} status={card.status} width={width} />
			))}
		</div>
	);

	return (
		<Section className={s.Projects} id="projects">
			<Container className={s.container}>
				<div className={s.wrapper}>
					<Text variant="h2">Проєкти</Text>
					<Carousel
						ref={carousel}
						animation={animation}
						handleDragEnd={handleDragEnd}
						handleDragStart={handleDragStart}
					>
						<CardBlock />
					</Carousel>
					<div className={s.blockArrow}>
						<Arrow direction className={s.arrow} onClick={onLeft} disabled={position === 0} />
						<Arrow
							className={s.arrow}
							onClick={onRight}
							disabled={position === cardsData.length - visibleItems}
						/>
					</div>
				</div>
				<Button type="secondary" className={s.button}>
					Допомогти нам
				</Button>
			</Container>
		</Section>
	);
}

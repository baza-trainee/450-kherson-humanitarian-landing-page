import { useCallback, useState } from 'react';

import clsx from 'clsx';
import type { MotionProps } from 'framer-motion';
import Image from 'next/image';

import { Carousel3d } from '~/pageComponents/HomePage/blocks/OurActivity/Carousel3d/Carousel3d';
import { images } from '~/pageComponents/HomePage/defaultData/ourActivityData';
import type { OurActivitiesData } from '~api/types/ourActivity/OurActivitiesData';
import { Container } from '~components/Container/Container';
import { Dots } from '~components/Dots/Dots';
import { IconButton } from '~components/IconButton/IconButton';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';
import { BASE_URL } from '~constants/BASE_URL';
import { useScreenQuery } from '~hooks/useScreenQuery';

import s from './OurActivity.module.scss';

interface OurActivityProps {
	ourActivityData?: OurActivitiesData;
}
const addUrl = process.env.NODE_ENV === 'development' ? `${BASE_URL}` : '';

const animationDuration = 0.5;

const wrap = (min: number, max: number, v: number) => {
	const rangeSize = max - min;
	return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

const getCenterXPosition = (slidePosition: string, isScreenTabletSm: boolean) => {
	switch (slidePosition) {
		case 'left':
			return {
				x: 0,
				y: isScreenTabletSm ? 120 : 0,
				scale: 1,
				opacity: 1,
				width: 286,
				height: 346,
				overflow: 'hidden',
				zIndex: 1,
			};
		case 'right':
			return {
				x: 0,
				y: isScreenTabletSm ? 120 : 0,
				scale: 1,
				opacity: 1,
				width: 286,
				height: 346,
				overflow: 'hidden',
				zIndex: 1,
			};
		case 'center':
			return {
				x: 0,
				y: 0,
				scale: 1,
				opacity: 1,
				width: isScreenTabletSm ? 536 : 286,
				height: isScreenTabletSm ? '' : 346,
				overflow: 'hidden',
				zIndex: 2,
			};
		default:
			return {
				x: 0,
				zIndex: 1,
			};
	}
};

const animation: MotionProps = {
	variants: {
		enter: ({ direction }) => {
			return { scale: 0.2, x: direction < 1 ? 20 : -20, opacity: 0 };
		},
		center: ({ slidePosition, isScreenTabletSm }) => {
			return {
				...getCenterXPosition(slidePosition, isScreenTabletSm),
			};
		},
		exit: ({ direction }) => {
			return { scale: 0.2, x: direction < 1 ? 20 : -20, opacity: 0 };
		},
	},
	transition: { duration: animationDuration },
	initial: 'enter',
	animate: 'center',
	exit: 'exit',
	drag: 'x',
	dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
	dragElastic: 0,
};

export function OurActivity({ ourActivityData }: OurActivityProps) {
	const [[activeIndex, direction], setActiveIndex] = useState([
		Math.floor((ourActivityData || images).length / 2),
		-1,
	]);
	const [isAnimating, setIsAnimating] = useState(false);
	const { isScreenDesktopSm, isScreenTabletSm } = useScreenQuery();

	const visibleIndices = (
		ourActivityData ? [...ourActivityData, ...ourActivityData] : [...images, ...images]
	).slice(activeIndex, activeIndex + 3);

	const paginate = useCallback(
		(dir: number) => {
			if (!isAnimating) {
				setIsAnimating(true);
				setActiveIndex([
					wrap(0, (ourActivityData ? ourActivityData : images).length, activeIndex + dir),
					dir,
				]);
				setTimeout(() => {
					setIsAnimating(false);
				}, animationDuration * 1000);
			}
		},
		[activeIndex, isAnimating, ourActivityData],
	);

	const paginateTo = useCallback(
		(index: number) => {
			if (!isAnimating) {
				setIsAnimating(true);
				setActiveIndex((prevState) => {
					return [index, index > prevState[0] ? 1 : -1];
				});
				setTimeout(() => {
					setIsAnimating(false);
				}, animationDuration * 1000);
			}
		},
		[isAnimating],
	);

	return (
		<Section className={s.OurActivity} id="our-activity">
			<Container className={s.container}>
				<Text variant="h2" className={s.title}>
					Наша діяльність
				</Text>
				<div className={s.wrapper}>
					<Carousel3d
						className={s.slider}
						renderContent={(src) => (
							<div className={s.card}>
								<Image
									className={s.img}
									src={ourActivityData ? `${addUrl}${src}` : src}
									alt={src.toString()}
									width={286}
									height={346}
									style={{ objectFit: 'cover' }}
									draggable="false"
									onMouseDown={(e) => e.preventDefault()}
								/>
							</div>
						)}
						animate={animation}
						screens={{ isScreenTabletSm }}
						paginate={paginate}
						direction={direction}
						visibleIndices={visibleIndices}
					/>

					{isScreenDesktopSm && (
						<>
							<IconButton
								icon="icon--arrow-left"
								className={clsx(s.arrow, s.leftArrow)}
								onClick={() => paginate(-1)}
							/>
							<IconButton
								icon="icon--arrow-right"
								className={clsx(s.arrow, s.rightArrow)}
								onClick={() => paginate(1)}
							/>
						</>
					)}
				</div>
				<div className={s.dots}>
					<Dots
						items={ourActivityData || images}
						activeIndex={activeIndex}
						paginateTo={paginateTo}
					/>
				</div>
			</Container>
		</Section>
	);
}

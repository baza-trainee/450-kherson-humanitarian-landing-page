import { useCallback, useState } from 'react';

import type { MotionProps } from 'framer-motion';
import Image from 'next/image';

import { images } from '~/data/ourActivityData';
import { Carousel3d } from '~/pageComponents/HomePage/blocks/OurActivity/Carousel3d/Carousel3d';
import { Arrow } from '~components/Arrow/Arrow';
import { Container } from '~components/Container/Container';
import { Dots } from '~components/Dots/Dots';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';
import { useScreenQuery } from '~hooks/useScreenQuery';

import s from './OurActivity.module.scss';

const animationDuration = 0.5;
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

export function OurActivity() {
	const [[activeIndex, direction], setActiveIndex] = useState([Math.floor(images.length / 2), -1]);
	const [isAnimating, setIsAnimating] = useState(false);
	const { isScreenDesktopSm, isScreenTabletSm } = useScreenQuery();

	const visibleIndices = [...images, ...images].slice(activeIndex, activeIndex + 3);

	const paginate = useCallback(
		(dir: number) => {
			if (!isAnimating) {
				setIsAnimating(true);
				const index = activeIndex + dir;
				if (index >= 0 && index < images.length) {
					setActiveIndex([index, dir]);
				}
				setTimeout(() => {
					setIsAnimating(false);
				}, animationDuration * 1000);
			}
		},
		[activeIndex, isAnimating],
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
				<Text variant="h2">Наша діяльність</Text>
				<div className={s.wrapper}>
					<Carousel3d
						className={s.slider}
						renderContent={(src) => (
							<div className={s.card}>
								<Image
									className={s.img}
									src={src}
									alt={src}
									width={286}
									height={346}
									style={{ objectFit: 'cover' }}
								/>
							</div>
						)}
						animate={animation}
						screens={{ isScreenTabletSm }}
						paginate={paginate}
						direction={direction}
						visibleIndices={visibleIndices}
					/>
					<div className={s.dots}>
						{isScreenDesktopSm && <Dots items={images} activeIndex={activeIndex} paginateTo={paginateTo} />}
					</div>
					<div className={s.blockArrow}>
						<Arrow direction className={s.arrow} onClick={() => paginate(-1)} disabled={activeIndex === 0} />
						<Arrow className={s.arrow} onClick={() => paginate(1)} disabled={activeIndex === images.length - 1} />
					</div>
				</div>
			</Container>
		</Section>
	);
}

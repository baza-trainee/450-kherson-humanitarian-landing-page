/* eslint-disable indent */
import { useCallback, useState } from 'react';

import clsx from 'clsx';
import type { HTMLMotionProps, Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

import { Arrow } from '~components/Arrow/Arrow';
import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';
import { useScreenQuery } from '~hooks/useScreenQuery';

import image1 from '~assets/images/ourActivity/activity-image1.png';
import image2 from '~assets/images/ourActivity/activity-image2.png';
import image3 from '~assets/images/ourActivity/activity-image3.png';
import image4 from '~assets/images/ourActivity/activity-image4.png';

import s from './OurActivity.module.scss';

const images = [image1.src, image2.src, image3.src, image4.src];

const swipePower = (offset: number, velocity: number) => {
	return Math.abs(offset) * velocity;
};

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

const variants: Variants = {
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
};

export function OurActivity() {
	const [[activeIndex, direction], setActiveIndex] = useState([Math.floor(images.length / 2), -1]);
	const { isScreenTabletXl, isScreenTabletSm } = useScreenQuery();

	const paginate = useCallback(
		(dir: number) => {
			setActiveIndex([wrap(0, images.length, activeIndex - dir), dir]);
		},
		[activeIndex],
	);

	const paginateTo = useCallback((index: number) => {
		setActiveIndex((prevState) => {
			return [index, index > prevState[0] ? 1 : -1];
		});
	}, []);

	const handleDrag = useCallback<NonNullable<HTMLMotionProps<'div'>['onDragEnd']>>(
		(e, { offset, velocity }) => {
			(e.target as HTMLDivElement).style.cursor = 'grab';

			const swipe = swipePower(offset.x, velocity.x);

			if (swipe < -1000) {
				paginate(-1);
			} else if (swipe > 1000) {
				paginate(1);
			}
		},
		[paginate],
	);

	const visibleItems = [...images, ...images].slice(activeIndex, activeIndex + 3);

	const getImageIndex = (item: string) => {
		switch (item) {
			case visibleItems[0]:
				return 'left';
			case visibleItems[1]:
				return 'center';
			case visibleItems[2]:
				return 'right';
			default:
				return 'right';
		}
	};

	const getClassName = (item: string) => {
		return `${getImageIndex(item)}`;
	};

	return (
		<Section className={s.OurActivity} id="our-activity">
			<Container className={s.container}>
				<Text variant="h2">Наша діяльність</Text>
				<div className={s.wrapper}>
					<motion.div className={s.slider}>
						<AnimatePresence mode="popLayout" custom={direction} initial={false}>
							{visibleItems.map((item) => {
								return (
									<motion.img
										className={clsx(s.card, `${getClassName(item)}`)}
										key={item}
										layout
										custom={{
											slidePosition: getImageIndex(item),
											isScreenTabletSm: isScreenTabletSm,
											direction,
										}}
										variants={variants}
										initial="enter"
										animate="center"
										exit="exit"
										transition={{ duration: 0.7 }}
										src={item}
										alt={item}
										drag="x"
										dragConstraints={{ left: 0, right: 0 }}
										dragElastic={0}
										onDragStart={(e) => ((e.target as HTMLDivElement).style.cursor = 'grabbing')}
										onDragEnd={handleDrag}
										dragSnapToOrigin={false}
									/>
								);
							})}
						</AnimatePresence>
					</motion.div>
					<div className={s.dots}>
						{isScreenTabletXl &&
							images.map((item, index) => (
								<button
									key={index}
									className={clsx(s.dot, index === activeIndex ? `${s.active}` : '')}
									onClick={() => paginateTo(index)}
								/>
							))}
					</div>
					<div className={s.blockArrow}>
						<Arrow left className={s.arrow} onClick={() => paginate(-1)} />
						<Arrow className={s.arrow} onClick={() => paginate(1)} />
					</div>
				</div>
			</Container>
		</Section>
	);
}

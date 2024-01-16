import { useState } from 'react';

import clsx from 'clsx';
import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';

import type { Heroes } from '~api/types/hero/Heroes';
import { Container } from '~components/Container/Container';
import { Text } from '~components/Text/Text';
import { BASE_URL } from '~constants/BASE_URL';
import { useScreenQuery } from '~hooks/useScreenQuery';

import { content } from '../../defaultData/heroData';
import { Arrows } from './Arrows/Arrows';
import { Buttons } from './Buttons/Buttons';
import { Dots } from './Dots/Dots';

import 'keen-slider/keen-slider.min.css';

import s from './Hero.module.scss';

interface HeroProps {
	heroData?: Heroes;
}

export function Hero({ heroData }: HeroProps) {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);

	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
		{
			initial: 0,
			slideChanged(slider) {
				setCurrentSlide(slider.track.details.rel);
			},
			created() {
				setLoaded(true);
			},
			loop: true,
		},
		[
			(slider) => {
				let timeout: ReturnType<typeof setTimeout>;
				let mouseOver = false;
				function clearNextTimeout() {
					clearTimeout(timeout);
				}
				function nextTimeout() {
					clearTimeout(timeout);
					if (mouseOver) return;
					timeout = setTimeout(() => {
						slider.next();
					}, 3000);
				}
				slider.on('created', () => {
					slider.container.addEventListener('mouseover', () => {
						mouseOver = true;
						clearNextTimeout();
					});
					slider.container.addEventListener('mouseout', () => {
						mouseOver = false;
						nextTimeout();
					});
					nextTimeout();
				});
				slider.on('dragStarted', clearNextTimeout);
				slider.on('animationEnded', nextTimeout);
				slider.on('updated', nextTimeout);
			},
		],
	);

	const { isScreenTabletSm } = useScreenQuery();

	const addUrl = process.env.NODE_ENV === 'development' ? `${BASE_URL}` : '';

	const handleDotClick = (idx: number) => {
		if (instanceRef.current) {
			instanceRef.current.moveToIdx(idx);
		}
	};

	const handlePrevClick = () => {
		if (instanceRef.current) {
			instanceRef.current.prev();
		}
	};

	const handleNextClick = () => {
		if (instanceRef.current) {
			instanceRef.current.next();
		}
	};

	return (
		<div ref={sliderRef} className={clsx('keen-slider', s.container)} id="hero">
			{(heroData || content).map((item, i) => (
				<div key={item.id} className={clsx(s.itemContainer, 'keen-slider__slide')}>
					<Image
						alt="hero-img"
						src={`${addUrl}${item.image}`}
						fill
						className={s.img}
						priority={i === 0}
					/>
					<div className={clsx(s.gradient, s[item.imageGradient])} />
					<Container className={s.content}>
						<div className={s.text}>
							<Text variant="h1" className={clsx(s.heading, s[item.titleColor])} lineBreak>
								{item.title}
							</Text>
							<Text variant="various3" className={s[item.subtitleColor]}>
								{item.subtitle}
							</Text>
						</div>
						<Buttons />
					</Container>
				</div>
			))}

			{isScreenTabletSm ? (
				<Arrows loaded={loaded} onPrevClick={handlePrevClick} onNextClick={handleNextClick} />
			) : (
				<Dots
					loaded={loaded}
					currentSlide={currentSlide}
					slidesCount={
						instanceRef?.current ? instanceRef.current.track.details.slides.length : 0
					}
					onDotClick={handleDotClick}
				/>
			)}
		</div>
	);
}

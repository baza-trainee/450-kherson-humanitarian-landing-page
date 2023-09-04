import { useState } from 'react';

import clsx from 'clsx';
import { useKeenSlider } from 'keen-slider/react';

import { Container } from '~components/Container/Container';
import { Text } from '~components/Text/Text';
import { useScreenQuery } from '~hooks/useScreenQuery';

import { Arrows } from './Arrows/Arrows';
import { Buttons } from './Buttons/Buttons';
import type { ContentItem } from './data/content';
import { content } from './data/content';
import { Dots } from './Dots/Dots';

import 'keen-slider/keen-slider.min.css';

import s from './Hero.module.scss';

export function Hero() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [loaded, setLoaded] = useState(false);
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel);
		},
		created() {
			setLoaded(true);
		},
	});

	const { isScreenTabletSm } = useScreenQuery();

	const handleDotClick = (idx: number) => {
		if (instanceRef.current) {
			instanceRef.current.moveToIdx(idx);
		}
	};

	const handlePrevClick = () => {
		if (instanceRef.current && currentSlide > 0) {
			instanceRef.current.prev();
		}
	};

	const handleNextClick = () => {
		if (instanceRef.current && currentSlide < instanceRef.current.track.details.slides.length - 1) {
			instanceRef.current.next();
		}
	};

	return (
		<div ref={sliderRef} className={clsx('keen-slider', s.container)} id="hero">
			{content.map((item: ContentItem) => (
				<div
					key={item.id}
					className={clsx('keen-slider__slide', s.background, s[item.banner.gradientColor])}
					style={{ '--hero-image-url': `url(${item.banner.src})` } as React.CSSProperties}
				>
					<Container className={s.content}>
						<div className={s.text}>
							<Text variant="h1" className={clsx(s.heading, s[item.title.color])} lineBreak>
								{item.title.value}
							</Text>
							<Text variant="various3" className={s[item.subtitle.color]}>
								{item.subtitle.value}
							</Text>
						</div>
						<Buttons />
					</Container>
				</div>
			))}

			{isScreenTabletSm ? (
				<Arrows
					loaded={loaded}
					onPrevClick={handlePrevClick}
					onNextClick={handleNextClick}
					isPrevDisabled={currentSlide === 0}
					isNextDisabled={
						instanceRef?.current ? currentSlide === instanceRef.current.track.details.slides.length - 1 : true
					}
				/>
			) : (
				<Dots
					loaded={loaded}
					currentSlide={currentSlide}
					slidesCount={instanceRef?.current ? instanceRef.current.track.details.slides.length : 0}
					onDotClick={handleDotClick}
				/>
			)}
		</div>
	);
}

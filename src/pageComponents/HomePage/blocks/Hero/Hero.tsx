import { useState } from 'react';

import clsx from 'clsx';
import { useKeenSlider } from 'keen-slider/react';

import { Arrow } from '~components/Arrow/Arrow';
import { ButtonLink } from '~components/Buttons/ButtonLink';
import { Container } from '~components/Container/Container';
import { Text } from '~components/Text/Text';
import { useScreenQuery } from '~hooks/useScreenQuery';

import { ButtonHelpUs } from '../../ButtonHelpUs/ButtonHelpUs';
import type { ContentItem } from './data/content';
import { content } from './data/content';

import 'keen-slider/keen-slider.min.css';

import s from './Hero.module.scss';

function ArrowKeenSlider(props: { disabled: boolean; left?: boolean; onClick: (e: any) => void }) {
	const direction = props.left ? true : false;
	return <Arrow direction={direction} onClick={props.onClick} disabled={props.disabled} className={s.arrow} />;
}

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

	const buttons = (
		<div className={s.buttonsContainer}>
			<ButtonLink href="#get-help">Отримати допомогу</ButtonLink>
			<ButtonHelpUs />
		</div>
	);

	const dots = loaded && instanceRef.current && (
		<div className={s.dots}>
			{[...Array(instanceRef.current.track.details.slides.length).keys()].map((idx) => {
				return (
					<button
						key={idx}
						onClick={() => {
							instanceRef.current?.moveToIdx(idx);
						}}
						className={clsx(s.dot, currentSlide === idx ? `${s.active}` : '')}
					/>
				);
			})}
		</div>
	);

	const arrows = (
		<div className={s.arrowsContainer}>
			{loaded && instanceRef.current && (
				<div className={s.arrows}>
					<ArrowKeenSlider
						left
						onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
						disabled={currentSlide === 0}
					/>

					<ArrowKeenSlider
						onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
						disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
					/>
				</div>
			)}
		</div>
	);

	const generateSlideClasses = (c: ContentItem) => {
		return clsx('keen-slider__slide', s.bg, s[c.photo]);
	};

	return (
		<div ref={sliderRef} className={clsx('keen-slider', s.container)}>
			{content.map((c: ContentItem) => (
				<div key={c.id} className={generateSlideClasses(c)}>
					<Container className={s.content}>
						<div className={s.text}>
							<Text
								variant="h1"
								className={clsx(s.heading, s[c.title.color], c.title.width && s[c.title.width])}
							>
								{c.title.value}
							</Text>
							<Text variant="various3" className={s[c.subtitle.color]}>
								{c.subtitle.value}
							</Text>
						</div>
						{buttons}
					</Container>
				</div>
			))}

			{isScreenTabletSm ? arrows : dots}
		</div>
	);
}

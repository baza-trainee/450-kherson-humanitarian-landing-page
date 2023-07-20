import React, { useState } from 'react';

import clsx from 'clsx';
import { useKeenSlider } from 'keen-slider/react';

import { Button } from '~components/Buttons/Button';
import { ButtonLink } from '~components/Buttons/ButtonLink';
import { Container } from '~components/Container/Container';
import { Icon } from '~components/Icon/Icon';
import { Text } from '~components/Text/Text';
import { useScreenQuery } from '~hooks/useScreenQuery';

import 'keen-slider/keen-slider.min.css';

import s from './Hero.module.scss';

const headings = [
	'Надаємо гуманітарні набори потребуючим',
	'Відбудовуємо зруйновані та пошкоджені об’єкти (Херсонська область)',
	'Забезпечуємо медичні заклади м. Кривий Ріг, Криворізького району та Херсонської області',
];
const city = 'м. Кривий Ріг';

function Arrow(props: { disabled: boolean; left?: boolean; onClick: (e: any) => void }) {
	return (
		<button className={s.arrow}>
			{props.left && (
				<Icon
					icon="icon--arrow-left"
					colors={{ default: 'var(--color--primary-3)' }}
					onClick={props.onClick}
					disabled={props.disabled}
				></Icon>
			)}
			{!props.left && (
				<Icon
					icon="icon--arrow-right"
					colors={{ default: 'var(--color--primary-3)' }}
					onClick={props.onClick}
					disabled={props.disabled}
				></Icon>
			)}
		</button>
	);
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
		<div className={s.buttonsGap}>
			<ButtonLink href="#GetHelp">Отримати допомогу</ButtonLink>
			<Button type="secondary">Допомогти нам</Button>
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
					></button>
				);
			})}
		</div>
	);

	const arrows = (
		<div className={s.arrows}>
			{loaded && instanceRef.current && (
				<div className={s.arrowsGap}>
					<Arrow
						left
						onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
						disabled={currentSlide === 0}
					/>

					<Arrow
						onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
						disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
					/>
				</div>
			)}
		</div>
	);

	function renderNavigation() {
		return isScreenTabletSm ? arrows : dots;
	}

	return (
		<Container className={s.positionRelative}>
			<div ref={sliderRef} className="keen-slider">
				<div className="keen-slider__slide">
					<div className={clsx(s.content, s.banner1)}>
						<div className={s.text}>
							<Text variant="h1" className={clsx(s.heading, s.blueColor)}>
								{headings[0]}
							</Text>
							<Text variant="various3">{city}</Text>
						</div>
						{buttons}
					</div>
				</div>
				<div className="keen-slider__slide">
					<div className={clsx(s.content, s.banner2)}>
						<div className={s.text}>
							<Text variant="h1" className={clsx(s.whiteColor, s.headingWidth)}>
								{headings[1]}
							</Text>
							<Text variant="various3" className={s.whiteColor}>
								{city}
							</Text>
						</div>
						{buttons}
					</div>
				</div>
				<div className="keen-slider__slide">
					<div className={clsx(s.content, s.banner3)}>
						<div className={s.text}>
							<Text variant="h1" className={clsx(s.whiteColor, s.headingWidth)}>
								{headings[2]}
							</Text>
							<Text variant="various3" className={s.whiteColor}>
								{city}
							</Text>
						</div>
						{buttons}
					</div>
				</div>
			</div>
			{renderNavigation()}
		</Container>
	);
}

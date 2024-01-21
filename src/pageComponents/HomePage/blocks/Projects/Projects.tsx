import { useRef, useState } from 'react';

import type { MotionProps } from 'framer-motion';

import { cardsData } from '~/pageComponents/HomePage/defaultData/projectsContent';
import type { Projects } from '~api/types/projects/Projects';
import { Carousel } from '~components/Carousel/Carousel';
import { Container } from '~components/Container/Container';
import { IconButton } from '~components/IconButton/IconButton';
import { ModalPop } from '~components/ModalPop/ModalPop';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';
import { useHandleDrag } from '~hooks/useHandleDrag';
import { useHandleResize } from '~hooks/useHandleResize';
import { useScreenQuery } from '~hooks/useScreenQuery';

import { ButtonHelpUs } from '../../ButtonHelpUs/ButtonHelpUs';
import AboutProject from './AboutProject/AboutProject';
import { CardBlock } from './CardBlock/CardBlock';

import s from './Projects.module.scss';

interface ProjectsProps {
	projects?: Projects;
}

export function Projects({ projects }: ProjectsProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState(0);
	const [width, setWidth] = useState(0);
	const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

	const carousel = useRef<HTMLDivElement>(null);

	const { isScreenTabletMd, isScreenMobileXl } = useScreenQuery();

	let visibleItems = 1;
	if (isScreenMobileXl) visibleItems = 2;
	if (isScreenTabletMd) visibleItems = 3;

	const gap = 24;
	let widthWithGap = 0;
	if (isScreenMobileXl) widthWithGap = gap / visibleItems;
	if (isScreenTabletMd) widthWithGap = (gap * 2) / visibleItems;

	const handleResize = () => {
		if (carousel.current?.offsetWidth) {
			setWidth(carousel.current.offsetWidth / visibleItems - widthWithGap);
		}
	};

	useHandleResize(handleResize);

	const onRight = () => {
		if (
			position < (projects || cardsData).length - 1 &&
			position !== (projects || cardsData).length - visibleItems
		) {
			setPosition(position + 1);
		}
	};
	const onLeft = () => {
		if (position > 0) {
			setPosition(position - 1);
		}
	};

	const openModal = () => {
		setIsOpen(true);
	};

	const { handleDragEnd, handleDragStart, handleOpenModal } = useHandleDrag({
		callbackRight: onRight,
		callbackLeft: onLeft,
		openModal: openModal,
	});

	const handleProductClick = (id: string) => {
		setSelectedProductId(id);
		handleOpenModal();
	};

	const animation: MotionProps = {
		initial: { scale: 0 },
		animate: {
			left: `${position * (-width - gap)}px`,
			scale: 1,
		},
		drag: 'x',
		dragConstraints: { left: 0, right: 0 },
		dragElastic: 0.2,
	};

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
						<CardBlock
							handleProductClick={handleProductClick}
							width={width}
							projects={projects}
						/>
					</Carousel>
					<div className={s.blockArrow}>
						<IconButton
							icon="icon--arrow-left"
							className={s.arrow}
							onClick={onLeft}
							disabled={position === 0}
						/>
						<IconButton
							icon="icon--arrow-right"
							className={s.arrow}
							onClick={onRight}
							disabled={position === (projects || cardsData).length - visibleItems}
						/>
					</div>
				</div>
				<div className={s.button}>
					<ButtonHelpUs />
				</div>
				{isOpen && (
					<ModalPop title="Проєкти" isOpen={isOpen} onClose={() => setIsOpen(!isOpen)}>
						<section className={s.projectContainer}>
							<div className={s.aboutProject}>
								<AboutProject productId={selectedProductId} projects={projects} />
							</div>
						</section>
					</ModalPop>
				)}
			</Container>
		</Section>
	);
}

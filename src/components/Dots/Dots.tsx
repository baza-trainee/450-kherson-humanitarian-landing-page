import clsx from 'clsx';
import { motion } from 'framer-motion';
import type { StaticImageData } from 'next/image';

import s from './Dots.module.scss';

interface Props {
	items: {
		id?: string;
		image: string | StaticImageData;
	}[];
	activeIndex: number;
	paginateTo: (index: number) => void;
}

export function Dots({ items, activeIndex, paginateTo }: Props) {
	return (
		<>
			{items.map((el, index) => {
				const dotClass = clsx(s.dot, index === activeIndex && s.active);
				return (
					<motion.button
						key={el.id}
						initial={false}
						className={dotClass}
						animate={{
							scale: index === activeIndex ? 1.5 : 1,
							opacity: index === activeIndex ? 1 : 0.5,
						}}
						onClick={() => paginateTo(index)}
					/>
				);
			})}
		</>
	);
}

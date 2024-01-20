import clsx from 'clsx';
import { motion } from 'framer-motion';

import s from './Dots.module.scss';

interface Props {
	items: { image: string }[];
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
						key={el.image}
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

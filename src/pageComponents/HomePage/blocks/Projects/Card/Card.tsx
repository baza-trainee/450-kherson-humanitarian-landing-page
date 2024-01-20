import clsx from 'clsx';
import Image from 'next/image';

import { labelData } from '~/pageComponents/HomePage/defaultData/projectsContent';
import { Text } from '~components/Text/Text';
import { BASE_URL } from '~constants/BASE_URL';

import s from './Card.module.scss';

interface CardProps {
	id: string;
	src: string;
	title: string;
	status: string;
	width?: number;
	handleProductClick: (id: string) => void;
}

export function Card({ id, src, title, status, width, handleProductClick }: CardProps) {
	const handleClick = () => {
		handleProductClick(id);
	};

	const label = labelData.map(({ name, className, text }) => {
		if (status === name) {
			return (
				<div key={name} className={clsx(s.label, s[className])}>
					<Text variant="h4" className={s.status}>
						{text}
					</Text>
				</div>
			);
		}
	});
	const addUrl = process.env.NODE_ENV === 'development' ? `${BASE_URL}` : '';

	return (
		<div className={s.container} style={{ width: `${width}px` }}>
			<div className={s.card} onClick={handleClick}>
				<Image
					className={s.img}
					src={`${addUrl}${src}`}
					alt={src}
					width={410}
					height={296}
					style={{ objectFit: 'cover', width: `${width}px`, height: 'auto' }}
					priority
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					draggable="false"
					onMouseDown={(e) => e.preventDefault()}
				/>
				<Text variant="h5" className={s.text}>
					{title}
				</Text>
				{label}
			</div>
		</div>
	);
}

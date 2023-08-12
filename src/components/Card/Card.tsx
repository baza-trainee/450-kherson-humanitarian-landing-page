import clsx from 'clsx';
import Image from 'next/image';

import { labelData } from '~/data/projectsContent';
import { Text } from '~components/Text/Text';

import s from './Card.module.scss';

interface CardProps {
	src: string;
	title: string;
	status: StatusObject;
	width?: number;
}

type StatusObject = Record<string, boolean>;

export function Card({ src, title, status, width }: CardProps) {
	const findTrueKey = (obj: StatusObject) => {
		for (const key in obj) {
			if (obj[key] === true) {
				return key;
			}
		}
		return null;
	};

	const label = labelData.map(({ name, className, text }) => {
		if (findTrueKey(status) === name) {
			return (
				<div key={name} className={clsx(s.label, s[className])}>
					<Text variant="h4" className={s.status}>
						{text}
					</Text>
				</div>
			);
		}
	});

	return (
		<div className={s.container} style={{ width: `${width}px` }}>
			<div className={s.card}>
				<Image
					className={s.img}
					src={src}
					alt={src}
					width={410}
					height={296}
					style={{ objectFit: 'cover', width: `${width}px` }}
					priority
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
				<Text variant="h5" className={s.text}>
					{title}
				</Text>
				{label}
			</div>
		</div>
	);
}

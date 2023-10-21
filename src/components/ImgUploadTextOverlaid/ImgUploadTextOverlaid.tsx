import type { FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { ImgUpload } from '~components/ImgUpload/ImgUpload';
import { Text } from '~components/Text/Text';

import s from './ImgUploadTextOverlaid.module.scss';

interface ImgUploadTextOverlaidProps {
	gradientValue: string;
	titleValue: string;
	subtitleValue: string;
	titleColor: string;
	subtitleColor: string;
	register?: FieldValues;
	watch?: (name: string) => FieldValues;
}

export function ImgUploadTextOverlaid({
	gradientValue,
	titleValue,
	subtitleValue,
	titleColor,
	subtitleColor,
	register,
	watch,
}: ImgUploadTextOverlaidProps) {
	return (
		<div className={s.ImgUpload}>
			<ImgUpload register={register} watch={watch} />
			<div className={clsx(s.ImgGradient, s[gradientValue])} />
			<div className={s.text}>
				<Text variant="h2" className={clsx(s.heading, s[titleColor])} lineBreak>
					{titleValue}
				</Text>
				<Text variant="various3" className={clsx(s.sub, s[subtitleColor])}>
					{subtitleValue}
				</Text>
			</div>
		</div>
	);
}

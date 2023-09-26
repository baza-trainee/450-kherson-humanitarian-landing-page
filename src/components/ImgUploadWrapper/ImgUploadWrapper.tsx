import clsx from 'clsx';

import { ImgUpload } from '~components/ImgUpload/ImgUpload';
import { Text } from '~components/Text/Text';

import s from './ImgUploadWrapper.module.scss';
interface ImgUploadProps{
	gradientValue?: string;
	titleValue?: string;
	subtitleValue?: string;
	titleColor?: 'blue' | 'black' | 'white';
	subtitleColor?: 'blue' | 'black' | 'white';
}
export function ImgUploadWrapper({gradientValue = 'noGradient',
	titleValue = 'Надаємо гуманітарні набори потребуючим',
	subtitleValue = 'м. Кривий Ріг',
	titleColor = 'blue',
	subtitleColor = 'black'}: ImgUploadProps){
	return(
		<div className={s.ImgUpload}>
			<ImgUpload />
			<div className={clsx(s.ImgGradient, s[gradientValue])}/>
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

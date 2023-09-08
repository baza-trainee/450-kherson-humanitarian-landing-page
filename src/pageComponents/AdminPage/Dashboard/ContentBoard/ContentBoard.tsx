import { useState } from 'react';

import { ColorRadioBlock } from '~components/ColorRadio/ColorRadioBlock';
import { ImgUpload } from '~components/ImgUpload/ImgUpload';

import s from './ContentBoard.module.scss';

interface ContentBoardProps {
	nothing?: unknown;
}

export function ContentBoard({ nothing }: ContentBoardProps) {
	const [gradient, setGradient] = useState<string>('noGradient');
	const changeRadio = (value: string): void => {
		setGradient(value);
	};
	return (
		<div className={s.ContentBoard}>
			<ImgUpload gradientValue={gradient}/>
			<ColorRadioBlock block='imgGradient' changeRadio={changeRadio}/>

			<p>ContentBoard</p>
			<p>ContentBoard</p>

			<ColorRadioBlock block='textColor' />
		</div>
	);
}

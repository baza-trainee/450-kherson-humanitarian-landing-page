import { ColorRadioBlock } from '~components/ColorRadio/ColorRadioBlock';
import { ImgUpload } from '~components/ImgUpload/ImgUpload';

import s from './ContentBoard.module.scss';
import { useState } from 'react';

interface ContentBoardProps {
	nothing?: unknown;
}

export function ContentBoard({ nothing }: ContentBoardProps) {
	const [shadow, setShadow] = useState<string>('noShadow');
	const changeRadio = (value: string): void => {
		setShadow(value);
	}
	return (
		<div className={s.ContentBoard}>
			<ImgUpload shadowValue={shadow}/>
			<ColorRadioBlock block='imgShadow' changeRadio={changeRadio}/>

			<p>ContentBoard</p>
			<p>ContentBoard</p>

			<ColorRadioBlock block='textColor' />
		</div>
	);
}

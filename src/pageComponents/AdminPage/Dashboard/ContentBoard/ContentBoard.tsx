import { ColorRadioBlock } from '~components/ColorRadio/ColorRadioBlock';
import { ImgUpload } from '~components/ImgUpload/ImgUpload';

import s from './ContentBoard.module.scss';

interface ContentBoardProps {
	nothing?: unknown;
}

export function ContentBoard({ nothing }: ContentBoardProps) {
	return (
		<div className={s.ContentBoard}>
			<ImgUpload />
			<ColorRadioBlock block='imgShadow' />

			<p>ContentBoard</p>
			<p>ContentBoard</p>

			<ColorRadioBlock block='textColor' />
		</div>
	);
}

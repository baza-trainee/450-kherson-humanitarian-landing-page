import { ColorPickBlock } from '~components/ColorPick/ColorPickBlock';
import { ImgUpload } from '~components/ImgUpload/ImgUpload';

import s from './ContentBoard.module.scss';

interface ContentBoardProps {
	nothing?: unknown;
}

export function ContentBoard({ nothing }: ContentBoardProps) {
	return (
		<div className={s.ContentBoard}>
			<ImgUpload />
			<ColorPickBlock block='imgShadow' />

			<p>ContentBoard</p>
			<p>ContentBoard</p>

			<ColorPickBlock block='textColor' />
		</div>
	);
}

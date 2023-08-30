import { ColorPick } from '~components/ColorPick/ColorPick';
import { ImgUpload } from '~components/ImgUpload/ImgUpload';

import s from './ContentBoard.module.scss';

interface ContentBoardProps {
	nothing?: unknown;
}

export function ContentBoard({ nothing }: ContentBoardProps) {
	return (
		<div className={s.ContentBoard}>
			<ImgUpload />
			<div className={s.colorPickBlock}>
				<ColorPick nameColorPick="imgShadow" valueColorPick="noShadow" isCheckedColorPick={true} />
				<ColorPick nameColorPick="imgShadow" valueColorPick="shadow" />
			</div>

			<p>ContentBoard</p>
			<p>ContentBoard</p>
		</div>
	);
}

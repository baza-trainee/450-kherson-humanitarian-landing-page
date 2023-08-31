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
				<ColorPick nameColorPick="imgShadow" valueColorPick="whiteShadow" textValue={'світлий градієнт'} isCheckedColorPick={true} />
				<ColorPick nameColorPick="imgShadow" valueColorPick="darkShadow" textValue={'темний градієнт'} />
				<ColorPick nameColorPick="imgShadow" valueColorPick="noShadow" textValue={'без градієнту'} />
			</div>

			<p>ContentBoard</p>
			<p>ContentBoard</p>
			<div className={s.colorPickBlock}>
				<ColorPick nameColorPick="imgColor" valueColorPick="blue" isCheckedColorPick={true} />
				<ColorPick nameColorPick="imgColor" valueColorPick="black" />
				<ColorPick nameColorPick="imgColor" valueColorPick="white" />
			</div>
		</div>
	);
}

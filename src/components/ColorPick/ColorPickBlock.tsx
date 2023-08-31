import { ColorPick } from './ColorPick';
import { colorPickList } from './data/colorPickList';

import s from './ColorPick.module.scss';
interface ColorPickBlockProps {
	block: string;
}
export function ColorPickBlock({ block }: ColorPickBlockProps) {
	const colorPickIndex = colorPickList.findIndex((item) => item.block === block);
	return (
		<div className={s.colorPickBlock}>
			{colorPickList[colorPickIndex].fieldList.map((item, i) => (
				<ColorPick key={i} nameColorPick={item.name} valueColorPick={item.value} textValue={item.text} isCheckedColorPick={item.isChecked} />
			))}
		</div>
	);
}

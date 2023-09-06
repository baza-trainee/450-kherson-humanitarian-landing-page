import { ColorRadio } from './ColorRadio';
import { ColorRadioList } from './data/ColorRadioList';

import s from './ColorRadio.module.scss';
interface ColorRadioBlockProps {
	block: string;
}
export function ColorRadioBlock({ block }: ColorRadioBlockProps) {
	const ColorRadioIndex = ColorRadioList.findIndex((item) => item.block === block);
	return (
		<div className={s.ColorRadioBlock}>
			{ColorRadioList[ColorRadioIndex].fieldList.map((item, i) => (
				<ColorRadio key={i} nameColorRadio={item.name} valueColorRadio={item.value} textValue={item.text} isCheckedColorRadio={item.isChecked} />
			))}
		</div>
	);
}
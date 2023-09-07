import { ColorRadio } from './ColorRadio';
import { ColorRadioList } from './data/ColorRadioList';

import s from './ColorRadio.module.scss';
interface ColorRadioBlockProps {
	block: string;
	changeRadio?: (value: string) => void;
}
export function ColorRadioBlock({ block, changeRadio }: ColorRadioBlockProps) {
	const ColorRadioIndex = ColorRadioList.findIndex((item) => item.block === block);
	return (
		<div className={s.ColorRadioBlock}>
			{ColorRadioList[ColorRadioIndex].fieldList.map((item, i) => (
				<ColorRadio
					key={i}
					nameColorRadio={item.name}
					valueColorRadio={item.value}
					textValue={item.text}
					isCheckedColorRadio={item.isChecked}
					changeRadio={changeRadio}/>
			))}
		</div>
	);
}

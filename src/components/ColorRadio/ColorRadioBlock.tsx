import { ColorRadio } from './ColorRadio';
import { ColorRadioList } from './data/ColorRadioList';

import s from './ColorRadio.module.scss';
interface ColorRadioBlockProps {
	block: string;
	changeRadio?: (value: string, name: string) => void;
}
export function ColorRadioBlock({ block, changeRadio }: ColorRadioBlockProps) {
	const ColorRadioIndex = ColorRadioList.findIndex((item) => item.block === block);
	return (
		<div className={s.ColorRadioBlock}>
			{ColorRadioList[ColorRadioIndex].fieldList.map((item, i) => (
				<ColorRadio
					key={i}
					name={item.name}
					value={item.value}
					id={item.id}
					isChecked={item.isChecked}
					changeRadio={changeRadio}/>
			))}
		</div>
	);
}

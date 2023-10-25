import type { FieldValues } from 'react-hook-form';

import { ColorRadio } from './ColorRadio';
import { ColorRadioList } from './data/ColorRadioList';

import s from './ColorRadio.module.scss';
interface ColorRadioBlockProps {
	block: string;
	changeRadio?: (value: string, name: string) => void;
	register?: FieldValues;
	value?: string;
	watch?: (name: string) => FieldValues;
}
export function ColorRadioBlock({ block, changeRadio, register, value, watch }: ColorRadioBlockProps) {
	const ColorRadioIndex = ColorRadioList.findIndex((item) => item.block === block);
	return (
		<div className={s.ColorRadioBlock}>
			{ColorRadioList[ColorRadioIndex].fieldList.map((item, i) => (
				<ColorRadio
					key={i}
					name={item.name}
					value={item.value}
					id={item.id}
					isChecked={item.value === value ? true : item.isChecked}
					changeRadio={changeRadio}
					register={register}
					watch={watch}
				/>
			))}
		</div>
	);
}

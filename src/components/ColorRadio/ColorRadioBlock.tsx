import type { FieldValues } from 'react-hook-form';

import { ColorRadio } from './ColorRadio';
import { ColorRadioList } from './data/ColorRadioList';

import s from './ColorRadio.module.scss';
interface ColorRadioBlockProps {
	block: string;
	register?: FieldValues;
	watch?: (name: string) => FieldValues;
}
export function ColorRadioBlock({ block, register, watch }: ColorRadioBlockProps) {
	const ColorRadioIndex = ColorRadioList.findIndex((item) => item.block === block);
	return (
		<div className={s.ColorRadioBlock}>
			{ColorRadioList[ColorRadioIndex].fieldList.map((item, i) => (
				<ColorRadio
					key={i}
					name={item.name}
					value={item.value}
					id={item.id}
					register={register}
					watch={watch}
					isChecked={item.isChecked}
				/>
			))}
		</div>
	);
}

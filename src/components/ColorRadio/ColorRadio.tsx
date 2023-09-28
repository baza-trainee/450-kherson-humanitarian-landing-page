import type { FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { Icon } from '~components/Icon/Icon';

import s from './ColorRadio.module.scss';

interface ColorRadioProps {
	name: string;
	value: string;
	id: string;
	isChecked?: boolean;
	changeRadio?: (value: string, name: string) => void;
	register?: FieldValues;
}

export function ColorRadio({ name, value, id, isChecked, changeRadio, register }: ColorRadioProps) {
	const getRadioValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (changeRadio) {
			changeRadio(event.target.value, event.target.name);
		}
	};
	return (
		<label htmlFor={id} className={s.label}>
			<input type="radio" name={name} value={value} id={id} defaultChecked={isChecked} className={s.input} onChange={getRadioValue} {...register}/>
			<span className={clsx(s.bgSpan, s[value])} />
			{(value === 'blue' || value === 'black') ?
				<Icon icon="icon--checked" className={s.icon} size="custom" width="12px" height="10px" colors={{default: 'var(--color--shades-1)'}}/> :
				<Icon icon="icon--checked" className={s.icon} size="custom" width="12px" height="10px" />}
		</label >
	);
}

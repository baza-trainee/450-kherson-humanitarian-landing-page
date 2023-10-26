import { forwardRef, useEffect } from 'react';
import type { FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { Icon } from '~components/Icon/Icon';

import s from './ColorRadio.module.scss';

export type ColorRadioElement = HTMLInputElement;

interface ColorRadioProps {
	name: string;
	value: string;
	id: string;
	isChecked?: boolean;
	changeRadio?: (value: string, name: string) => void;
	register?: FieldValues;
	watch?: (name: string) => FieldValues;
}

export const ColorRadio = forwardRef<ColorRadioElement, ColorRadioProps>(
	({ name, value, id, isChecked, changeRadio, register, watch }, ref) => {
		const radioValue = watch ? watch(register ? register.name : null) : null;

		useEffect(() => {
			if (watch && radioValue && changeRadio) {
				if (typeof radioValue === 'string') changeRadio(radioValue, name);
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [radioValue]);

		return (
			<label htmlFor={id} className={s.label}>
				<input
					type="radio"
					name={name}
					value={value}
					id={id}
					defaultChecked={isChecked}
					className={s.input}
					ref={ref}
					{...register}
				/>
				<span className={clsx(s.bgSpan, s[value])} />
				{value === 'blue' || value === 'black' ? (
					<Icon
						icon="icon--checked"
						className={s.icon}
						size="custom"
						width="12px"
						height="10px"
						colors={{ default: 'var(--color--shades-1)' }}
					/>
				) : (
					<Icon icon="icon--checked" className={s.icon} size="custom" width="12px" height="10px" />
				)}
			</label>
		);
	},
);

ColorRadio.displayName = 'ColorRadio';

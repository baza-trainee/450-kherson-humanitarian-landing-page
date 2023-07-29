import { forwardRef } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { Text } from '~components/Text/Text';

import type { InputWrapperCommonProps } from '../InputWrapper/InputWrapper';
import { InputWrapper } from '../InputWrapper/InputWrapper';

import cs from '../commonStyle.module.scss';
import s from './Tabs.module.scss';

export type TabsElement = HTMLInputElement;

export interface TabsProps extends ReactHTMLElementAttributes<TabsElement>, InputWrapperCommonProps {
	name: string;
	labels: (string | number)[];
	defaultValue?: string;
	register?: FieldValues;
	errors?: FieldErrors<FieldValues>;
}

export const Tabs = forwardRef<TabsElement, TabsProps>(
	({ label, required, disabled, register, errors, name, defaultValue, labels, className, ...rest }, ref) => {
		const error = errors ? errors[register?.name]?.message?.toString() : '';
		const componentClass = [error && cs.error, disabled && cs.disabled, className];

		return (
			<InputWrapper
				label={label}
				error={error}
				required={required}
				disabled={disabled}
				className={clsx(componentClass)}
			>
				<div className={s.elementsContainer}>
					{labels.map((value) => (
						<label key={value} className={s.element}>
							<input
								type="radio"
								className={s.input}
								value={value.toString()}
								ref={ref}
								name={name}
								checked={defaultValue?.toString() === value.toString()}
								{...register}
								{...rest}
							/>
							<Text variant="h4" className={s.label}>
								{value}
							</Text>
							<div className={s.underline} />
						</label>
					))}
				</div>
			</InputWrapper>
		);
	},
);

Tabs.displayName = 'Tabs';

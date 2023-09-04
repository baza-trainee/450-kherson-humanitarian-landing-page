import { forwardRef } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { Text } from '~components/Text/Text';

import type { InputWrapperCommonProps } from '../InputWrapper/InputWrapper';
import { InputWrapper } from '../InputWrapper/InputWrapper';

import cs from '../commonStyle.module.scss';
import s from './Checkbox.module.scss';

export type CheckboxElement = HTMLInputElement;

export interface CheckboxProps extends ReactHTMLElementAttributes<CheckboxElement>, InputWrapperCommonProps {
	text: string;
	register?: FieldValues;
	errors?: FieldErrors<FieldValues>;
}

export const Checkbox = forwardRef<CheckboxElement, CheckboxProps>(
	({ label, text, required, disabled, register, errors, className, children, ...rest }, ref) => {
		const error = errors ? errors[register?.name]?.message?.toString() : '';
		const componentClass = [error && cs.error, disabled && cs.disabled, className];

		return (
			<InputWrapper
				label={label}
				error={error}
				required={required}
				disabled={disabled}
				className={clsx(componentClass)}
				showError={!!errors}
			>
				<div className={s.elementsContainer}>
					<label className={s.element}>
						<input type="checkbox" value={text} className={s.input} ref={ref} {...register} {...rest} />
						{children ? (
							<>{children}</>
						) : (
							<Text variant="p" className={s.label}>
								{text}
							</Text>
						)}
					</label>
				</div>
			</InputWrapper>
		);
	},
);

Checkbox.displayName = 'Checkbox';

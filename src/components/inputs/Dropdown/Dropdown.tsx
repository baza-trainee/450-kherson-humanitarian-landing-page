import { forwardRef } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { Icon } from '~components/Icon/Icon';

import { InputWrapper } from '../InputWrapper/InputWrapper';

import cs from '../commonStyle.module.scss';
import s from './Dropdown.module.scss';

export type DropdownElement = HTMLSelectElement;

export interface DropdownProps extends ReactHTMLElementAttributes<DropdownElement> {
	label?: string;
	options: string[];
	register?: FieldValues;
	errors?: FieldErrors<FieldValues>;
	showError?: boolean;
	infoMessage?: string;
	showInfo?: boolean;
	required?: boolean;
	disabled?: boolean;
	defaultValue?: string;
}

export const Dropdown = forwardRef<DropdownElement, DropdownProps>(
	(
		{
			label,
			placeholder,
			required,
			disabled,
			options,
			register,
			errors,
			showError,
			infoMessage,
			showInfo,
			defaultValue,
			className,
			...rest
		},
		ref,
	) => {
		const isError = errors?.[register?.name] ? true : false;
		const errorMessage = errors?.[register?.name]?.message?.toString() || '';

		const componentClass = [isError && cs.error, disabled && cs.disabled];

		return (
			<label className={className}>
				<InputWrapper
					label={label}
					isError={isError}
					required={required}
					disabled={disabled}
					className={clsx(componentClass)}
					errorMessage={errorMessage}
					showError={showError}
					infoMessage={infoMessage || ''}
					showInfo={showInfo}
				>
					<div className={s.inputContainer}>
						<select
							className={clsx(s.input, cs.input)}
							defaultValue={defaultValue || ''}
							ref={ref}
							{...register}
							{...rest}
						>
							{placeholder && (
								<option value="" disabled>
									{placeholder}
								</option>
							)}
							{options.map((optionValue) => (
								<option key={optionValue} value={optionValue}>
									{optionValue}
								</option>
							))}
						</select>
						<Icon className={s.icon} icon="icon--chevron-down" />
					</div>
				</InputWrapper>
			</label>
		);
	},
);

Dropdown.displayName = 'Dropdown';

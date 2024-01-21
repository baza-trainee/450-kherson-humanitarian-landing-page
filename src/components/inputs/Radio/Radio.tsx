import { forwardRef } from 'react';
import type { FieldErrors, FieldValues } from 'react-hook-form';

import clsx from 'clsx';

import { Text } from '~components/Text/Text';

import type { InputWrapperCommonProps } from '../InputWrapper/InputWrapper';
import { InputWrapper } from '../InputWrapper/InputWrapper';

import cs from '../commonStyle.module.scss';
import s from './Radio.module.scss';

export type RadioElement = HTMLInputElement;

export interface RadioProps
	extends ReactHTMLElementAttributes<RadioElement>,
		InputWrapperCommonProps {
	name: string;
	value: string;
	text: string;
	register?: FieldValues;
	errors?: FieldErrors<FieldValues>;
	showError?: boolean;
	infoMessage?: string;
	showInfo?: boolean;
}

export const Radio = forwardRef<RadioElement, RadioProps>(
	(
		{
			label,
			text,
			value,
			name,
			required,
			disabled,
			register,
			errors,
			showError,
			infoMessage,
			showInfo,
			className,
			children,
			...rest
		},
		ref,
	) => {
		const isError = errors?.[register?.name] ? true : false;
		const errorMessage = errors?.[register?.name]?.message?.toString() || '';

		const componentClass = [isError && cs.error, disabled && cs.disabled, className];

		return (
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
				<div className={s.elementsContainer}>
					<label className={s.element}>
						<input
							type="radio"
							name={name}
							value={value}
							className={s.input}
							ref={ref}
							{...register}
							{...rest}
						/>
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

Radio.displayName = 'Radio';

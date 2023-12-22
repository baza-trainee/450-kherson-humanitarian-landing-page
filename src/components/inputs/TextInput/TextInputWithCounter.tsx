import { forwardRef, useState } from 'react';

import type { TextInputElement, TextInputProps } from './TextInput';
import { TextInput } from './TextInput';

export type TextInputWithCounterElement = TextInputElement;

export interface TextInputWithCounterProps extends Omit<TextInputProps, 'info'> {
	maxLength: number;
}

export const TextInputWithCounter = forwardRef<
	TextInputWithCounterElement,
	TextInputWithCounterProps
>(
	(
		{
			label,
			required,
			disabled,
			register,
			errors,
			placeholder,
			size,
			maxLength,
			className,
			...rest
		},
		ref,
	) => {
		const [value, setValue] = useState('');

		const countMessage = `Символів ${value.length}/${maxLength}`;
		const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = event.target.value;
			setValue(newValue);
			register?.onChange(event);
		};

		return (
			<TextInput
				label={label}
				required={required}
				errors={errors}
				disabled={disabled}
				infoMessage={countMessage}
				showInfo={true}
				placeholder={placeholder}
				size={size}
				maxLength={maxLength}
				register={register}
				onChange={handleInputChange}
				className={className}
				{...rest}
				ref={ref}
			/>
		);
	},
);

TextInputWithCounter.displayName = 'TextInputWithCounter';

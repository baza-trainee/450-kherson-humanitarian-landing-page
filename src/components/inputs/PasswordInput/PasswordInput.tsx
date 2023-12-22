import { forwardRef, useState } from 'react';

import { Icon } from '~components/Icon/Icon';

import { TextInput, type TextInputProps } from '../TextInput/TextInput';

import ics from '../iconCommonStyle.module.scss';

export type TextInputElement = HTMLInputElement;

export type PasswordInputProps = Omit<TextInputProps, 'type'>;

export const PasswordInput = forwardRef<TextInputElement, PasswordInputProps>(
	({ className, ...rest }, ref) => {
		const [isShowPassword, setIsShowPassword] = useState(false);

		const handlerIconClick = (event: React.MouseEvent<HTMLElement>) => {
			event.stopPropagation();
			setIsShowPassword((prev) => !prev);
		};

		const inputType = isShowPassword ? 'text' : 'password';
		const icon = isShowPassword ? 'icon--eye-off' : 'icon--eye';

		return (
			<>
				<TextInput type={inputType} className={className} {...rest} ref={ref}>
					<Icon
						icon={icon}
						className={ics.icon}
						colors={{ default: 'var(--color--primary-3)' }}
						onClick={handlerIconClick}
					/>
				</TextInput>
			</>
		);
	},
);

PasswordInput.displayName = 'PasswordInput';

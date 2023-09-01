import { forwardRef } from 'react';

import clsx from 'clsx';

import { Text } from '~components/Text/Text';
import type { NotificationTypes } from '~components/types/NotificationTypes';

import s from './Label.module.scss';

export type LabelElement = HTMLDivElement;

export interface LabelProps extends ReactHTMLElementAttributes<LabelElement> {
	type: NotificationTypes;
	children: string;
}

export const Label = forwardRef<LabelElement, LabelProps>(({ type, children, ...rest }, ref) => {
	return (
		<div className={s.elementContainer} ref={ref} {...rest}>
			<Text variant="h4" key={type} className={clsx(s.label, s[type])}>
				{children}
			</Text>
		</div>
	);
});

Label.displayName = 'Label';

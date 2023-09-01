import { forwardRef } from 'react';

import clsx from 'clsx';

import { labelData } from '~/data/projectsContent';
import { Text } from '~components/Text/Text';

import s from './Label.module.scss';

export type LabelElement = HTMLDivElement;

export interface LabelProps extends ReactHTMLElementAttributes<LabelElement> {
	status: string;
}

export const Label = forwardRef<LabelElement, LabelProps>(({ status, ...rest }, ref) => {
	const labelText = labelData.map(({ name, className, text }) => {
		if (status === name) {
			return (
				<Text variant="h4" key={name} className={clsx(s.label, s[className])}>
					{text}
				</Text>
			);
		}
	});

	return (
		<div className={s.elementContainer} ref={ref} {...rest}>
			{labelText}
		</div>
	);
});

Label.displayName = 'Label';

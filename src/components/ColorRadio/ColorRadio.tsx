import clsx from 'clsx';

import { Text } from '~components/Text/Text';

import s from './ColorRadio.module.scss';
import { Icon } from '~components/Icon/Icon';

interface ColorRadioProps {
	nameColorRadio: string;
	valueColorRadio: string;
	isCheckedColorRadio?: boolean;
	textValue?: string;
}

export function ColorRadio({ nameColorRadio, valueColorRadio, isCheckedColorRadio, textValue }: ColorRadioProps) {
	return (
		<label htmlFor={valueColorRadio} className={s.label}>
			<input type="radio" name={nameColorRadio} value={valueColorRadio} id={valueColorRadio} defaultChecked={isCheckedColorRadio} className={s.input} />
			<span className={clsx(s.bgSpan, s[valueColorRadio])} />
			{(valueColorRadio === 'blue' || valueColorRadio === 'black') ?
			<Icon icon="icon--checked" className={s.icon} size="custom" width="12px" height="10px" colors={{default: 'var(--color--shades-1)'}}/> :
			<Icon icon="icon--checked" className={s.icon} size="custom" width="12px" height="10px" />}
			{!!textValue && (<Text variant='p' className={s.text}>
				{textValue}
			</Text>)}
		</label >
	);
}

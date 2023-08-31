import clsx from 'clsx';

import { Text } from '~components/Text/Text';

import s from './ColorPick.module.scss';

interface ColorPickProps {
	nameColorPick: string;
	valueColorPick: string;
	isCheckedColorPick?: boolean;
	textValue?: string;
}

export function ColorPick({ nameColorPick, valueColorPick, isCheckedColorPick, textValue }: ColorPickProps) {
	return (
		<label htmlFor={valueColorPick} className={s.label}>
			<input type="radio" name={nameColorPick} value={valueColorPick} id={valueColorPick} defaultChecked={isCheckedColorPick} className={s.input} />
			<span className={clsx(s.bgSpan, s[valueColorPick])} />
			{!!textValue && (<Text variant='p' className={s.text}>
				{textValue}
			</Text>)}
		</label >
	);
}

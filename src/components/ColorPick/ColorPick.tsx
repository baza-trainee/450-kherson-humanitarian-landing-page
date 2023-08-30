import clsx from 'clsx';

import s from './ColorPick.module.scss';

interface ColorPickProps {
	nameColorPick: string;
	valueColorPick: string;
	isCheckedColorPick?: boolean;
}

export function ColorPick({ nameColorPick, valueColorPick, isCheckedColorPick }: ColorPickProps) {
	return (
		<>
			<label htmlFor={valueColorPick} className={s.label}>
				<input type="radio" name={nameColorPick} value={valueColorPick} id={valueColorPick} checked={isCheckedColorPick} className={s.input} />
				<span className={clsx(s.bgSpan, s[valueColorPick])} />
			</label >
		</>
	);
}

import clsx from 'clsx';

import { Icon } from '~components/Icon/Icon';

import s from './ColorRadio.module.scss';

interface ColorRadioProps {
	nameColorRadio: string;
	valueColorRadio: string;
	isCheckedColorRadio?: boolean;
	changeRadio?: (value: string) => void;
}

export function ColorRadio({ nameColorRadio, valueColorRadio, isCheckedColorRadio, changeRadio }: ColorRadioProps) {
	const getRadioValue = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (changeRadio) {
			changeRadio(event.target.value);
		}
	};
	return (
		<label htmlFor={valueColorRadio} className={s.label}>
			<input type="radio" name={nameColorRadio} value={valueColorRadio} id={valueColorRadio} defaultChecked={isCheckedColorRadio} className={s.input} onChange={getRadioValue}/>
			<span className={clsx(s.bgSpan, s[valueColorRadio])} />
			{(valueColorRadio === 'blue' || valueColorRadio === 'black') ?
				<Icon icon="icon--checked" className={s.icon} size="custom" width="12px" height="10px" colors={{default: 'var(--color--shades-1)'}}/> :
				<Icon icon="icon--checked" className={s.icon} size="custom" width="12px" height="10px" />}
		</label >
	);
}
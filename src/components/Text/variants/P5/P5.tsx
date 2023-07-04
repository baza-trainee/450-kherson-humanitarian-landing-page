import clsx from 'clsx';
import s from './P5.module.scss';
import { VariantProps } from '~components/Typography/types/types';

export function P5({ className, children }: VariantProps) {
	return <p className={clsx(className, s.P5)}>{children}</p>;
}

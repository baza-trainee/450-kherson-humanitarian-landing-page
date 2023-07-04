import clsx from 'clsx';
import s from './P3.module.scss';
import { VariantProps } from '~components/Typography/types/types';

export function P3({ className, children }: VariantProps) {
	return <p className={clsx(className, s.P3)}>{children}</p>;
}

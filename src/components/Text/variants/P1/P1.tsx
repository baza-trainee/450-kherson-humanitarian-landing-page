import clsx from 'clsx';
import s from './P1.module.scss';
import { VariantProps } from '~components/Typography/types/types';

export function P1({ className, children }: VariantProps) {
	return <p className={clsx(className, s.P1)}>{children}</p>;
}

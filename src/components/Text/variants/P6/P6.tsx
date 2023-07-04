import clsx from 'clsx';
import s from './P6.module.scss';
import { VariantProps } from '~components/Typography/types/types';

export function P6({ className, children }: VariantProps) {
	return <p className={clsx(className, s.P6)}>{children}</p>;
}

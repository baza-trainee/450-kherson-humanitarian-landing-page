import clsx from 'clsx';
import s from './P4.module.scss';
import { VariantProps } from '~components/Typography/types/types';

export function P4({ className, children }: VariantProps) {
	return <p className={clsx(className, s.P4)}>{children}</p>;
}

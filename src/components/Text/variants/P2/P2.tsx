import clsx from 'clsx';
import s from './P2.module.scss';
import { VariantProps } from '~components/Typography/types/types';

export function P2({ className, children }: VariantProps) {
	return <p className={clsx(className, s.P2)}>{children}</p>;
}

import clsx from 'clsx';
import s from './H3.module.scss';
import { VariantProps } from '~components/Typography/types/types';

export function H3({ className, children }: VariantProps) {
	return <h3 className={clsx(className, s.H3)}>{children}</h3>;
}

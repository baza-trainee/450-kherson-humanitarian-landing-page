import clsx from 'clsx';
import s from './H2.module.scss';
import { VariantProps } from '~components/Typography/types/types';

export function H2({ className, children }: VariantProps) {
	return <h2 className={clsx(className, s.H2)}>{children}</h2>;
}

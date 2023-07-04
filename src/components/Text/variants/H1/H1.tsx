import clsx from 'clsx';
import s from './H1.module.scss';
import { VariantProps } from '~components/Typography/types/types';

export function H1({ className, children }: VariantProps) {
	return <h1 className={clsx(className, s.H1)}>{children}</h1>;
}

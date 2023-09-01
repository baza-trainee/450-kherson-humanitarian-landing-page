import type { ReactNode } from 'react';

import clsx from 'clsx';

import { Modal } from '~components/Modal/Modal';
import { Text } from '~components/Text/Text';
import type { NotificationTypes } from '~components/types/NotificationTypes';

import s from './ModalPop.module.scss';

interface ModalPop {
	type?: NotificationTypes;
	title: string;
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

export default function ModalPop({ type = 'info', title, isOpen, onClose, children }: ModalPop) {
	const titleClassName = clsx(s.title, s[type ? type : '']);

	return (
		<Modal isOpen={isOpen} onClose={onClose} type={type}>
			<Text variant="h2" className={titleClassName}>
				{title}
			</Text>
			<div className={s.container}>{children}</div>
		</Modal>
	);
}

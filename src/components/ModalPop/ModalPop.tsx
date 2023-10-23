import type { ReactNode } from 'react';

import clsx from 'clsx';

import { Modal } from '~components/Modal/Modal';
import { Text } from '~components/Text/Text';
import type { NotificationTypes } from '~components/types/NotificationTypes';

import s from './ModalPop.module.scss';

interface ModalPop {
	type?: NotificationTypes;
	title?: string;
	children?: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	leftButton?: () => React.ReactElement;
	rightButton?: () => React.ReactElement;
}

export function ModalPop({
	type = 'info',
	title,
	isOpen,
	onClose,
	leftButton,
	rightButton,
	children,
}: ModalPop) {
	const titleClassName = type && s[type];

	return (
		<Modal className={s.modal} isOpen={isOpen} onClose={onClose} type={type}>
			<div className={s.container}>
				{title && (
					<Text variant="h2" className={clsx(titleClassName)}>
						{title}
					</Text>
				)}
				{children}
				{(leftButton || rightButton) && (
					<div className={s.buttons}>
						{leftButton && leftButton()}
						{rightButton && rightButton()}
					</div>
				)}
			</div>
		</Modal>
	);
}

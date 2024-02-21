import { type ReactNode, useEffect } from 'react';

import clsx from 'clsx';

import { Icon } from '~components/Icon/Icon';
import { Portal } from '~components/Portal/Portal';
import type { NotificationTypes } from '~components/types/NotificationTypes';
import { useKeyPress } from '~hooks/useKeyPress';
import { useScrollLock } from '~hooks/useScrollLock';

import s from './Modal.module.scss';

interface ModalProps {
	type?: NotificationTypes;
	children: ReactNode;
	className?: string;
	isOpen: boolean;
	onClose: () => void;
}

export function Modal({ type = 'info', isOpen, onClose, className, children }: ModalProps) {
	const { lockScroll, unlockScroll } = useScrollLock();

	const decorClassName = clsx(s.decor, s[type ? type : '']);

	useKeyPress('Escape', onClose);

	useEffect(() => {
		lockScroll();
		return () => unlockScroll();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<Portal wrapperId="portal-modal">
			<>
				<div className={s.backdrop} onClick={onClose} />
				<div className={clsx(s.modal, className)}>
					<div className={decorClassName} />
					<div className={s.close}>
						<Icon
							icon="icon--close"
							colors={{
								default: 'var(--color--secondary-4)',
							}}
							onClick={onClose}
							className={s.icon}
						/>
					</div>
					<div className={s.content}>{children}</div>
				</div>
			</>
		</Portal>
	);
}

import { type ReactNode, useEffect } from 'react';

import clsx from 'clsx';

import { Icon } from '~components/Icon/Icon';
import { Portal } from '~components/Portal/Portal';
import { useKeyPress } from '~hooks/useKeyPress';
import { useScrollLock } from '~hooks/useScrollLock';

import s from './Modal.module.scss';

interface ModalProps {
	type?: 'alert' | 'notification';
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

export function Modal({ type, isOpen, onClose, children }: ModalProps) {
	const { lockScroll, unlockScroll } = useScrollLock();

	const popUpType = (typePop: string | undefined) => {
		switch (typePop) {
			case 'alert':
				return 'red';
			case 'notification':
				return 'blue';
			default:
				return 'blue';
		}
	};

	const decorClassName = clsx(s.decor, s[popUpType(type)]);

	useKeyPress('Escape', onClose);

	useEffect(() => {
		lockScroll();
		return () => unlockScroll();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<Portal wrapperId="portal-modal">
			<div className={s.modalContainer} onClick={onClose}>
				<div className={s.modal} onClick={(e) => e.stopPropagation()}>
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
			</div>
		</Portal>
	);
}

import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { Icon } from '~components/Icon/Icon';
import { Portal } from '~components/Portal/Portal';
import { useScrollLock } from '~hooks/useScrollBarWidth';

import s from './Modal.module.scss';

interface ModalProps {
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
	const { lockScroll, unlockScroll } = useScrollLock();
	useEffect(() => {
		const closeOnEscape = (e: KeyboardEvent) => (e.key === 'Escape' ? onClose() : null);
		document.body.addEventListener('keydown', closeOnEscape);
		return () => {
			document.body.removeEventListener('keydown', closeOnEscape);
		};
	}, [onClose]);

	useEffect(() => {
		lockScroll();
		return () => unlockScroll();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<Portal wrapperId="portal-modal">
			<div className={s.modalContainer} onClick={() => onClose()}>
				<div className={s.modal} onClick={(e) => e.stopPropagation()}>
					<div className={s.decor}></div>
					<div className={s.close}>
						<Icon
							icon="icon--close"
							colors={{
								default: 'var(--color--secondary-4)',
							}}
							onClick={() => onClose()}
							className={s.icon}
						></Icon>
					</div>
					<div className={s.content}>{children}</div>
				</div>
			</div>
		</Portal>
	);
}
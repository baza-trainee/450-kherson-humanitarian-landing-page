import type { ReactNode } from 'react';

import { Modal } from '~components/Modal/Modal';

interface ModalPop {
	type?: 'alert' | 'notification';
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

export default function ModalPop({ type = 'notification', isOpen, onClose, children }: ModalPop) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} type={type}>
			{children}
		</Modal>
	);
}

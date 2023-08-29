import type { ReactNode } from 'react';

import { Modal } from '~components/Modal/Modal';

interface ModalPop {
	type?: 'alert' | 'notification';
	title: string;
	children: ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

export default function ModalPop({ type = 'notification', title, isOpen, onClose, children }: ModalPop) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} type={type} title={title}>
			{children}
		</Modal>
	);
}

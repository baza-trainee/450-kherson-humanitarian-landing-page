import { useState } from 'react';

import { ModalHelpUs } from '~/pageComponents/HomePage/HelpUsButton/ModalHelpUs/ModalHelpUs';

import { Button } from '../../../components/Buttons/Button';

export function HelpUsButton() {
	const [isOpen, setIsOpen] = useState(false);
	const onOpenModal = () => {
		setIsOpen(true);
	};
	const onCloseModal = () => {
		setIsOpen(false);
	};
	return (
		<>
			<Button type="secondary" onClick={onOpenModal}>
				Допомогти нам
			</Button>
			{isOpen && <ModalHelpUs onClose={onCloseModal} />}
		</>
	);
}

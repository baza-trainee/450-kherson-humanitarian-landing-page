import { useState } from 'react';

import { ModalHelpUs } from '~/pageComponents/HomePage/ButtonHelpUs/ModalHelpUs/ModalHelpUs';
import type { Donations } from '~api/types/donations/donations';
import { Button } from '~components/Buttons/Button';

import s from './ModalHelpUs/ModalHelpUs.module.scss';

interface ButtonHelpUsProps {
	donations?: Donations;
}

export function ButtonHelpUs({ donations }: ButtonHelpUsProps) {
	const [isOpen, setIsOpen] = useState(false);

	const onOpenModal = () => {
		setIsOpen(true);
	};

	const onCloseModal = () => {
		setIsOpen(false);
	};

	return (
		<>
			<Button type="secondary" onClick={onOpenModal} className={s.buttonHelpUs}>
				Допомогти нам
			</Button>
			{isOpen && <ModalHelpUs onClose={onCloseModal} donations={donations} />}
		</>
	);
}

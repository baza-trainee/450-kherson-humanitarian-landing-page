import { useState } from 'react';

import { Button } from '~components/Buttons/Button';
import { ModalPop } from '~components/ModalPop/ModalPop';

import s from './ActionButtons.module.scss';

interface ActionButtonsProps {
	onSave: () => void;
	onReset: () => void;
	onRemove?: () => void;
	isDataValid: boolean;
	isDisabled: boolean;
}

export default function ActionButtons({
	onSave,
	onReset,
	onRemove,
	isDataValid,
	isDisabled,
}: ActionButtonsProps) {
	const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false);
	const [isModalResetOpen, setIsModalResetOpen] = useState(false);
	const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

	const handleRemoveOnClick = () => {
		setIsModalRemoveOpen(true);
	};

	const handleConfirmRemoveOnClick = () => {
		if (onRemove) onRemove();
		setIsModalRemoveOpen(false);
	};

	const handleResetOnClick = () => {
		setIsModalResetOpen(true);
	};

	const handleConfirmResetOnClick = () => {
		onReset();
		setIsModalResetOpen(false);
	};

	const handleSaveOnClick = () => {
		if (!isDataValid) setIsModalErrorOpen(true);
		onSave();
	};

	const handleErrorModalOnClose = () => {
		setIsModalErrorOpen(false);
	};

	return (
		<div className={s.buttons}>
			<div className={s.leftSide}>
				{onRemove && (
					<Button type="secondary" className={s.delete} onClick={handleRemoveOnClick}>
						Видалити блок
					</Button>
				)}
				<Button type="secondary" onClick={handleResetOnClick}>
					Скасувати зміни
				</Button>
			</div>
			{isModalRemoveOpen && (
				<ModalPop
					type="error"
					title={'Видалити?'}
					isOpen={isModalRemoveOpen}
					onClose={() => setIsModalRemoveOpen(false)}
					leftButton={() => (
						<Button type="secondary" onClick={handleConfirmRemoveOnClick}>
							Так
						</Button>
					)}
					rightButton={() => <Button onClick={() => setIsModalRemoveOpen(false)}>Ні</Button>}
				>
					Ви дійсно бажаєте видалити блок?
				</ModalPop>
			)}
			{isModalResetOpen && (
				<ModalPop
					type="error"
					title={'Скасувати?'}
					isOpen={isModalResetOpen}
					onClose={() => setIsModalResetOpen(false)}
					leftButton={() => (
						<Button type="secondary" onClick={handleConfirmResetOnClick}>
							Так
						</Button>
					)}
					rightButton={() => <Button onClick={() => setIsModalResetOpen(false)}>Ні</Button>}
				>
					Ви дійсно бажаєте видалити ваші зміни?
				</ModalPop>
			)}
			{isModalErrorOpen && (
				<ModalPop
					type="error"
					title={'Помилка!'}
					isOpen={isModalErrorOpen}
					onClose={handleErrorModalOnClose}
					leftButton={() => <Button onClick={handleErrorModalOnClose}>Так</Button>}
				>
					Невірно заповнені поля.
				</ModalPop>
			)}
			<Button onClick={handleSaveOnClick} disabled={isDisabled}>
				Зберегти
			</Button>
		</div>
	);
}

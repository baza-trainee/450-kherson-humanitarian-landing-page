import { Button } from '~components/Buttons/Button';
import { ModalPop } from '~components/ModalPop/ModalPop';

interface ModalRemoveProps {
	isModalOpen: boolean;
	setIsModalOpen: (state: boolean) => void;
	onYesClick: () => void;
	onNoClick?: () => void;
}

export function ModalRemove({
	isModalOpen,
	setIsModalOpen,
	onYesClick,
	onNoClick,
}: ModalRemoveProps) {
	const handleOnYesClick = () => {
		onYesClick();
	};

	const handleOnNoClick = () => {
		setIsModalOpen(false);
		if (onNoClick) onNoClick();
	};

	return (
		<ModalPop
			title={'Видалити?'}
			isOpen={isModalOpen}
			onClose={handleOnNoClick}
			leftButton={() => (
				<Button type="secondary" onClick={handleOnYesClick}>
					Так
				</Button>
			)}
			rightButton={() => <Button onClick={handleOnNoClick}>Ніт</Button>}
		/>
	);
}

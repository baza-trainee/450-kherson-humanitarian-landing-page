import { Button } from '../Button';

import s from './AdminBoardBlockButtons.module.scss';

interface AdminBlockButtonsProps {
	submit: boolean;
	handleUndoChanges: () => void;
	handleDelete?: () => void;
}

export default function AdminBoardBlockButtons({
	submit,
	handleUndoChanges,
	handleDelete,
}: AdminBlockButtonsProps) {
	return (
		<div className={s.buttons}>
			<div className={s.leftSide}>
				{handleDelete && (
					<Button type="secondary" className={s.delete} onClick={handleDelete}>
						Видалити блок
					</Button>
				)}
				<Button type="secondary" onClick={handleUndoChanges}>
					Скасувати зміни
				</Button>
			</div>
			<Button submit={submit}>Зберегти</Button>
		</div>
	);
}

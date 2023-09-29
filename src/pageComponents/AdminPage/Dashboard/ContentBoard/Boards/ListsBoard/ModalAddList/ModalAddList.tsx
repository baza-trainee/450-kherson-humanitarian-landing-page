import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useRouter } from 'next/router';

import { useBoardsState } from '~/pageComponents/AdminPage/store/useBoardsState';
import { api } from '~api/index';
import type { ListRequest } from '~api/types/requests/ListRequest';
import { Button } from '~components/Buttons/Button';
import { Icon } from '~components/Icon/Icon';
import { TextInput } from '~components/inputs/TextInput/TextInput';
import { LoaderOverlay } from '~components/LoaderOverlay/LoaderOverlay';
import { ModalPop } from '~components/ModalPop/ModalPop';
import { getErrorMessageFromCode } from '~helpers/getErrorMessageFromCode';

import s from './ModalAddList.module.scss';

export interface FormFields {
	availableSets: number;
	issueDate: string;
	issueTime: string;
}

export function ModalAddList() {
	const router = useRouter();
	const { query } = router;

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { getBoardDataById } = useBoardsState((state) => ({
		getBoardDataById: state.getBoardDataById,
	}));

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({
		mode: 'onSubmit',
	});

	const registers = {
		availableSets: register('availableSets', {
			required: 'Поле не може бути пустим',
			min: { value: 5, message: '5 — мінімальна кількість наборів' },
			max: { value: 1000, message: '1000 — максимальна кількість наборів' },
		}),
		issueDate: register('issueDate', {
			required: 'Поле не може бути пустим',
		}),
		issueTime: register('issueTime', {
			required: 'Поле не може бути пустим',
			pattern: {
				value: /[0-2][0-9]:[0-5][0-9]/,
				message: 'Час повинен бути у форматі 09:00',
			},
		}),
	};

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		setIsLoading(true);

		const inputDate = new Date(data.issueDate);
		const day = inputDate.getDate().toString().padStart(2, '0');
		const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
		const year = inputDate.getFullYear();
		const issueDate = `${day}.${month}.${year}`;

		const id = query.id?.toString();
		let listId: ListRequest['type'] = 'temp_moved';

		if (id === 'temp_moved' || id === 'invalid' || id === 'child') {
			listId = id;
		}

		const body = {
			type: listId,
			maxQuantity: data.availableSets,
			issueDate: issueDate,
			issueTime: data.issueTime,
		};

		const resp = await api.lists.addNewList(body);

		if ('data' in resp) {
			if (query?.slug) {
				await getBoardDataById(query?.slug?.toString(), listId);
			}
		} else {
			const message = getErrorMessageFromCode(resp.status, {
				400: 'Дата не може бути в минулому або список з такою датою вже існує!',
				403: 'Користувач не авторизований!',
				406: 'Недопустима кількість наборів! Поставте цифру менше та спробуйте ще раз',
			});
			setErrorMessage(message);
		}

		setIsModalOpen(false);
		setIsLoading(false);
	};

	const handleErrorModalOnClose = () => {
		setErrorMessage('');
	};

	const handleAddNewList = () => {
		setIsModalOpen(true);
	};

	const handleModalOnClose = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button type="secondary" onClick={handleAddNewList} className={s.button}>
				<Icon icon="icon--plus" className={s.icon} />
			</Button>

			<ModalPop title="Новий список" isOpen={isModalOpen} onClose={handleModalOnClose}>
				<form onSubmit={handleSubmit(onSubmit)} className={s.form}>
					<TextInput
						type="number"
						register={registers.availableSets}
						required
						errors={errors}
						label="Доступно наборів"
						placeholder="200"
					/>
					<TextInput
						type="date"
						register={registers.issueDate}
						required
						errors={errors}
						label="Дата видачі"
						placeholder="24.08.2091"
					/>
					<TextInput
						type="time"
						register={registers.issueTime}
						required
						errors={errors}
						label="Час видачі"
						placeholder="09:00"
					/>
					<Button submit>Створити</Button>
				</form>
			</ModalPop>

			{isLoading && <LoaderOverlay />}
			{errorMessage && (
				<ModalPop
					type="error"
					title="Помилка при створенні списку!"
					isOpen={!!errorMessage}
					onClose={handleErrorModalOnClose}
				>
					{errorMessage}
				</ModalPop>
			)}
		</>
	);
}

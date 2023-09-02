import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { api } from '~api/index';
import { Button } from '~components/Buttons/Button';
import { Icon } from '~components/Icon/Icon';
import { TextInput } from '~components/inputs/TextInput/TextInput';
import { LoaderOverlay } from '~components/LoaderOverlay/LoaderOverlay';
import { Modal } from '~components/Modal/Modal';
import ModalPop from '~components/ModalPop/ModalPop';
import { Text } from '~components/Text/Text';

import { categories } from '../ListsBoard';

import s from './ModalAddList.module.scss';

export interface FormFields {
	availableSets: number;
	issueDate: string;
	issueTime: string;
}

interface ModalAddList {
	category: string;
}

export function ModalAddList({ category }: ModalAddList) {
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

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
			pattern: {
				value: /^[\d]+$/,
				message: 'Поле повинно містити тільки цифри',
			},
		}),
		issueDate: register('issueDate', {
			required: 'Поле не може бути пустим',
			// pattern: {
			// 	value: /^[0-9]{2}\.[0-3]{2}\.20[0-9]{2}$/,
			// 	message: 'Дата повинна бути у форматі 24.08.2091',
			// },
		}),
		issueTime: register('issueTime', {
			required: 'Поле не може бути пустим',
			pattern: {
				value: /^[0-2][0-9]:[0-5][0-9]$/,
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

		const body = {
			type: categories[category],
			maxQuantity: data.availableSets,
			issueDate: issueDate,
			issueTime: data.issueTime,
		};

		console.log('body: ', body);

		const res = await api.lists.addNewList(body);
		console.log('res: ', res);
		if ('data' in res) {
			console.log('res: ', res);
		} else {
			setErrorMessage('Помилка при створенні списку! Спробуйте пізніше!');
			setIsModalErrorOpen(true);
			setIsModalOpen(false);
		}
		setIsLoading(false);
	};

	const handleErrorModalOnClose = () => {
		setErrorMessage('');
		setIsModalErrorOpen(false);
	};

	const handleAddNewList = () => {
		setIsModalOpen(true);
	};

	const handleModalOnClose = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<Button type="secondary" onClick={handleAddNewList}>
				<Icon icon="icon--plus" className={s.addIcon} />
			</Button>

			<ModalPop title="Новий список" isOpen={isModalOpen} onClose={handleModalOnClose}>
				<form className={s.formFields} onSubmit={handleSubmit(onSubmit)}>
					<TextInput
						type="number"
						register={registers.availableSets}
						required
						errors={errors}
						label="Доступно наборів"
						placeholder="200"
						className={s.input}
					/>
					<TextInput
						type="date"
						register={registers.issueDate}
						required
						errors={errors}
						label="Дата видачі"
						placeholder="24.08.2091"
						className={s.input}
					/>
					<TextInput
						type="time"
						register={registers.issueTime}
						required
						errors={errors}
						label="Час видачі"
						placeholder="09:00"
						className={s.input}
					/>
					<Button submit>Створити</Button>
				</form>
			</ModalPop>

			{isLoading && <LoaderOverlay />}
			{errorMessage && (
				<ModalPop type="error" title="Помилка" isOpen={isModalErrorOpen} onClose={handleErrorModalOnClose}>
					{errorMessage}
				</ModalPop>
			)}
		</>
	);
}

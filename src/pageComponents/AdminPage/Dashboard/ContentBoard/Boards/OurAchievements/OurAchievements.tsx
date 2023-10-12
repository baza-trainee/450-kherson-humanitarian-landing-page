import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { TextInput } from '~components/inputs/TextInput/TextInput';

import s from './ourAchievements.module.scss';

export interface FormFields {
	issuedSets: number;
	receivedHelp: number;
	donations: number;
	issueDate: string;
	issueTime: string;
}
export function OurAchievements() {
	const [inputs, setInputs] = useState({
		issuedSets: '0',
		receivedHelp: '0',
		donations: '0',
		issueDate: '0',
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({
		mode: 'onSubmit',
	});

	const registers = {
		issuedSets: register('issuedSets', {
			required: 'Поле не може бути пустим',
			min: { value: 5, message: '5 — мінімальна кількість наборів' },
			max: { value: 1000, message: '1000 — максимальна кількість наборів' },
		}),
		receivedHelp: register('receivedHelp', {
			required: 'Поле не може бути пустим',
			min: { value: 5, message: '5 — мінімальна кількість наборів' },
			max: { value: 1000, message: '1000 — максимальна кількість наборів' },
		}),
		donations: register('donations', {
			required: 'Поле не може бути пустим',
			min: { value: 5, message: '5 — мінімальна кількість наборів' },
			max: { value: 1000, message: '1000 — максимальна кількість наборів' },
		}),
		issueDate: register('issueDate', {
			required: 'Поле не може бути пустим',
		}),
		// issueTime: register('issueTime', {
		// 	required: 'Поле не може бути пустим',
		// 	pattern: {
		// 		value: /[0-2][0-9]:[0-5][0-9]/,
		// 		message: 'Час повинен бути у форматі 09:00',
		// 	},
		// }),
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setInputs({
		  ...inputs,
		  [name]: value.length,
		});
	 };

	return (
		<form className={s.form}>
			<TextInput
				type="number"
				register={registers.issuedSets}
				required
				errors={errors}
				label="Було видано гуманітарних наборів"
				placeholder="200"
				onChange={handleInputChange}
				info={`Cимволів ${inputs.issuedSets}/10`}
				hideError
			/>
			<TextInput
				type="number"
				register={registers.receivedHelp}
				required
				errors={errors}
				label="Було отримано гуманітарної допомоги"
				placeholder="200"
				onChange={handleInputChange}
				info={`Cимволів ${inputs.receivedHelp}/10`}
				hideError
			/>
			<TextInput
				type="number"
				register={registers.donations}
				required
				errors={errors}
				label="Нам задонатили"
				placeholder="200"
				onChange={handleInputChange}
				info={`Cимволів ${inputs.donations}/10`}
				hideError
			/>
			<TextInput
				type="date"
				register={registers.issueDate}
				required
				errors={errors}
				label="Інформація подана станом на"
				placeholder="24.08.2091"
				onChange={handleInputChange}
				info={`Cимволів ${inputs.issueDate}/10`}
				hideError
			/>
		</form>
	);
}

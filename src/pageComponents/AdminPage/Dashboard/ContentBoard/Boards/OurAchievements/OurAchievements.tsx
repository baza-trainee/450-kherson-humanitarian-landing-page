import { useEffect } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import ActionButtons from '~/pageComponents/AdminPage/components/ActionButtons/ActionButtons';
import { useOurAchievementsBoardState } from '~/pageComponents/AdminPage/store/useOurAchievementsBoardState';
import { api } from '~api/index';
import { TextInputWithCounter } from '~components/inputs/TextInput/TextInputWithCounter';

import s from './ourAchievements.module.scss';

export interface FormFields {
	issuedSets: string;
	receivedHelp: string;
	donations: string;
	issueDate: string;
}
export function OurAchievements() {
	const { ourAchievementsBoardData, getBoardData } = useOurAchievementsBoardState((state) => ({
		ourAchievementsBoardData: state.ourAchievementsBoardData,
		getBoardData: state.getBoardData,
	}));

	useEffect(() => {
		getBoardData('achievements');
	}, [getBoardData]);

	const {
		register,
		setValue,
		handleSubmit,
		reset,
		formState: { errors, isValid },
	} = useForm<FormFields>({
		mode: 'onSubmit',
	});

	const currentFormattedDate = () => {
		return ourAchievementsBoardData
			? ourAchievementsBoardData.issueDate
					.split('.')
					.reverse()
					.map((part) => part.padStart(2, '0'))
					.join('-')
			: '';
	};

	useEffect(() => {
		if (ourAchievementsBoardData) {
			const isoDate = currentFormattedDate();

			setValue('issuedSets', ourAchievementsBoardData.issuedSets);
			setValue('receivedHelp', ourAchievementsBoardData.receivedHelp);
			setValue('donations', ourAchievementsBoardData.donations);
			setValue('issueDate', isoDate);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ourAchievementsBoardData, setValue]);

	const registers = {
		issuedSets: register('issuedSets', {
			required: 'Поле не може бути пустим',
			min: { value: 1, message: 'щось тут не так' },
			max: { value: 9999999999, message: 'щось тут не так' },
		}),
		receivedHelp: register('receivedHelp', {
			required: 'Поле не може бути пустим',
			min: { value: 1, message: 'щось тут не так' },
			max: { value: 9999999999, message: 'щось тут не так' },
		}),
		donations: register('donations', {
			required: 'Поле не може бути пустим',
			min: { value: 1, message: 'щось тут не так' },
			max: { value: 9999999999, message: 'щось тут не так' },
		}),
		issueDate: register('issueDate', {
			required: 'Поле не може бути пустим',
			min: { value: '01.08.2022', message: 'щось тут не так' },
			max: { value: `${new Date()}`, message: 'щось тут не так' },
		}),
	};

	const handleUndoChanges = () => {
		const isoDate = currentFormattedDate();
		reset({
			issuedSets: ourAchievementsBoardData?.issuedSets,
			receivedHelp: ourAchievementsBoardData?.receivedHelp,
			donations: ourAchievementsBoardData?.donations,
			issueDate: isoDate,
		});
	};

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		const date = new Date(data.issueDate);
		const currentDate = new Date();
		date.setHours(
			currentDate.getHours(),
			currentDate.getMinutes(),
			currentDate.getSeconds(),
			currentDate.getMilliseconds(),
		);
		const formattedDate = date.toISOString();
		const body = {
			issuedHumanitarianKits: Number(data.issuedSets),
			receivedHumanitarianAid: Number(data.receivedHelp),
			sumDonats: Number(data.donations),

			infoAtDate: formattedDate,
		};

		if (data) {
			await api.ourAchievements.putOurAchievements(body);
		}
	};
	return (
		<form className={s.form}>
			<TextInputWithCounter
				type="text"
				register={registers.issuedSets}
				required
				errors={errors}
				label="Було видано гуманітарних наборів"
				placeholder="200"
				maxLength={12}
				showInfo
			/>
			<TextInputWithCounter
				type="text"
				register={registers.receivedHelp}
				required
				errors={errors}
				label="Було отримано гуманітарної допомоги"
				placeholder="200"
				maxLength={12}
				showInfo
			/>
			<TextInputWithCounter
				type="text"
				register={registers.donations}
				required
				errors={errors}
				label="Нам задонатили"
				placeholder="200"
				maxLength={12}
				showInfo
			/>
			<TextInputWithCounter
				type="date"
				register={registers.issueDate}
				required
				errors={errors}
				label="Інформація подана станом на"
				placeholder="24.08.2091"
				maxLength={10}
				showInfo
			/>
			<ActionButtons
				onSave={handleSubmit(onSubmit)}
				onReset={handleUndoChanges}
				isDataValid={isValid}
			/>
		</form>
	);
}

import { useEffect, useMemo, useState } from 'react';
import type { SubmitHandler, UseFormRegisterReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import clsx from 'clsx';

import { Button } from '~components/Buttons/Button';
import { Checkbox } from '~components/inputs/Checkbox/Checkbox';
import { Dropdown } from '~components/inputs/Dropdown/Dropdown';
import { Tabs } from '~components/inputs/Tabs/Tabs';
import { TextInput } from '~components/inputs/TextInput/TextInput';
import { isObjectEmpty } from '~helpers/isObjectEmpty';

import { AREA_LIST } from './constants/AREA_LIST';
import { formList } from './data/formList';
import type { FormFields } from './types/FormFields';

import s from './Form.module.scss';

interface Field {
	type: string;
	name: string;
	label?: string;
	placeholder?: string;
	required?: boolean;
	disabled?: boolean;
	size: 'fullWidth' | 'halfWidth';
	register: () => UseFormRegisterReturn<keyof FormFields>;
	options?: string[];
	condition?: string;
	text?: string;
	defaultValue?: string;
}

type FormFieldsData = Record<string, Field>;

export function Form() {
	const {
		register,
		unregister,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormFields>({
		mode: 'onSubmit',
		defaultValues: {
			documentType: 'Паспорт',
			movementArea: '',
		},
	});

	const watchDocumentType = watch('documentType');
	const conditions = [watchDocumentType];
	const watchConsent = watch('consent');

	useEffect(() => {
		if (watchDocumentType === 'Паспорт') {
			register('passportSeries');
			register('passportNumber');
			unregister('idCard');
		} else {
			unregister('passportSeries');
			unregister('passportNumber');
			register('idCard');
		}
	}, [register, unregister, watchDocumentType]);

	const formFieldsData: FormFieldsData = useMemo(
		() => ({
			name: {
				type: 'text',
				name: 'name',
				label: "Ім'я",
				placeholder: "Введіть ім'я",
				required: true,
				size: 'fullWidth',
				register: () =>
					register('name', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
			},
			surname: {
				type: 'text',
				name: 'surname',
				label: 'Прізвище',
				placeholder: 'Введіть прізвище',
				required: true,
				size: 'fullWidth',
				register: () =>
					register('surname', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
			},
			patronymic: {
				type: 'text',
				name: 'patronymic',
				label: 'По-батькові',
				placeholder: 'Введіть по-батькові',
				required: true,
				size: 'fullWidth',
				register: () =>
					register('patronymic', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
			},
			populationPoint: {
				type: 'text',
				name: 'populationPoint',
				label: 'Фактична адреса проживання',
				placeholder: 'Введіть коректну назву населеного пункту',
				required: true,
				size: 'fullWidth',
				register: () =>
					register('populationPoint', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
			},
			street: {
				type: 'text',
				name: 'street',
				placeholder: 'Оберіть назву вулиці',
				required: true,
				size: 'fullWidth',
				register: () =>
					register('street', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
			},
			houseNumber: {
				type: 'text',
				name: 'houseNumber',
				placeholder: 'введіть номер будинку',
				required: true,
				size: 'halfWidth',
				register: () =>
					register('houseNumber', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
			},
			apartmentNumber: {
				type: 'text',
				name: 'apartmentNumber',
				placeholder: 'Введіть номер квартири',
				required: true,
				size: 'halfWidth',
				register: () =>
					register('apartmentNumber', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
			},
			documentType: {
				type: 'dropdown',
				name: 'documentType',
				label: 'Тип документу, що посвідчує особу',
				size: 'fullWidth',
				register: () => register('documentType'),
				options: ['Паспорт', 'ID-картка'],
			},
			passportSeries: {
				type: 'text',
				name: 'passportSeries',
				label: 'Паспортні дані',
				placeholder: 'Введіть серію паспорта',
				required: true,
				size: 'halfWidth',
				register: () =>
					register('passportSeries', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
				condition: 'Паспорт',
			},
			passportNumber: {
				type: 'text',
				name: 'passportNumber',
				placeholder: 'Введіть номер паспорта',
				required: true,
				size: 'halfWidth',
				register: () =>
					register('passportNumber', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
				condition: 'Паспорт',
			},
			idCard: {
				type: 'text',
				name: 'idCard',
				label: 'ID-карта',
				placeholder: 'Введіть номер ID-карти',
				required: true,
				size: 'fullWidth',
				register: () =>
					register('idCard', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
				condition: 'ID-картка',
			},
			disabilityCertificateNumber: {
				type: 'text',
				name: 'disabilityCertificateNumber',
				label: 'Номер посвідчення з інвалідності',
				placeholder: 'Номер посвідчення з інвалідності',
				required: true,
				size: 'fullWidth',
				register: () =>
					register('disabilityCertificateNumber', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
			},
			identificationNumber: {
				type: 'text',
				name: 'identificationNumber',
				label: 'ІПН (Ідентифікаційний номер)',
				placeholder: 'Введіть ідентифікаційний номер',
				required: true,
				size: 'fullWidth',
				register: () =>
					register('identificationNumber', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
			},
			idpCertificateNumber: {
				type: 'text',
				name: 'idpCertificateNumber',
				label: 'Номер довідки ВПО',
				placeholder: 'Введіть номер довідки ВПО',
				required: true,
				size: 'fullWidth',
				register: () =>
					register('idpCertificateNumber', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
			},
			idpCertificateOrBirthCertificateNumber: {
				type: 'text',
				name: 'idpCertificateOrBirthCertificateNumber',
				label: 'Номер довідки ВПО/свідоцтво про народження',
				placeholder: 'Введіть номер довідки впо/свідоцтво про народження',
				required: true,
				size: 'fullWidth',
				register: () =>
					register('idpCertificateOrBirthCertificateNumber', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
			},
			movementArea: {
				type: 'dropdown',
				name: 'movementArea',
				label: 'Звідки переміщені',
				placeholder: 'Оберіть назву області',
				required: true,
				size: 'fullWidth',
				register: () =>
					register('movementArea', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
				options: AREA_LIST,
			},
			movementCity: {
				type: 'text',
				name: 'movementCity',
				placeholder: 'Введіть назву населеного пункту',
				required: true,
				size: 'fullWidth',
				register: () =>
					register('movementCity', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
			},
			numberOfFamilyMembers: {
				type: 'text',
				name: 'numberOfFamilyMembers',
				label: 'Кількість членів родини',
				placeholder: 'Введіть кількість членів родини',
				required: true,
				size: 'fullWidth',
				register: () =>
					register('numberOfFamilyMembers', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
			},
			phone: {
				type: 'text',
				name: 'phone',
				label: 'Номер телефону',
				placeholder: 'Введіть номер телефону',
				required: true,
				size: 'fullWidth',
				register: () =>
					register('phone', {
						required: 'Поле таке пусте! Введіть більше символів!',
					}),
			},
			consent: {
				type: 'checkbox',
				name: 'consent',
				placeholder: '',
				required: true,
				size: 'fullWidth',
				register: () =>
					register('consent', {
						required: true,
					}),
				text: 'Я даю згоду на передачу та обробку моїх персональних даних',
			},
		}),
		[register],
	);

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		console.log(data);
	};

	const isValidFixed = isObjectEmpty(errors);

	const [tabIndex, setTabIndex] = useState(0);

	const tabFormVariantOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const valueIndex = formList.findIndex((item) => item.label === value);
		setTabIndex(valueIndex);
		unregister();
	};

	return (
		<div className={s.Form}>
			<Tabs
				onChange={tabFormVariantOnChange}
				name="formVariant"
				defaultValue={formList[tabIndex].label}
				labels={formList.map((form) => form.label)}
			/>
			<form className={s.formFields} onSubmit={handleSubmit(onSubmit)}>
				{formList[tabIndex].fieldList.map((field) => {
					if (!formFieldsData[field]) return null;
					const condition = formFieldsData[field]?.condition;
					if (condition && !conditions.includes(condition)) {
						return null;
					}
					switch (formFieldsData[field].type) {
						case 'text':
							return (
								<TextInput
									key={field}
									label={formFieldsData[field].label}
									register={formFieldsData[field].register()}
									errors={errors}
									required={formFieldsData[field].required}
									disabled={formFieldsData[field].disabled}
									placeholder={formFieldsData[field].placeholder}
									className={clsx(s.field, s[formFieldsData[field].size])}
								/>
							);
						case 'dropdown':
							return (
								<Dropdown
									key={field}
									label={formFieldsData[field].label}
									register={formFieldsData[field].register()}
									defaultValue={formFieldsData[field].defaultValue}
									errors={errors}
									required={formFieldsData[field].required}
									disabled={formFieldsData[field].disabled}
									placeholder={formFieldsData[field].placeholder}
									options={formFieldsData[field].options || []}
									className={clsx(s.field, s[formFieldsData[field].size])}
								/>
							);
						case 'checkbox':
							return (
								<Checkbox
									key={field}
									label={formFieldsData[field].label}
									register={formFieldsData[field].register()}
									errors={errors}
									required={formFieldsData[field].required}
									disabled={formFieldsData[field].disabled}
									className={clsx(s.field, s[formFieldsData[field].size])}
									text={formFieldsData[field].text || ''}
								/>
							);
					}
				})}

				<Button className={s.submitButton} submit disabled={!watchConsent || !isValidFixed}>
					Зареєструватись
				</Button>
				{/* {isLoading && <LoaderOverlay />} */}
				{/* {(isSubmit && !isLoading) && <UserPageSuccessModal onClose={handlerSuccessModal} />} */}
				{/* {(error && !isLoading) && <UserPageErrorModal onClose={handlerErrorModal} error={error} />} */}
			</form>
		</div>
	);
}

import { useMemo, useState } from 'react';
import type { SubmitHandler, UseFormRegisterReturn } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import clsx from 'clsx';

import { api } from '~api/index';
import type { GetHelpLists } from '~api/types/GetHelp/GetHelpLists';
import type { HelpCategories } from '~api/types/GetHelp/HelpCategories';
import { Button } from '~components/Buttons/Button';
import { Checkbox } from '~components/inputs/Checkbox/Checkbox';
import { Dropdown } from '~components/inputs/Dropdown/Dropdown';
import { Tabs } from '~components/inputs/Tabs/Tabs';
import { TextInput } from '~components/inputs/TextInput/TextInput';
import { LoaderOverlay } from '~components/LoaderOverlay/LoaderOverlay';
import { Modal } from '~components/Modal/Modal';
import ModalPop from '~components/ModalPop/ModalPop';
import { Text } from '~components/Text/Text';
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
	widthSize: 'fullWidth' | 'halfWidth';
	inputMaxLength?: number;
	register: () => UseFormRegisterReturn<keyof FormFields>;
	options?: string[];
	condition?: string;
	text?: string;
	defaultValue?: string;
}

type FormFieldsData = Record<string, Field>;

interface FormProps {
	lists: GetHelpLists;
	setActiveTab: (tab: HelpCategories) => void;
}

export function Form({ lists, setActiveTab }: FormProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [isModalSuccessOpen, setIsModalSuccessOpen] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

	const {
		register,
		unregister,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormFields>({
		mode: 'onSubmit',
		defaultValues: {
			populationCity: 'м. Кривий Ріг',
			movementArea: '',
		},
	});

	const watchConsent = watch('consent');

	const formFieldsData: FormFieldsData = useMemo(
		() => ({
			surname: {
				type: 'text',
				name: 'surname',
				label: 'Прізвище',
				placeholder: 'Шевченко',
				required: true,
				inputMaxLength: 30,
				widthSize: 'fullWidth',
				register: () =>
					register('surname', {
						required: 'Поле не може бути пустим',
						minLength: { value: 2, message: 'Мінімальна кількість символів 2' },
						pattern: {
							value: /^[\sА-Яа-яІіЇїЄєҐґЁё'-]+$/,
							message: 'Поле може містити тільки літери кирилиці та символи пробілу, дефісу, апострофу',
						},
					}),
			},
			name: {
				type: 'text',
				name: 'name',
				label: "Ім'я",
				placeholder: 'Тарас',
				required: true,
				inputMaxLength: 30,
				widthSize: 'fullWidth',
				register: () =>
					register('name', {
						required: 'Поле не може бути пустим',
						minLength: { value: 2, message: 'Мінімальна кількість символів 2' },
						pattern: {
							value: /^[\sА-Яа-яІіЇїЄєҐґЁё'-]+$/,
							message: 'Поле може містити тільки літери кирилиці та символи пробілу, дефісу, апострофу',
						},
					}),
			},
			patronymic: {
				type: 'text',
				name: 'patronymic',
				label: 'По-батькові',
				placeholder: 'Григорович',
				required: true,
				inputMaxLength: 30,
				widthSize: 'fullWidth',
				register: () =>
					register('patronymic', {
						required: 'Поле не може бути пустим',
						minLength: { value: 2, message: 'Мінімальна кількість символів 2' },
						pattern: {
							value: /^[\sА-Яа-яІіЇїЄєҐґЁё'-]+$/,
							message: 'Поле може містити тільки літери кирилиці та символи пробілу, дефісу та апострофу',
						},
					}),
			},
			populationCity: {
				type: 'text',
				name: 'populationCity',
				label: 'Фактичне місце проживання',
				required: true,
				disabled: true,
				widthSize: 'fullWidth',
				register: () => register('populationCity', {}),
			},
			populationStreet: {
				type: 'text',
				name: 'populationStreet',
				label: 'Назва вулиці',
				placeholder: 'вул. Визволення',
				required: true,
				inputMaxLength: 30,
				widthSize: 'fullWidth',
				register: () =>
					register('populationStreet', {
						required: 'Поле не може бути пустим',
						minLength: { value: 2, message: 'Мінімальна кількість символів 2' },
						pattern: {
							value: /^[\sА-Яа-яІіЇїЄєҐґЁё'-.]+$/,
							message:
								'Поле може містити тільки літери кирилиці та символи пробілу, крапки, дефісу та апострофу',
						},
					}),
			},
			populationHouseNumber: {
				type: 'text',
				name: 'populationHouseNumber',
				label: 'Номер будинку',
				placeholder: '11а',
				required: true,
				inputMaxLength: 5,
				widthSize: 'halfWidth',
				register: () =>
					register('populationHouseNumber', {
						required: 'Поле не може бути пустим',
						minLength: { value: 1, message: 'Мінімальна кількість символів 1' },
						pattern: {
							value: /^\d[0-9А-Яа-яІіЇїЄєҐґЁё-]*$/,
							message: 'Поле може містити тільки цифри, літери кирилиці та символи слешу та дефісу',
						},
					}),
			},
			populationApartmentNumber: {
				type: 'text',
				name: 'populationApartmentNumber',
				label: 'Номер квартири',
				placeholder: '11',
				inputMaxLength: 5,
				widthSize: 'halfWidth',
				register: () =>
					register('populationApartmentNumber', {
						minLength: { value: 1, message: 'Мінімальна кількість символів 1' },
						pattern: {
							value: /^\d+$/,
							message: 'Поле може містити тільки цифри',
						},
					}),
			},
			idpCertificateNumber: {
				type: 'text',
				name: 'idpCertificateNumber',
				label: 'Номер довідки ВПО',
				placeholder: '1111-1111111111',
				inputMaxLength: 15,
				required: true,
				widthSize: 'fullWidth',
				register: () =>
					register('idpCertificateNumber', {
						required: 'Поле не може бути пустим',
						pattern: {
							value: /^\d{4}-\d{10}$/,
							message: 'Поле повинно бути у форматі 1111-1111111111',
						},
					}),
			},
			disabilityCertificateNumber: {
				type: 'text',
				name: 'disabilityCertificateNumber',
				label: 'Номер посвідчення з інвалідності',
				placeholder: '111111',
				inputMaxLength: 6,
				required: true,
				widthSize: 'fullWidth',
				register: () =>
					register('disabilityCertificateNumber', {
						required: 'Поле не може бути пустим',
						pattern: {
							value: /^\d{6}$/,
							message: 'Поле повинно містити шість цифр',
						},
					}),
			},
			birthCertificateNumber: {
				type: 'text',
				name: 'birthCertificateNumber',
				label: 'Номер свідоцтва про народження',
				placeholder: '111111',
				inputMaxLength: 6,
				required: true,
				widthSize: 'fullWidth',
				register: () =>
					register('birthCertificateNumber', {
						required: 'Поле не може бути пустим',
						pattern: {
							value: /^\d{6}$/,
							message: 'Поле повинно містити шість цифр',
						},
					}),
			},
			movementArea: {
				type: 'dropdown',
				name: 'movementArea',
				label: 'Звідки переміщені',
				placeholder: 'Оберіть область',
				required: true,
				widthSize: 'fullWidth',
				register: () =>
					register('movementArea', {
						validate: (value) => AREA_LIST.includes(value) || 'Повинна бути обрана область зі списку',
						required: 'Повинна бути обрана область',
					}),
				options: AREA_LIST,
			},
			movementCity: {
				type: 'text',
				name: 'movementCity',
				label: 'Назва населеного пункту',
				placeholder: 'Високопілля',
				required: true,
				inputMaxLength: 30,
				widthSize: 'fullWidth',
				register: () =>
					register('movementCity', {
						required: 'Поле не може бути пустим',
						minLength: { value: 2, message: 'Мінімальна кількість символів 2' },
						pattern: {
							value: /^[\sА-Яа-яІіЇїЄєҐґЁё'-.]+$/,
							message: 'Поле може містити тільки літери кирилиці та символи пробілу, крапки, дефісу, апострофу',
						},
					}),
			},
			email: {
				type: 'text',
				name: 'email',
				label: 'E-mail',
				placeholder: 't.shevchenko@gmail.com',
				required: true,
				widthSize: 'fullWidth',
				register: () =>
					register('email', {
						required: 'Поле не може бути пустим',
						pattern: {
							value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
							message: 'E-mail повинен бути у форматі example@example.com',
						},
					}),
			},
			phone: {
				type: 'text',
				name: 'phone',
				label: 'Номер телефону',
				placeholder: '+380111111111',
				required: true,
				widthSize: 'fullWidth',
				inputMaxLength: 13,
				register: () =>
					register('phone', {
						required: 'Поле не може бути пустим',
						pattern: {
							value: /^\+380[0-9]{9}$/,
							message: 'Номер телефону повинен бути у форматі +380111111111',
						},
					}),
			},
			consent: {
				type: 'checkbox',
				name: 'consent',
				placeholder: '',
				required: true,
				widthSize: 'fullWidth',
				register: () =>
					register('consent', {
						required: true,
					}),
				text: 'Я даю згоду на передачу та обробку моїх персональних даних',
			},
		}),
		[register],
	);

	const isValidFixed = isObjectEmpty(errors);

	const [tabIndex, setTabIndex] = useState(0);

	const onSubmit: SubmitHandler<FormFields> = async (data: FormFields) => {
		setIsLoading(true);

		const body = {
			surname: data.surname,
			name: data.name,
			patrname: data.patronymic,
			email: data.email,
			street: data.populationStreet,
			building: data.populationHouseNumber.toString(),
			apartment: data.populationApartmentNumber.toString(),
			certificateNumber:
				data.idpCertificateNumber || data.disabilityCertificateNumber || data.birthCertificateNumber,
			regionFrom: data.movementArea,
			settlementFrom: data.movementCity,
			phone: data.phone,
		};
		const res = await api.lists.addNewPerson(lists[formList[tabIndex].name].id, body);
		setIsLoading(false);
		if ('data' in res) {
			setIsModalSuccessOpen(true);
		} else if ('error' in res) {
			setErrorMessage('Перевірте, будь ласка, дані та спробуйте ще раз!');
			setIsModalErrorOpen(true);
		}
	};

	const handleErrorModalOnClose = () => {
		setErrorMessage('');
		setIsModalErrorOpen(false);
	};

	const handleSuccessModalOnClose = () => {
		setIsModalSuccessOpen(false);
	};

	const tabFormVariantOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const newTabIndex = formList.findIndex((item) => item.label === value);
		setTabIndex(newTabIndex);
		setActiveTab(formList[newTabIndex].name);
		unregister();
	};

	const disabledClass = !lists[formList[tabIndex].name].id && s.disabled;

	return (
		<div className={s.Form}>
			<Tabs
				onChange={tabFormVariantOnChange}
				name="formVariant"
				defaultValue={formList[tabIndex].label}
				labels={formList.map((form) => form.label)}
			/>
			<form className={clsx(s.formFields, disabledClass)} onSubmit={handleSubmit(onSubmit)}>
				{formList[tabIndex].fieldList.map((field) => {
					if (!formFieldsData[field]) return null;
					const condition = formFieldsData[field]?.condition;
					if (condition) return null;
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
									className={clsx(s.field, s[formFieldsData[field].widthSize])}
									maxLength={formFieldsData[field].inputMaxLength}
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
									className={clsx(s.field, s[formFieldsData[field].widthSize])}
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
									className={clsx(s.field, s[formFieldsData[field].widthSize])}
									text={formFieldsData[field].text || ''}
								/>
							);
					}
				})}

				<Button className={s.submitButton} submit disabled={!watchConsent || !isValidFixed}>
					Зареєструватись
				</Button>
				{isLoading && <LoaderOverlay />}
				{errorMessage && (
					<ModalPop
						type="error"
						title={'Помилка реєстрації!'}
						isOpen={isModalErrorOpen}
						onClose={handleErrorModalOnClose}
					>
						{errorMessage}
					</ModalPop>
				)}
				{isModalSuccessOpen && (
					<ModalPop
						isOpen={isModalSuccessOpen}
						onClose={handleSuccessModalOnClose}
						title={'Дякуємо за реєстрацію!'}
					>
						<Text variant="p">
							Ми відправили листа на вашу електронну адресу з посиланням для підтвердження реєстрації.
							<br />
							Будь ласка, перевірте свою поштову скриньку та перейдіть за посиланням для завершення процесу
							реєстрації.
							<br />
							<br />
							{'Якщо ви не знайшли наш лист у папці "Вхідні", будь ласка, перевірте папку "Спам".'}
						</Text>
					</ModalPop>
				)}
			</form>
		</div>
	);
}

import { useEffect, useState } from 'react';

import { Text } from '~components/Text/Text';
import { getErrorMessageFromCode } from '~helpers/getErrorMessageFromCode';

import s from './UnsuccessRegistrationPage.module.scss';

interface ParsedUrlQuery {
	error?: string;
}

interface UnsuccessRegistrationPageProps {
	data: ParsedUrlQuery;
}

export function UnsuccessRegistrationPage(props: UnsuccessRegistrationPageProps) {
	const [errorMessage, setErrorMessage] = useState('');
	const { error } = props.data;

	useEffect(() => {
		if (error) {
			const message = getErrorMessageFromCode(error, {
				432: 'Список не активний',
				434: 'Реєстрація закрита або список заповнений',
				437: 'Не вдалося зареєструвати. Спробуйте пізніше',
				438: 'Ваш e-mail вже зареєстрований',
				500: 'Спробуйте пізніше',
			});
			setErrorMessage(message);
		}
	}, [error]);

	return (
		<>
			<Text variant="h2" className={s.title}>
				Увага!
			</Text>
			<Text variant="h3" className={s.subTitle}>
				{errorMessage}
			</Text>
		</>
	);
}

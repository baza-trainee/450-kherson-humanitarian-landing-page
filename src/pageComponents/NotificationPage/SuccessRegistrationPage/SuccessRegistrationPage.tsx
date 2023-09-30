import { Text } from '~components/Text/Text';

interface ParsedUrlQuery {
	issueDate?: string;
	issueTime?: string;
}

interface SuccessRegistrationPageProps {
	data: ParsedUrlQuery;
}

export function SuccessRegistrationPage(props: SuccessRegistrationPageProps) {
	const { issueDate, issueTime } = props.data;
	return (
		<>
			<Text variant="h2">Вітаємо!</Text>
			<Text variant="h3">Ви успішно зареєструвались на отримання гуманітарної допомоги</Text>
			<Text variant="p">
				{`Видача допомоги відбудеться ${issueDate} о ${issueTime} годині за адресою: м. Кривий Ріг, вул.Гетьманська 39А.`}
			</Text>
		</>
	);
}

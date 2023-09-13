import { ButtonLink } from '~components/Buttons/ButtonLink';
import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';

import s from './SuccessRegistrationPage.module.scss';

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
		<Section>
			<Container className={s.container}>
				<div className={s.wrapper}>
					<div className={s.text}>
						<Text variant="h2" className={s.title}>
							Вітаємо!
						</Text>
						<Text variant="h3" className={s.subTitle}>
							Ви успішно зареєструвались на отримання гуманітарної допомоги
						</Text>
						<Text variant="p" className={s.description}>
							{`Видача допомоги відбудеться ${issueDate} о ${issueTime} годині за адресою: м. Кривий Ріг, вул.
							Гетьманська 39А.`}
						</Text>
					</div>
					<ButtonLink href="/" className={s.button}>
						На головну
					</ButtonLink>
				</div>
			</Container>
		</Section>
	);
}

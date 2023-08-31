import { ButtonLink } from '~components/Buttons/ButtonLink';
import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';

import s from './UnsuccessRegistrationPage.module.scss';

export function UnsuccessRegistrationPage() {
	return (
		<Section>
			<Container className={s.container}>
				<div className={s.wrapper}>
					<div className={s.text}>
						<Text variant="h2" className={s.title}>
							Увага!
						</Text>
						<Text variant="h3" className={s.subTitle}>
							На жаль, ваше повідомлення не було доставлене, оскільки електрона адреса введена некоректно.
						</Text>
						<Text variant="p" className={s.description}>
							Просимо перевірити правильність заповнення поля “E-MAIL” та спробувати ще раз.
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

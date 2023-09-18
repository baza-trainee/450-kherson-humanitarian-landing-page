import { Text } from '~components/Text/Text';

import s from './UnsuccessRegistrationPage.module.scss';

export function UnsuccessRegistrationPage() {
	return (
		<>
			<Text variant="h2" className={s.title}>
				Увага!
			</Text>
			<Text variant="h3" className={s.subTitle}>
				На жаль, ваше повідомлення не було доставлене, оскільки електрона адреса введена некоректно.
			</Text>
			<Text variant="p" className={s.description}>
				Просимо перевірити правильність заповнення поля “E-MAIL” та спробувати ще раз.
			</Text>
		</>
	);
}

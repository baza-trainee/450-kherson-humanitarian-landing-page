import { Container } from '~components/Container/Container';
import { Icon } from '~components/Icon/Icon';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';

import { Form } from './Form/Form';
import { Info } from './Info/Info';

import s from './GetHelp.module.scss';

export function GetHelp() {
	return (
		<Section className={s.GetHelp} id="get-help">
			<Container className={s.container}>
				<div className={s.formContainer}>
					<div className={s.headingContainer}>
						<Text variant="h2">Отримати допомогу</Text>
						<div className={s.description}>
							<Text variant="h3">Для отримання гуманітарної допомоги, заповніть, будь ласка, форму нижче</Text>
							<div className={s.alert}>
								<Icon icon="icon--attention" colors={{ default: 'var(--color--warning-1)' }} />
								<Text variant="subtitle">
									<div className="icon-24--attention" />
									Видача гуманітарної допомоги відбувається за наявністю документів зазначених у формі
									реєстрації, а також документів інших членів сімей, що підтверджують їхню особу
								</Text>
							</div>
						</div>
					</div>
					<Form />
				</div>
				<Info />
			</Container>
		</Section>
	);
}

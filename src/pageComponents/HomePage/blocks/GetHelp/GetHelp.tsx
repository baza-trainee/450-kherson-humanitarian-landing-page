import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';

import { Form } from './Form/Form';

import s from './GetHelp.module.scss';

export function GetHelp() {
	return (
		<Section className={s.GetHelp}>
			<Container>
				<h2>GetHelp</h2>
				<div className={s.content}>
					<Form />
					<div className={s.info} />
				</div>
			</Container>
		</Section>
	);
}

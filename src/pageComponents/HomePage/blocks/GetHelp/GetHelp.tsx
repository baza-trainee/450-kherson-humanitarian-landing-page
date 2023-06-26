import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';

import s from './GetHelp.module.scss';

export function GetHelp() {
	return (
		<Section className={s.GetHelp}>
			<Container>
				<h2>GetHelp</h2>
			</Container>
		</Section>
	);
}

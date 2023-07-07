import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';
import { Text } from '~/components/Text/Text';

import s from './AboutUs.module.scss';

export function AboutUs() {
	return (
		<Section className={s.AboutUs}>
			<Container>
				<h2 className={s.H2}>AboutUs</h2>
				<Text variant="h1">h1 Check</Text>
				<Text variant="h2">h2 Check</Text>
				<Text variant="h3">h3 Check</Text>
				<Text variant="h4">h4 Check</Text>
				<Text variant="subtitle">subtitle-h6 Check</Text>
				<Text variant="p">p Check</Text>
				<Text variant="button">button Check</Text>
				<Text variant="header">header Check</Text>
				<Text variant="footer">footer Check</Text>
				<Text variant="various1">various1 Check</Text>
				<Text variant="various2">various2 Check</Text>
				<Text variant="various3">various3 Check</Text>
			</Container>
		</Section>
	);
}

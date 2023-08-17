import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';

import s from './Projects.module.scss';

export function Projects() {
	return (
		<Section className={s.Projects} id="projects">
			<Container>
				<h2>Projects</h2>
			</Container>
		</Section>
	);
}

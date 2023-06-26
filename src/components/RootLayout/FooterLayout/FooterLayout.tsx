import { Container } from '~components/Container/Container';

import s from './FooterLayout.module.scss';

export function FooterLayout() {
	return (
		<footer className={s.FooterLayout}>
			<Container>
				<h2>footer</h2>
			</Container>
		</footer>
	);
}

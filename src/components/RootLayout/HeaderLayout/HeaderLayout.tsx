import { Container } from '~components/Container/Container';

import s from './HeaderLayout.module.scss';

export function HeaderLayout() {
	return (
		<header className={s.HeaderLayout}>
			<Container>
				<h2>header</h2>
			</Container>
		</header>
	);
}

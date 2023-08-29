import Image from 'next/image';

import { Container } from '~components/Container/Container';

import logo from '/public/svg/logo.svg';

import s from './HeaderLite.module.scss';

export function HeaderLite() {
	return (
		<header className={s.HeaderLite}>
			<Container>
				<div className={s.row}>
					<Image src={logo} alt="logo" width={142} height={60} />
				</div>
			</Container>
		</header>
	);
}

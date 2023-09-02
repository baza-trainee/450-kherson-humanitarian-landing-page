import Image from 'next/image';
import Link from 'next/link';

import { Container } from '~components/Container/Container';
import { ROUTES } from '~constants/ROUTES';

import logo from '/public/svg/logo.svg';

import s from './HeaderLite.module.scss';

export function HeaderLite() {
	return (
		<header className={s.HeaderLite}>
			<Container>
				<Link href={ROUTES.home} className={s.row}>
					<Image src={logo} alt="logo" width={142} height={60} />
				</Link>
			</Container>
		</header>
	);
}

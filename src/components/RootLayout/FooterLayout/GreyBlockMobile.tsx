import Image from 'next/image';
import Link from 'next/link';

import { Text } from '~components/Text/Text';

import { TwoLists } from './TwoLists';
import logo from '/public/svg/logo.svg';

import s from './FooterLayout.module.scss';

export function GreyBlockMobile() {
	return (
		<>
			<TwoLists />
			<div className={s.logoAndCallToAction}>
				<Link href="#hero">
					<Image priority={true} src={logo} alt="logo" width={142} height={60} />
				</Link>
				<Text variant="h3">Давайте допоможемо разом</Text>
			</div>
			<Text variant="subtitle" className={s.rulesProtected}>
				Розробка Baza Trainee Ukraine 2023. Усі права захищені.
			</Text>
		</>
	);
}

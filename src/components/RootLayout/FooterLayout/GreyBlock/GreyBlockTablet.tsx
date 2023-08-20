import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { Text } from '~components/Text/Text';

import { NavigationAndDocuments } from './NavigationAndDocuments/NavigationAndDocuments';
import logo from '/public/svg/logo.svg';

import s from './GreyBlock.module.scss';

export function GreyBlockTablet() {
	return (
		<>
			<div className={s.mainInfo}>
				<Link href="#hero">
					<Image priority={true} src={logo} alt="logo" width={142} height={60} />
				</Link>
				<Text variant="h3" className={clsx(s.fontSizeCallToAction, s.widthCallToAction)}>
					Давайте
					<br />
					допоможемо разом
				</Text>
				<Text variant="subtitle" className={clsx(s.fontSizeBaza, s.widthBaza)}>
					Розробка Baza Trainee Ukraine 2023.
					<br />
					Усі права захищені.
				</Text>
			</div>
			<NavigationAndDocuments />
		</>
	);
}

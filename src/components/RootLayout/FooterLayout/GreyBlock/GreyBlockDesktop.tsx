import Image from 'next/image';
import Link from 'next/link';

import { Text } from '~components/Text/Text';

import { NavigationAndDocuments } from './NavigationAndDocuments/NavigationAndDocuments';
import logo from '/public/svg/logo.svg';

import s from './GreyBlock.module.scss';

export function GreyBlockDesktop() {
	return (
		<>
			<div className={s.mainInfo}>
				<Link href="#hero" scroll={false}>
					<Image priority={true} src={logo} alt="logo" width={290} height={120} />
				</Link>
				<div className={s.greyBlockText}>
					<Text variant="h3" className={s.widthCallToAction}>
						Давайте
						<br />
						допоможемо разом
					</Text>
					<Text variant="subtitle" className={s.widthBaza}>
						Розробка Baza Trainee Ukraine 2023.
						<br />
						Усі права захищені.
					</Text>
				</div>
			</div>
			<NavigationAndDocuments />
		</>
	);
}

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import type { DocumentsOfMainSite } from '~api/types/footer/DocumentsOfMainSite';
import { Text } from '~components/Text/Text';

import { NavigationAndDocuments } from './NavigationAndDocuments/NavigationAndDocuments';
import logo from '/public/svg/logo.svg';

import s from './GreyBlock.module.scss';

interface GreyBlockTabletProps {
	documentsData?: DocumentsOfMainSite;
}

export function GreyBlockTablet({ documentsData }: GreyBlockTabletProps) {
	return (
		<>
			<div className={s.mainInfo}>
				<Link href="#hero" scroll={false}>
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
			<NavigationAndDocuments documentsData={documentsData} />
		</>
	);
}

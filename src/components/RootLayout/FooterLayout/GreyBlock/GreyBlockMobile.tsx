import Image from 'next/image';
import Link from 'next/link';

import type { DocumentsOfMainSite } from '~api/types/footer/DocumentsOfMainSite';
import { Text } from '~components/Text/Text';

import { NavigationAndDocuments } from './NavigationAndDocuments/NavigationAndDocuments';
import logo from '/public/svg/logo.svg';

import s from './GreyBlock.module.scss';

interface GreyBlockMobileProps {
	documentsData?: DocumentsOfMainSite;
}

export function GreyBlockMobile({ documentsData }: GreyBlockMobileProps) {
	return (
		<>
			<NavigationAndDocuments documentsData={documentsData} />
			<div className={s.logoAndCallToAction}>
				<Link href="#hero" scroll={false}>
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

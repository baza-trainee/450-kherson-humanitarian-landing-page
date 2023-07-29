import Image from 'next/image';

import { Text } from '~components/Text/Text';

import s from './Info.module.scss';

export function Info() {
	return (
		<div className={s.Info}>
			<div className={s.tracker}>
				<Text variant="h3">На отримання наборів зареєстровано</Text>
				<div className={s.trackerIndicator}>
					<Image src={'/svg/getHelp/state-70.svg'} alt={'status'} width={120} height={120} />
					<div className={s.numbers}>
						<Text variant="various2">155</Text>
						<Text variant="various2">/</Text>
						<Text variant="various2">200</Text>
					</div>
				</div>
				<Text variant="subtitle">
					Місцезнаходження пункту видачі гуманітарної допомоги: м. Кривий Ріг, вул. Гетьманська 39А
				</Text>
			</div>
			<div className={s.map} />
		</div>
	);
}

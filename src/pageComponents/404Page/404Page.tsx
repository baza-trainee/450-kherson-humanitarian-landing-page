import Image from 'next/image';

import errorImage from '~/assets/images/error-404.png';
import { ButtonLink } from '~components/Buttons/ButtonLink';
import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';

import s from './404Page.module.scss';

export function Page404() {
	return (
		<Section className={s.Page404}>
			<Container className={s.container}>
				<div className={s.wrapper}>
					<Text variant="h2" className={s.title}>
						Сторінка не знайдена
					</Text>
					<div className={s.content}>
						<div className={s.image}>
							<Image src={errorImage} alt="error massage" fill priority />
						</div>
						<div>
							<Text variant="h3" className={s.text}>
								Шкода, але сторінку не знайдено.
							</Text>
							<Text variant="h3" className={s.text}>
								Можливо, її перенесли або видалили.
							</Text>
						</div>
						<ButtonLink href="/" className={s.button}>
							На головну
						</ButtonLink>
					</div>
				</div>
			</Container>
		</Section>
	);
}

import type { ParsedUrlQuery } from 'querystring';

import { ButtonLink } from '~components/Buttons/ButtonLink';
import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';

import { Page404 } from '../404Page/404Page';
import { SuccessRegistrationPage } from './SuccessRegistrationPage/SuccessRegistrationPage';
import { UnsuccessRegistrationPage } from './UnsuccessRegistrationPage/UnsuccessRegistrationPage';

import s from './NotificationPage.module.scss';

const pages = ['unsuccess-registration', 'success-registration'];

interface NotificationPageProps {
	queryData: ParsedUrlQuery;
}

export function NotificationPage({ queryData }: NotificationPageProps) {
	const slug = typeof queryData.slug === 'string' ? queryData.slug : queryData.slug?.[0];

	return (
		<>
			{slug && pages.includes(slug) ? (
				<Section>
					<Container className={s.container}>
						<div className={s.content}>
							{
								{
									'unsuccess-registration': <UnsuccessRegistrationPage data={queryData} />,
									'success-registration': <SuccessRegistrationPage data={queryData} />,
								}[slug]
							}
							<ButtonLink href="/" className={s.button}>
								На головну
							</ButtonLink>
						</div>
					</Container>
				</Section>
			) : (
				<Page404 />
			)}
		</>
	);
}

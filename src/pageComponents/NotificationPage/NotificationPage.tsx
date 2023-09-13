import { useRouter } from 'next/router';

import { SuccessRegistrationPage } from './SuccessRegistrationPage/SuccessRegistrationPage';
import { UnsuccessRegistrationPage } from './UnsuccessRegistrationPage/UnsuccessRegistrationPage';

import s from './NotificationPage.module.scss';

export function NotificationPage() {
	const { query } = useRouter();

	return (
		<main className={s.NotificationPage}>
			{query.slug === 'unsuccess-registration' && <UnsuccessRegistrationPage />}
			{query.slug === 'success-registration' && <SuccessRegistrationPage data={query} />}
		</main>
	);
}

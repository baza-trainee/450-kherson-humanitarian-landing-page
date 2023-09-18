import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next/types';

import { NotificationPage } from '~/pageComponents/NotificationPage/NotificationPage';
import { LayoutLite } from '~components/LayoutLite/LayoutLite';
import { Meta } from '~components/Meta/Meta';
import { APP } from '~constants/APP';

export default function Notification(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<LayoutLite>
			<Meta title={APP.name}>
				<NotificationPage queryData={props.queryData} />
			</Meta>
		</LayoutLite>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const { query } = context;

	return {
		props: {
			queryData: query,
		},
	};
}

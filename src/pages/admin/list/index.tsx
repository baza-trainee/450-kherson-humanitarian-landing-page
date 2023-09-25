import type { GetServerSidePropsContext } from 'next';

import { ListPage } from '~/pageComponents/AdminPage/pages/ListPage/ListPage';
import { api } from '~api/index';
import type { List } from '~api/types/Admin/Lists/List';
import { Meta } from '~components/Meta/Meta';
import { APP } from '~constants/APP';

export interface ListProps {
	list?: List;
}

export default function List(props: ListProps) {
	return (
		<Meta title={APP.name}>
			<ListPage list={props.list} />
		</Meta>
	);
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
	const listId = context.query.id?.toString() || '';
	const { token } = context.req.cookies;
	const props = {} as ListProps;

	const resp = await api.lists.getListById(listId, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	if ('data' in resp) props.list = resp.data;

	return { props };
}

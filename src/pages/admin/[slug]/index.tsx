import { AdminPage } from '~/pageComponents/AdminPage/AdminPage';
import { Meta } from '~components/Meta/Meta';
import { APP } from '~constants/APP';

export default function Admin() {
	return (
		<Meta title={APP.name}>
			<AdminPage />
		</Meta>
	);
}

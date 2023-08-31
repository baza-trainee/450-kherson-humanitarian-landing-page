import { NotificationPage } from '~/pageComponents/NotificationPage/NotificationPage';
import { LayoutLite } from '~components/LayoutLite/LayoutLite';
import { Meta } from '~components/Meta/Meta';
import { APP } from '~constants/APP';

export default function Notification() {
	return (
		<LayoutLite>
			<Meta title={APP.name}>
				<NotificationPage />
			</Meta>
		</LayoutLite>
	);
}

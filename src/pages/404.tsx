import { Page404 } from '~/pageComponents/Page404/Page404';
import { LayoutLite } from '~components/LayoutLite/LayoutLite';
import { Meta } from '~components/Meta/Meta';
import { APP } from '~constants/APP';

export default function NotFoundPage() {
	return (
		<LayoutLite>
			<Meta title={APP.name}>
				<Page404 />
			</Meta>
		</LayoutLite>
	);
}

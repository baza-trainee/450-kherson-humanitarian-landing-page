import { Page404 } from '~/pageComponents/404Page/404Page';
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

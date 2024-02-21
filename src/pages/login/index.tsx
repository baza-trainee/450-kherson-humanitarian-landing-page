import { LogInPage } from '~/pageComponents/LogInPage/LogInPage';
import { LayoutLite } from '~components/LayoutLite/LayoutLite';
import { Meta } from '~components/Meta/Meta';
import { APP } from '~constants/APP';

export default function LogIn() {
	return (
		<LayoutLite>
			<Meta title={APP.name}>
				<LogInPage />
			</Meta>
		</LayoutLite>
	);
}

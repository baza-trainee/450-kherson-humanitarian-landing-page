import { LogInPage } from '~/pageComponents/LogInPage/LogInPage';
import { Meta } from '~components/Meta/Meta';
import { APP } from '~constants/APP';

export default function LogIn() {
	return (
		<Meta title={APP.name}>
			<LogInPage />
		</Meta>
	);
}

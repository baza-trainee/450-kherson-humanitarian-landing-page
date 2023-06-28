import { HomePage } from '~/pageComponents/HomePage/HomePage';
import { Meta } from '~components/Meta/Meta';
import { APP } from '~constants/APP';

export default function Home() {
	return (
	<Meta title={APP.name}>
			<HomePage />
		</Meta>
	);
}

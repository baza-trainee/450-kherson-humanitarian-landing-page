import { HomePage } from '~/pageComponents/HomePage/HomePage';
import { Meta } from '~components/Meta/Meta';
import { RootLayout } from '~components/RootLayout/RootLayout';
import { APP } from '~constants/APP';

export default function Home() {
	return (
		<RootLayout>
			<Meta title={APP.name}>
				<HomePage />
			</Meta>
		</RootLayout>
	);
}

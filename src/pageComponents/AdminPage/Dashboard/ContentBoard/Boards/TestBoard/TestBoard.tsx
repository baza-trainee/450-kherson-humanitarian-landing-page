import { ImgUpload } from '~components/ImgUpload/ImgUpload';

interface TestBoardProps {
	tabId: string;
	tabName: string;
}

export function TestBoard({ tabId, tabName }: TestBoardProps) {
	return (
		<>
			<ImgUpload />
			<p>ContentBoard</p>
			<p>ContentBoard</p>
		</>
	);
}

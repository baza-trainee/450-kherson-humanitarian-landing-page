import { Text } from '~components/Text/Text';
export function EmptyBoard() {
	return (
		<div>
			<Text variant="h3">Дані відсутні</Text>
			<Text variant="p">Натисніть &quot;+&quot;, щоб додати новий блок</Text>
		</div>
	);
}

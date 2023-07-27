import { Icon } from '~components/Icon/Icon';
import { Text } from '~components/Text/Text';

import s from './ErrorMessage.module.scss';

export function ErrorMessage() {
	return (
		<div className={s.ErrorMessage}>
			<Icon icon="icon--attention" colors={{ default: 'var(--color--error-1)' }} />
			<Text className={s.message} variant="p">
				Вибачте, ви вже зареєстровані на видачу гуманітарної допомоги. Стежте за нами у соціальних мережах аби
				дізнатися про дату наступної видачі допомоги
			</Text>
		</div>
	);
}

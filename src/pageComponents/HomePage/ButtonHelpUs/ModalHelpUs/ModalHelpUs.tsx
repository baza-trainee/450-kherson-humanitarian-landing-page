import { useState } from 'react';

import { Button } from '~components/Buttons/Button';
import { Icon } from '~components/Icon/Icon';
import { Tabs } from '~components/inputs/Tabs/Tabs';
import { Modal } from '~components/Modal/Modal';
import { Text } from '~components/Text/Text';

import { ibanData } from './data/ibanData';
import { modalList } from './data/modalList';

import s from './ModalHelpUs.module.scss';

export function ModalHelpUs({ onClose }: { onClose: () => void }) {
	const [tabIndex, setTabIndex] = useState(0);
	const [isCopied, setIsCopied] = useState(false);

	const tabModalVariantOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const valueIndex = modalList.findIndex((item) => item.label === value);
		setTabIndex(valueIndex);
	};

	const textToCopy = tabIndex === 0 ? ibanData['USD'] : ibanData['EUR'];

	const onCopy = () => {
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				setIsCopied(true);
				setTimeout(() => setIsCopied(false), 2000);
			})
			.catch((error) => {
				console.error('Помилка копіювання тексту:', error);
			});
	};

	return (
		<Modal isOpen={true} onClose={onClose}>
			<div className={s.container}>
				<Text className={s.heading} variant="h2">
					Підтримати гуманітарний напрямок
				</Text>
				<div className={s.block}>
					<Text className={s.heading} variant="h2">
						Банківський переказ
					</Text>
					<Tabs
						onChange={tabModalVariantOnChange}
						name="modalVariant"
						defaultValue={modalList[tabIndex].label}
						labels={modalList.map((item) => item.label)}
					/>
					<ul className={s.items}>
						{modalList[tabIndex].fieldList.map((item) => (
							<li className={s.item} key={item.id}>
								<Text variant="h3">{item.title}</Text>
								<Text variant="h5">{item.text}</Text>
							</li>
						))}
					</ul>
					<Button className={s.button} type="secondary" onClick={onCopy}>
						{isCopied ? (
							<span>Скопійовано</span>
						) : (
							<>
								<span>Скопіювати IBAN</span>
								<Icon
									icon="icon--copy"
									colors={{
										default: 'var(--color--primary-3)',
									}}
									onClick={() => null}
									className={s.icon}
								/>
							</>
						)}
					</Button>
				</div>
			</div>
		</Modal>
	);
}

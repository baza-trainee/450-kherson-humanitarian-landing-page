import { useState } from 'react';

import { Button } from '~components/Buttons/Button';
import { Icon } from '~components/Icon/Icon';
import { Tabs } from '~components/inputs/Tabs/Tabs';
import { Modal } from '~components/Modal/Modal';
import { Text } from '~components/Text/Text';

import { modalList } from './data/modalList';

import s from './ModalHelpUs.module.scss';

export function ModalHelpUs() {
	const [tabIndex, setTabIndex] = useState(0);

	const tabModalVariantOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const valueIndex = modalList.findIndex((item) => item.label === value);
		setTabIndex(valueIndex);
	};

	return (
		<Modal isOpen={true} onClose={() => console.log('modal')}>
			<div className={s.content}>
				<Text className={s.heading} variant="h2">
					Підтримати
					<br /> гуманітарний
					<br /> напрямок
				</Text>
				<div className={s.block}>
					<Text variant="h2">
						Банківський
						<br /> переказ
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
					<Button className={s.button} type="secondary">
						<span>Скопіювати IBAN</span>
						<Icon
							icon="icon--copy"
							colors={{
								default: 'var(--color--primary-3)',
							}}
							onClick={() => null}
							className={s.icon}
						/>
					</Button>
				</div>
			</div>
		</Modal>
	);
}

import { useState } from 'react';

import clsx from 'clsx';

import type { DonationsResponse } from '~api/types/backend/responses/DonationsResponse';
import { Button } from '~components/Buttons/Button';
import { Icon } from '~components/Icon/Icon';
import { Tabs } from '~components/inputs/Tabs/Tabs';
import { Modal } from '~components/Modal/Modal';
import { Text } from '~components/Text/Text';

import s from './ModalHelpUs.module.scss';

interface ModalHelpUsProps {
	onClose: () => void;
	donations?: DonationsResponse;
}

export function ModalHelpUs({ onClose, donations }: ModalHelpUsProps) {
	const [tabIndex, setTabIndex] = useState(0);
	const [isCopied, setIsCopied] = useState(false);

	const tabModalVariantOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		const valueIndex = donations ? donations.findIndex((item) => item.currency === value) : 0;
		setTabIndex(valueIndex);
	};

	const textToCopy = donations ? donations[tabIndex].IBAN : '';

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
		<>
			{donations && (
				<Modal isOpen={true} onClose={onClose}>
					<div className={s.container}>
						<Text className={s.heading} variant="h2">
							Підтримати гуманітарний напрямок
						</Text>
						<div className={s.block}>
							<Text className={clsx(s.heading, s.headingInner)} variant="h2">
								Банківський переказ
							</Text>
							<Tabs
								className={s.fontSize}
								onChange={tabModalVariantOnChange}
								name="modalVariant"
								defaultValue={donations[tabIndex].currency}
								labels={donations.map((item) => item.currency)}
							/>
							<ul className={s.items}>
								<li className={s.item}>
									<Text variant="h5">Одержувач:</Text>
									<Text variant="h3">{donations[tabIndex].recipient}</Text>
								</li>
								<li className={s.item}>
									<Text variant="h5">IBAN:</Text>
									<Text variant="h3">{donations[tabIndex].IBAN}</Text>
								</li>
								<li className={s.item}>
									<Text variant="h5">ЄДРПОУ:</Text>
									<Text variant="h3">{donations[tabIndex].IPN}</Text>
								</li>
								<li className={s.item}>
									<Text variant="h5">Призначення платежу:</Text>
									<Text variant="h3">{donations[tabIndex].paymentPurpose}</Text>
								</li>
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
			)}
		</>
	);
}

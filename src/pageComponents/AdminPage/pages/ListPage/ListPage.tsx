import type { List } from '~api/types/Admin/Lists/List';
import type { Column } from '~components/Table/Table';
import { Table } from '~components/Table/Table';
import { Text } from '~components/Text/Text';
import { useLoaderOverlay } from '~hooks/useLoaderOverlay';

interface ListPageProps {
	list?: List;
}

import { useState } from 'react';

import { useRouter } from 'next/router';

import { api } from '~api/index';
import { Icon } from '~components/Icon/Icon';
import { IconButton } from '~components/IconButton/IconButton';
import { Label } from '~components/Label/Label';
import { ROUTES } from '~constants/ROUTES';

import { ModalRemove } from '../../components/ModalRemove/ModalRemove';
import { statusTypes } from '../../data/statusTypes';

import s from './ListPage.module.scss';

const categories = {
	idp: {
		listId: 'temp_moved',
		title: 'Допомога ВПО',
		certificateTitle: 'Номер довідки ВПО',
	},
	invalid: {
		listId: 'invalid',
		title: 'Допомога людям з інвалідністю',
		certificateTitle: 'Номер посвідчення з інвалідності',
	},
	child: {
		listId: 'child',
		title: 'Допомога дітям',
		certificateTitle: 'Номер свідоцтва про народження',
	},
};

export function ListPage({ list }: ListPageProps) {
	const router = useRouter();

	const { LoaderOverlay, showLoaderOverlay } = useLoaderOverlay();

	const [isModalRemoveOpen, setIsModalRemoveOpen] = useState(false);

	if (!list?.persons || (list.persons && list.persons.length < 0)) return;

	const columns: Column<(typeof list.persons)[number]>[] = [
		{
			key: 'surname',
			header: 'Прізвище',
		},
		{
			key: 'name',
			header: "Ім'я",
		},
		{
			key: 'patronymic',
			header: 'По-батькові',
		},
		{
			key: 'populationStreet',
			header: 'Назва вулиці',
		},
		{
			key: 'populationHouseNumber',
			header: 'Номер будинку',
		},
		{
			key: 'populationApartmentNumber',
			header: 'Номер квартири',
		},
		{
			key: 'certificateNumber',
			header: categories[list.category].certificateTitle,
		},
		{
			key: 'movementArea',
			header: 'Звідки переміщені',
		},
		{
			key: 'movementCity',
			header: 'Назва населеного пункту',
		},
		{
			key: 'email',
			header: 'E-mail',
		},
		{
			key: 'phone',
			header: 'Номер телефону',
		},
	];

	const handleBackButtonOnClick = () => {
		showLoaderOverlay();
		router.push(`${ROUTES.admin}/lists?id=${categories[list.category].listId}`);
	};

	const handleDownloadListFileOnClick = async () => {
		const resp = await api.exportList.getListFileEndpointById(list.id);
		if ('data' in resp) window.open(resp.data.downloadUrl, '_blank');
	};

	const handleOnModalRemoveYesClick = async () => {
		showLoaderOverlay();
		const resp = await api.lists.removeList(list.id);
		if ('data' in resp) router.push(`${ROUTES.admin}/lists?id=${list.category}`);
	};

	const handleRemoveOnClick = async () => {
		setIsModalRemoveOpen(true);
	};

	return (
		<div className={s.ListPage}>
			<header className={s.header}>
				<div className={s.heading}>
					<IconButton
						type="secondary"
						icon={'icon--arrow-left'}
						onClick={handleBackButtonOnClick}
					/>
					<Text variant="h3">{categories[list.category].title}</Text>
				</div>
				<div className={s.info}>
					<Text>
						{list.personsRegistered} / {list.availableSets}
					</Text>
					<Text>
						{list.issueDate} {list.issueTime}
					</Text>
					<Label type={statusTypes[list.listStatus]?.type}>
						{statusTypes[list.listStatus]?.title || ''}
					</Label>
					<Icon icon="icon--download" onClick={handleDownloadListFileOnClick} />
					<Icon icon="icon--trash" onClick={handleRemoveOnClick} />
				</div>
			</header>
			<main className={s.main}>
				<Table columns={columns} data={list.persons} />
			</main>
			<LoaderOverlay />
			<ModalRemove
				isModalOpen={isModalRemoveOpen}
				setIsModalOpen={setIsModalRemoveOpen}
				onYesClick={handleOnModalRemoveYesClick}
			/>
		</div>
	);
}

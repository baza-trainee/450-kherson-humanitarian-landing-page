import clsx from 'clsx';

import { TableHeader } from './TableHeader/TableHeader';
import type { RowCellData } from './TableRow/TableRow';
import { TableRow } from './TableRow/TableRow';

import s from './Table.module.scss';

export interface Column<T> {
	key: string | number;
	header?: string | ((key: string | number) => React.ReactElement);
	cell?: string | ((row: RowCellData<T>) => React.ReactElement);
	width?: string | number;
}

export type TableElement = HTMLTableElement;

export interface TableProps<T> extends ReactHTMLElementAttributes<TableElement> {
	columns: Column<T>[];
	data: T[];
}

export function Table<T>({ columns, data, className, ...rest }: TableProps<T>) {
	const header = columns.map((column) => ({
		key: column.key,
		header: column.header,
		width: column.width,
	}));

	const body = data.map((dataElement) => {
		const values = dataElement !== null && typeof dataElement === 'object' ? Object.values(dataElement).join() : '';
		return {
			index: values,
			rowAllValues: dataElement,
			cells: columns.map((column) => ({
				key: column.key,
				cell: column.cell,
				width: column.width,
				value: dataElement[column.key as keyof T],
			})),
		};
	});

	return (
		<table className={clsx(s.Table, 'scroll', className)} {...rest}>
			<TableHeader header={header} />
			<tbody className={s.body}>
				{body.map((bodyRow) => (
					<TableRow
						key={bodyRow.index}
						row={{
							rowAllValues: bodyRow.rowAllValues,
							cells: bodyRow.cells,
						}}
					/>
				))}
			</tbody>
		</table>
	);
}

import clsx from 'clsx';

import { Text } from '~components/Text/Text';

import type { Column } from '../Table';

import s from './TableRow.module.scss';

export interface RowCellData<T> {
	rowAllValues: T;
	rowCell?: RowCell<T>;
}

export interface RowCell<T> extends Pick<Column<T>, 'key' | 'cell' | 'width'> {
	value: T[keyof T];
}

interface Row<T> {
	rowAllValues: T;
	cells: RowCell<T>[];
}

export type TableRowElement = HTMLTableRowElement;

export interface TableRowProps<T> extends ReactHTMLElementAttributes<TableRowElement> {
	row: Row<T>;
}

export function TableRow<T>({ row, className, ...rest }: TableRowProps<T>) {
	return (
		<tr className={clsx(s.TableRow, className)} {...rest}>
			{row.cells.map((rowCell) => {
				let styleSize;
				if (typeof rowCell.width === 'string') styleSize = { width: rowCell.width };
				if (typeof rowCell.width === 'number') styleSize = { flex: rowCell.width };
				return (
					<td className={s.cell} key={rowCell.key} style={styleSize || { flex: 1 }}>
						{/* eslint-disable-next-line no-nested-ternary */}
						{rowCell.cell ? (
							typeof rowCell.cell === 'string' ? (
								<Text variant="p">{rowCell.cell}</Text>
							) : (
								typeof rowCell.cell === 'function' && rowCell.cell({ rowCell, rowAllValues: row.rowAllValues })
							)
						) : (
							(typeof rowCell.value === 'string' || typeof rowCell.value === 'number') && (
								<Text variant="p">{rowCell.value}</Text>
							)
						)}
					</td>
				);
			})}
		</tr>
	);
}

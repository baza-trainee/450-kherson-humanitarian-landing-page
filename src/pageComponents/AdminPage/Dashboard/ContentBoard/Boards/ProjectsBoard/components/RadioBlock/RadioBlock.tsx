import type { FieldValues } from 'react-hook-form';

import { type StatusTypes, statusTypes } from '~/pageComponents/AdminPage/data/statusTypes';
import { Radio } from '~components/inputs/Radio/Radio';
import { Label } from '~components/Label/Label';

interface RadioBlockProps {
	register: FieldValues;
}

const filteredStatusTypes: StatusTypes = Object.keys(statusTypes)
	.filter((statusKey) => ['ready', 'active', 'done'].includes(statusKey))
	.reduce((obj: StatusTypes, key) => {
		obj[key] = statusTypes[key];
		return obj;
	}, {});

export default function RadioBlock({ register }: RadioBlockProps) {
	return (
		<>
			{Object.keys(filteredStatusTypes).map((statusKey) => (
				<Radio
					value={statusKey}
					name="projectStatus"
					text={statusKey}
					key={statusKey}
					register={register}
				>
					<Label type={statusTypes[statusKey].type}>{statusTypes[statusKey].title}</Label>
				</Radio>
			))}
		</>
	);
}

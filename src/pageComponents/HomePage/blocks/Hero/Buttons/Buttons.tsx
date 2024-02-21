import { ButtonHelpUs } from '~/pageComponents/HomePage/ButtonHelpUs/ButtonHelpUs';
import type { Donations } from '~api/types/donations/donations';
import { ButtonLink } from '~components/Buttons/ButtonLink';

import s from './Buttons.module.scss';

interface ButtonsProps {
	donations?: Donations;
}

export function Buttons({ donations }: ButtonsProps) {
	return (
		<div className={s.Buttons}>
			<ButtonLink href="#get-help">Отримати допомогу</ButtonLink>
			<ButtonHelpUs donations={donations} />
		</div>
	);
}

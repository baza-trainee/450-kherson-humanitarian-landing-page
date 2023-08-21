import { ButtonHelpUs } from '~/pageComponents/HomePage/ButtonHelpUs/ButtonHelpUs';
import { ButtonLink } from '~components/Buttons/ButtonLink';

import s from './Buttons.module.scss';

export function Buttons() {
	return (
		<div className={s.Buttons}>
			<ButtonLink href="#get-help">Отримати допомогу</ButtonLink>
			<ButtonHelpUs />
		</div>
	);
}

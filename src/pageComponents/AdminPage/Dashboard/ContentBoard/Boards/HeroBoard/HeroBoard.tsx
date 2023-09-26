import { useState } from 'react';

import { ColorRadioBlock } from '~components/ColorRadio/ColorRadioBlock';
import { ImgUploadWrapper } from '~components/ImgUploadWrapper/ImgUploadWrapper';

export function HeroBoard(){
	const [gradient, setGradient] = useState<string>('noGradient');
	const changeRadio = (value: string): void => {
		setGradient(value);
	};
	return(
		<>
		<ImgUploadWrapper gradientValue={gradient}/>
		<ColorRadioBlock block='imgGradient' changeRadio={changeRadio}/>
		<ColorRadioBlock block='textColor' />
		</>
	);
}

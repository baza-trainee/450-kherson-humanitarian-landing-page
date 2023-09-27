import { useState } from 'react';

import { ColorRadioBlock } from '~components/ColorRadio/ColorRadioBlock';
import { ImgUploadWrapper } from '~components/ImgUploadWrapper/ImgUploadWrapper';
import { TextInput } from '~components/inputs/TextInput/TextInput';

export function HeroBoard(){
	const [gradient, setGradient] = useState<string>('noGradient');
	const [titleColor, setTitleColor] = useState<string>('black');
	const [subtitleColor, setSubtitleColor] = useState<string>('black');
	const changeRadio = (value: string, name: string): void => {
		if (name==='imgGradient'){
			setGradient(value);
		} else
		if (name==='titleColor'){
			setTitleColor(value);
		} else if (name==='subtitleColor'){
			setSubtitleColor(value);
		}

	};

	return(
		<>
		<ImgUploadWrapper gradientValue={gradient} titleColor={titleColor} subtitleColor={subtitleColor} titleValue = 'Відбудовуємо зруйновані та пошкоджені об’єкти (Херсонська область)' subtitleValue = 'м. Кривий Ріг'/>
		<ColorRadioBlock block='imgGradient' changeRadio={changeRadio}/>
		<TextInput />
		<ColorRadioBlock block='titleColor' changeRadio={changeRadio}/>
		<TextInput />
		<ColorRadioBlock block='subtitleColor' changeRadio={changeRadio}/>
		</>
	);
}

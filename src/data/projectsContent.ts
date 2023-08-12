import image1 from '~assets/images/projects/projects-image1.png';
import image2 from '~assets/images/projects/projects-image2.png';
import image3 from '~assets/images/projects/projects-image3.png';
import image4 from '~assets/images/projects/projects-image4.png';
import image5 from '~assets/images/projects/projects-image5.png';

export const cardsData = [
	{
		src: image1.src,
		title: 'Ремонт кабінету лікаря Високопільський центр первинної медико-санітарної допомоги',
		status: {
			wait: false,
			inprogress: true,
			finished: false,
		},
	},
	{
		src: image2.src,
		title: 'Ремонт тимчасового укриття у Криворізькому обласному ліцеї для сільської молоді',
		status: {
			wait: false,
			inprogress: false,
			finished: true,
		},
	},
	{
		src: image3.src,
		title: 'Ремонт даху Високопільського центру первинної медико-санітарної допомоги',
		status: {
			wait: false,
			inprogress: true,
			finished: false,
		},
	},
	{
		src: image4.src,
		title: 'Допомога лікарням та центрам первинної медичної допомоги',
		status: {
			wait: true,
			inprogress: false,
			finished: false,
		},
	},
	{
		src: image5.src,
		title: 'Допомога лікарням та центрам первинної медичної допомоги',
		status: {
			wait: false,
			inprogress: false,
			finished: true,
		},
	},
];

export const labelData = [
	{ name: 'wait', className: 'wait', text: 'очікує на фінансування' },
	{ name: 'inprogress', className: 'inprogress', text: 'в процесі' },
	{ name: 'finished', className: 'finished', text: 'завершено' },
];

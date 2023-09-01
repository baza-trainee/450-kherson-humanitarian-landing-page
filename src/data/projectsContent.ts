import image1 from '~assets/images/projects/projects-image1.png';
import image1_1 from '~assets/images/projects/projects-image1_1.png';
import image1_2 from '~assets/images/projects/projects-image1_2.png';
import image1_3 from '~assets/images/projects/projects-image1_3.png';
import image2 from '~assets/images/projects/projects-image2.png';
import image2_1 from '~assets/images/projects/projects-image2_1.png';
import image2_2 from '~assets/images/projects/projects-image2_2.png';
import image2_3 from '~assets/images/projects/projects-image2_3.png';
import image3 from '~assets/images/projects/projects-image3.png';
import image3_1 from '~assets/images/projects/projects-image3_1.png';
import image3_2 from '~assets/images/projects/projects-image3_2.png';
import image3_3 from '~assets/images/projects/projects-image3_3.png';
import image4 from '~assets/images/projects/projects-image4.png';
import image5 from '~assets/images/projects/projects-image5.png';

export const cardsData = [
	{
		id: image1.src,
		src: image1.src,
		title: 'Ремонт кабінету лікаря Високопільський центр первинної медико-санітарної допомоги',
		status: {
			wait: false,
			inprogress: true,
			finished: false,
		},
		description: {
			images: [{ src: image1.src }, { src: image1_1.src }, { src: image1_2.src }, { src: image1_3.src }],
			title: 'Ремонт кабінету лікаря Високопілльський центр первинної медико-санітарної допомоги',
			text: 'Нова будівля Високопільського Центру первинної медицини не була призначена для лікування пацієнтів. До війни це був дитячий центр. А тому окрім руйнувань даху, потрібен був ремонт кімнат, облаштування кабінету лікарів та маніпуляційної.',
			square: '100 м2',
			duration: '08.04.2023р. - 08.05.2023р.',
			patron: 'Кошти для цього проекту були передані від Української Спілки Нижньої Саксонії',
		},
	},
	{
		id: image2.src,
		src: image2.src,
		title: 'Ремонт тимчасового укриття у Криворізькому обласному ліцеї для сільської молоді',
		status: {
			wait: false,
			inprogress: false,
			finished: true,
		},
		description: {
			images: [{ src: image2.src }, { src: image2_1.src }, { src: image2_2.src }, { src: image2_3.src }],
			title: 'Ремонт тимчасового укриття у Криворізькому обласному ліцеї для сільської молоді',
			text: 'На початку липня 2022 року до нас звернувся директор Криворізького обласного ліцею-інтернату для сільської молоді - Козаченко Ігор Олександрович, з проханням відремонтувати підвальне приміщення ліцею, аби діти змогли почати навчальний рік саме в ліцеї. Адже за наказом Міністерства освіти, у школі обов’язково має бути обладнане тимчасове укриття.',
			square: '257 м2',
			duration: '10.07.2022р. -28.08.2022р.',
			patron: 'Кошти для цього проекту були передані від Української Спілки Нижньої Саксонії',
		},
	},
	{
		id: image3.src,
		src: image3.src,
		title: 'Ремонт даху Високопільського центру первинної медико-санітарної допомоги',
		status: {
			wait: false,
			inprogress: true,
			finished: false,
		},
		description: {
			images: [{ src: image3.src }, { src: image3_1.src }, { src: image3_2.src }, { src: image3_3.src }],
			title: 'Ремонт даху Високопільського центру первинної медико-санітарної допомоги',
			text: 'З початком повномасштабного вторгнення Херсонська область перебувала під постійними обстрілами та ракетними ударами. Саме смт. Високопілля було повністю окуповане з початку квітня. За цей час сама лікарня була вщент зруйнована. А влада надала нове напів зруйноване приміщення, яке потребувало ремонту. Тому директор центру звернулась до нас з проханням допомогти відремонтувати тимчасову будівлю первинної амбулаторії, щоб люди вже могли отримувати послуги медичних лікарів.',
			square: '100 м2',
			duration: '01.03.2023р. - 01.04.2023р.',
			patron:
				'Завдяки фінансовій підтримці Угорської Екуменічної служби було відремонтовано дах центру, закуплено медичні ліжка та постільну білизну для денного стаціонару.',
		},
	},
	{
		id: image4.src,
		src: image4.src,
		title: 'Допомога лікарням та центрам первинної медичної допомоги',
		status: {
			wait: true,
			inprogress: false,
			finished: false,
		},
		description: {
			images: [{ src: image2.src }, { src: image2_1.src }, { src: image2_2.src }, { src: image2_3.src }],
			title: 'Ремонт тимчасового укриття у Криворізькому обласному ліцеї для сільської молоді',
			text: 'На початку липня 2022 року до нас звернувся директор Криворізького обласного ліцею-інтернату для сільської молоді - Козаченко Ігор Олександрович, з проханням відремонтувати підвальне приміщення ліцею, аби діти змогли почати навчальний рік саме в ліцеї. Адже за наказом Міністерства освіти, у школі обов’язково має бути обладнане тимчасове укриття.',
			square: '257 м2',
			duration: '10.07.2022р. -28.08.2022р.',
			patron: 'Кошти для цього проекту були передані від Української Спілки Нижньої Саксонії',
		},
	},
	{
		id: image5.src,
		src: image5.src,
		title: 'Допомога лікарням та центрам первинної медичної допомоги',
		status: {
			wait: false,
			inprogress: false,
			finished: true,
		},
		description: {
			images: [{ src: image3.src }, { src: image3_1.src }, { src: image3_2.src }, { src: image3_3.src }],
			title: 'Ремонт даху Високопільського центру первинної медико-санітарної допомоги',
			text: 'З початком повномасштабного вторгнення Херсонська область перебувала під постійними обстрілами та ракетними ударами. Саме смт. Високопілля було повністю окуповане з початку квітня. За цей час сама лікарня була вщент зруйнована. А влада надала нове напів зруйноване приміщення, яке потребувало ремонту. Тому директор центру звернулась до нас з проханням допомогти відремонтувати тимчасову будівлю первинної амбулаторії, щоб люди вже могли отримувати послуги медичних лікарів.',
			square: '100 м2',
			duration: '01.03.2023р. - 01.04.2023р.',
			patron:
				'Завдяки фінансовій підтримці Угорської Екуменічної служби було відремонтовано дах центру, закуплено медичні ліжка та постільну білизну для денного стаціонару.',
		},
	},
];

export const labelData = [
	{ name: 'wait', className: 'wait', text: 'очікує на фінансування' },
	{ name: 'inprogress', className: 'inprogress', text: 'в процесі' },
	{ name: 'finished', className: 'finished', text: 'завершено' },
];

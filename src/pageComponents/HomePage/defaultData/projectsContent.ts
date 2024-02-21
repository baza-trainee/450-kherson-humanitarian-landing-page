import image1 from '~assets/images/projects/projects-image1.png';
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

export const cardsData = [
	{
		id: image1.src,
		projectStatus: 'active',
		videoLink: 'https://www.youtube.com/embed/ui9iNMKLDpY?si=B2qbx1PSykS-apq9',
		subTitle:
			'Ремонт кабінету лікаря Високопільського центру первинної медико-санітарної допомоги',
		text: 'Нова будівля Високопільського Центру первинної медицини не була призначена для лікування пацієнтів. До війни це був дитячий центр. А тому окрім руйнувань даху, потрібен був ремонт кімнат, облаштування кабінету лікарів та маніпуляційної.',
		areaCompletedWorks: 100,
		projectDuration: '08.04.2023 - 08.05.2023',
		projectText: 'Кошти для цього проєкту були передані від Української Спілки Нижньої Саксонії',
		pictures: [
			{
				id: image1.src,
				image: image1.src,
			},
			{
				id: image1_2.src,
				image: image1_2.src,
			},
			{
				id: image1_3.src,
				image: image1_3.src,
			},
		],
		mainPicture: { image: image1.src },
	},
	{
		id: image2.src,
		projectStatus: 'done',
		videoLink: 'https://www.youtube.com/embed/ui9iNMKLDpY?si=B2qbx1PSykS-apq9',
		subTitle: 'Ремонт тимчасового укриття у Криворізькому обласному ліцеї для сільської молоді',
		text: "На початку липня 2022 року до нас звернувся директор Криворізького обласного ліцею-інтернату для сільської молоді - Козаченко Ігор Олександрович, з проханням відремонтувати підвальне приміщення ліцею, аби діти змогли почати навчальний рік саме в ліцеї. Адже за наказом Міністерства освіти, у школі обов'язково має бути обладнане тимчасове укриття.",
		areaCompletedWorks: 257,
		projectDuration: '10.07.2022 - 28.08.2022',
		projectText: 'Кошти для цього проєкту були передані від Української Спілки Нижньої Саксонії',
		pictures: [
			{
				id: image2.src,
				image: image2.src,
			},
			{
				id: image2_1.src,
				image: image2_1.src,
			},
			{
				id: image2_2.src,
				image: image2_2.src,
			},
			{
				id: image2_3.src,
				image: image2_3.src,
			},
		],
		mainPicture: { image: image3.src },
	},
	{
		id: image3.src,
		projectStatus: 'active',
		videoLink: 'https://www.youtube.com/embed/ui9iNMKLDpY?si=B2qbx1PSykS-apq9',
		subTitle: 'Ремонт даху Високопільського центру первинної медико-санітарної допомоги',
		text: 'З початком повномасштабного вторгнення Херсонська область перебувала під постійними обстрілами та ракетними ударами. Саме смт. Високопілля було повністю окуповане з початку квітня. За цей час сама лікарня була вщент зруйнована. А влада надала нове напів зруйноване приміщення, яке потребувало ремонту. Тому директор центру звернулась до нас з проханням допомогти відремонтувати тимчасову будівлю первинної амбулаторії, щоб люди вже могли отримувати послуги медичних лікарів.',
		areaCompletedWorks: 100,
		projectDuration: '01.03.2023 - 01.04.2023',
		projectText:
			'Завдяки фінансовій підтримці Угорської Екуменічної служби було відремонтовано дах центру, закуплено медичні ліжка та постільну білизну для денного стаціонару.',
		pictures: [
			{
				id: image3_1.src,
				image: image3_1.src,
			},
			{
				id: image3_2.src,
				image: image3_2.src,
			},
			{
				id: image3_3.src,
				image: image3_3.src,
			},
		],
		mainPicture: { image: image3.src },
	},
	{
		id: image4.src,
		projectStatus: 'done',
		videoLink: ' ',
		subTitle: 'Ремонт тимчасового укриття у Криворізькому обласному ліцеї для сільської молоді',
		text: "На початку липня 2022 року до нас звернувся директор Криворізького обласного ліцею-інтернату для сільської молоді - Козаченко Ігор Олександрович, з проханням відремонтувати підвальне приміщення ліцею, аби діти змогли почати навчальний рік саме в ліцеї. Адже за наказом Міністерства освіти, у школі обов'язково має бути обладнане тимчасове укриття.",
		areaCompletedWorks: 257,
		projectDuration: '10.07.2022 - 28.08.2022',
		projectText: 'Кошти для цього проєкту були передані від Української Спілки Нижньої Саксонії',
		pictures: [
			{
				id: image3_1.src,
				image: image3_1.src,
			},
			{
				id: image3_2.src,
				image: image3_2.src,
			},
			{
				id: image3_3.src,
				image: image3_3.src,
			},
			{
				id: image2_3.src,
				image: image2_3.src,
			},
		],
		mainPicture: { image: image3.src },
	},
];

export const labelData = [
	{ name: 'ready', className: 'wait', text: 'очікує на фінансування' },
	{ name: 'active', className: 'inprogress', text: 'в процесі' },
	{ name: 'done', className: 'finished', text: 'завершено' },
];

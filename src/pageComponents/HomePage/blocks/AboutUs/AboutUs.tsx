import Image from 'next/image';

import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';

import { ABOUT_US_CONTENT } from './AboutUsContent';

import aboutPhoto from '~assets/images/aboutUs/photo-1.jpg';
import ourTeamPhoto from '~assets/images/aboutUs/photo-2.jpg';
import historyPhoto from '~assets/images/aboutUs/photo-3.jpg';

import s from './AboutUs.module.scss';

export function AboutUs() {
	const { about, command, history } = ABOUT_US_CONTENT;
	return (
		<Section className={s.AboutUs}>
			<Container className={s.wrapper}>
				<Text variant="h2" className={s.h2}>
					Про нас
				</Text>
				<div className={s.about}>
					<div className={s.block}>
						<div className={s.text}>
							<div className={s.header}>
								<Text variant="h3">{about.title}</Text>
								<Text variant="p">{about.subtitle}</Text>
							</div>
							<ul className={s.list}>
								{about.list.map((obj) => {
									return (
										<li className={s.item} key={obj.id}>
											<Image src={obj.src} alt={`${obj.id} icon`} width={48} height={48} />
											<Text variant="p">{obj.text}</Text>
										</li>
									);
								})}
							</ul>
						</div>
						<Image
							src={aboutPhoto}
							className={s.image}
							alt="about organization photo"
							height={200}
							style={{ objectFit: 'cover' }}
						/>
					</div>
					<div className={s.block}>
						<div className={s.text}>
							<Text variant="h3">{command.title}</Text>
							<div className={s.employee}>
								{command.staff.map((employee) => {
									return (
										<Text variant="p" key={employee.id}>
											{employee.post}
										</Text>
									);
								})}
							</div>
						</div>
						<Image
							src={historyPhoto}
							className={s.image}
							alt="history of foundation photo"
							height={221}
							style={{ objectFit: 'cover' }}
						/>
					</div>
					<div className={s.block}>
						<div className={s.text}>
							<Text variant="h3">{history.title}</Text>
							<div className={s.history}>
								<Text variant="p">{history.text1}</Text>
								<Text variant="p">{history.text2}</Text>
							</div>
						</div>
						<Image
							src={ourTeamPhoto}
							className={s.image}
							alt="team photo"
							height={253}
							style={{ objectFit: 'cover' }}
						/>
					</div>
				</div>
			</Container>
		</Section>
	);
}

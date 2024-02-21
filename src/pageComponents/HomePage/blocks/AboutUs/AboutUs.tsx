import clsx from 'clsx';
import Image from 'next/image';

import { aboutUsContent } from '~/pageComponents/HomePage/defaultData/aboutUsContent';
import type { AboutUs } from '~api/types/aboutUs/aboutUs';
import { Container } from '~components/Container/Container';
import { Section } from '~components/Section/Section';
import { Text } from '~components/Text/Text';
import { BASE_URL } from '~constants/BASE_URL';

import aboutPhoto from '~assets/images/aboutUs/photo-1.jpg';
import ourTeamPhoto from '~assets/images/aboutUs/photo-2.jpg';
import historyPhoto from '~assets/images/aboutUs/photo-3.jpg';

import s from './AboutUs.module.scss';

interface AboutUsProps {
	fund?: AboutUs;
	team?: AboutUs;
	history?: AboutUs;
}

export function AboutUs({ fund, team, history }: AboutUsProps) {
	const addURL = process.env.NODE_ENV === 'development' ? `${BASE_URL}` : '';

	return (
		<Section className={s.AboutUs} id="about-us">
			<Container className={s.wrapper}>
				<Text variant="h2">Про нас</Text>
				<div className={s.about}>
					<div className={s.block}>
						<div className={s.text}>
							<div className={s.header}>
								<Text variant="h3" className={s.aboutTitle}>
									{aboutUsContent.about.title}
								</Text>
								<Text variant="p">{aboutUsContent.about.subtitle}</Text>
							</div>
							<ul className={s.list}>
								{aboutUsContent.about.list.map((obj) => {
									return (
										<li className={s.item} key={obj.id}>
											<Image
												src={obj.src}
												alt={`${obj.id} icon`}
												className={s.icon}
												width={48}
												height={48}
											/>
											<Text variant="p">{obj.text}</Text>
										</li>
									);
								})}
							</ul>
						</div>
						<Image
							src={`${addURL}${fund?.image}` || aboutPhoto}
							className={s.image}
							alt="about organization photo"
							style={{ objectFit: 'cover' }}
							width={600}
							height={450}
							sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 50vw"
						/>
					</div>
					<div className={s.block}>
						<div className={clsx(s.text, s.order)}>
							<Text variant="h3">{team?.title || aboutUsContent.team.title}</Text>
							<div className={s.employee}>
								{team?.text?.split('\n').map((employee, i) => {
									return (
										<Text variant="p" key={i}>
											{employee}
										</Text>
									);
								}) ||
									aboutUsContent.team.text.split('\n').map((employee, i) => {
										return (
											<Text variant="p" key={i}>
												{employee}
											</Text>
										);
									})}
							</div>
						</div>
						<Image
							src={`${addURL}${team?.image}` || ourTeamPhoto}
							className={s.image}
							alt="team photo"
							style={{ objectFit: 'cover' }}
							width={600}
							height={450}
							sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 50vw"
						/>
					</div>
					<div className={s.block}>
						<div className={s.text}>
							<Text variant="h3">{history?.title || aboutUsContent.history.title}</Text>
							<div className={s.history}>
								{history?.text?.split('\n').map((text, i) => {
									return (
										<Text variant="p" key={i}>
											{text}
										</Text>
									);
								}) ||
									aboutUsContent.history.text.split('\n').map((text, i) => {
										return (
											<Text variant="p" key={i}>
												{text}
											</Text>
										);
									})}
							</div>
						</div>
						<Image
							src={`${addURL}${history?.image}` || historyPhoto}
							className={s.image}
							alt="history of foundation photo"
							style={{ objectFit: 'cover' }}
							width={600}
							height={450}
							sizes="(max-width: 768px) 100vw, (max-width: 1280px) 100vw, 50vw"
						/>
					</div>
				</div>
			</Container>
		</Section>
	);
}

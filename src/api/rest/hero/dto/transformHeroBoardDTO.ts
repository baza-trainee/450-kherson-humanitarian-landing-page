import type { HeroesResponse } from '~api/types/backend/responses/HeroesResponse';
import type { HeroResponse } from '~api/types/backend/responses/HeroResponse';

export function transformHeroBoardDTO(heroBoard: HeroResponse) {
	return {
		image: heroBoard.view.picture.image,
		imageGradient: heroBoard.view.color,
		title: heroBoard.title.text,
		titleColor: heroBoard.title.color,
		subtitle: heroBoard.subtitle.text,
		subtitleColor: heroBoard.subtitle.color,
	};
}

export function transformHeroesBoardDTO(heroes: HeroesResponse) {
	return heroes.map((hero) => transformHeroBoardDTO(hero));
}

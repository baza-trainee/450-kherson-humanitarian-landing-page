export interface HeroResponse {
	id: string;
	view: {
		picture: {
			image: string;
		};
		color: string;
	};
	title: {
		text: string;
		color: string;
	};
	subtitle: {
		text: string;
		color: string;
	};
}

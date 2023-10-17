export interface HeroRequest {
	id?: string;
	view: {
		picture?: {
			mime_type: string;
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

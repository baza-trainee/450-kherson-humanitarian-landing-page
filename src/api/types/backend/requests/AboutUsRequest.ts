export interface AboutUsRequest {
	picture: {
		mime_type: string;
		image: string;
	};
	title: string;
	text: string;
}

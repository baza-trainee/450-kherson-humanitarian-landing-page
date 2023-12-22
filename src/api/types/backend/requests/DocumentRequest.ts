export interface DocumentRequest {
	type: string;
	file: {
		mime: string;
		data: string;
	};
}

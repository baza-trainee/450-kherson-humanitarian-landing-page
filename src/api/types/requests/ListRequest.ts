export interface ListRequest {
	type: 'temp_moved' | 'invalid' | 'child';
	maxQuantity: number;
	issueDate: string;
	issueTime: string;
}

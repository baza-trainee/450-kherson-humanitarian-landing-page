export interface ReturnError {
	status: number;
	message: string;
}

// wrapperCount - a parameter that sets the number of wrappers around the function to shift the error array
export function returnError(
	error: unknown,
	status?: number,
	appName?: string,
	wrapperCount = 0,
	deep = Infinity,
): ReturnError {
	const errorCount = 2 + wrapperCount;

	status = status || -1;

	let message = 'Sorry, something went wrong ¯\\_(ツ)_/¯!';
	if (error) {
		if (typeof error === 'string') message = error;
		if (error instanceof Error) {
			console.log('error instanceof Error: ', error instanceof Error);
			message = error.message;
		}
	}
	if (appName) {
		console.error(
			`${appName} >`,
			`${status} | ${message}\n`,
			new Error().stack?.split('\n').splice(errorCount, deep).join('\n'),
		);
	} else {
		console.error(
			`${status} | ${message}\n`,
			new Error().stack?.split('\n').splice(errorCount, deep).join('\n'),
		);
	}
	return { status, message };
}

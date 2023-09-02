// wrapperCount - a parameter that sets the number of wrappers around the function to shift the error array
export function returnError(error: unknown, appName?: string, wrapperCount = 0, deep = Infinity): string {
	const errorCount = 2 + wrapperCount;

	let message = 'Sorry, something went wrong ¯\\_(ツ)_/¯!';
	if (error) {
		if (typeof error === 'string') message = error;
		if (error instanceof Error) message = error.message;
	}
	if (appName) {
		console.error(`${appName} >`, `${message}\n`, new Error().stack?.split('\n').splice(errorCount, deep).join('\n'));
	} else {
		console.error(`${message}\n`, new Error().stack?.split('\n').splice(errorCount, deep).join('\n'));
	}
	return message;
}



export async function serverRequest(url) {
	console.log('1 - Fetching')
	let fetchPromise = await fetch(url)
		.then(response => {
				console.log('XHR Response', response);
				return response;
		})
		console.log('2 - Fetched')
	return fetchPromise;
}

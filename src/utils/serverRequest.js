

export async function serverRequest(requestObj = '', url = 'http://' + window.location.hostname + ':8987/api/') {
	console.log('1 - Fetching')
	let fetchPromise = await fetch(url + requestObj)
		.then(response => {
				console.log('XHR Response', response);
				return response;
		})
		console.log('2 - Fetched')
	return fetchPromise;
}

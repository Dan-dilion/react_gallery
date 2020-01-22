

export async function serverRequest(
	requestObj = '',
	options = {method: 'GET'},
	url = 'http://' + window.location.hostname + ':8987/api/'
) {
	console.log('1 - Fetching')
	let fetchPromise = await fetch(url + requestObj, options)
		.then(response => {
				console.log('XHR Response', response);
				return response;
		})
		console.log('2 - Fetched')
	return fetchPromise;
}

export const getJpegs = (store) => {
	serverRequest('getjpegs')	// Make server request
		.then( response => {									// Error Handeling (if there is an error it will be text)
			if (response.ok) return response.json()				// If no error: converts the data streem into json object
			else return response.text()							// If Error: converts data stream in to text object
		})
		.then( responseData => {
			store.dispatch({
				type: "SET_JPEGS",
				payload: responseData
			});
		})
	}

export const zipJpegs = (files = []) => {
	console.log('Server Request Body: ' + files)
	serverRequest('zipjpegs', {
		method: 'POST',
		body: JSON.stringify(files),
		headers: {
			'content-type' : 'application/json'
//			'Accept': 'application/json'				// require response to be JSON
		}
	})
	.then( response => {
		if (response.ok) return response.json()
		else return response.text()
	})

}

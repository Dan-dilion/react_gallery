const apiUrl = 'http://' + window.location.hostname + ':8987/api/'

export const getJpegs = async (store) => {
	await fetch(apiUrl + 'getjpegs')	// Make server request
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
	let url = new URL(apiUrl + 'zipjpegs')
	files.map((file, i) => {url.searchParams.append(i, file)})
	console.log('GET URL: ', url)

	fetch(url, {
		method: 'GET',
		responseType: 'arraybuffer',
	})
		.then( response => {
			response.responseType = 'arraybuffer';
			if (response.ok) return //response.download()
			else return response.text()
		})
		.then( responseObject => {
			console.log(responseObject)
		})

}

const apiUrl = 'http://' + window.location.hostname + ':8987/api/'

export const getJpegs = async (store) => {
	await fetch(apiUrl + 'getjpegs')						// Make server request
	.then( response => {									// Error Handeling (if there is an error it will be text)
		if (response.ok) return response.json()				// If no error: converts the data streem into json object
		else return response.text()							// If Error: converts data stream in to text object
	})
	.then( responseData => {
		responseData.forEach((file, i) => {
			store.dispatch({
				type: "ADD_JPEG",
				payload: {
					file: file,
					id: i
				}
			})
		});
	})
}

export const zipJpegs = (files = []) => {
	let url = new URL(apiUrl + 'zipjpegs')
	url.searchParams.append('basketContents', JSON.stringify(files))
	return url.href;
}

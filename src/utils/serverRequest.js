// This is the route and port that the node server will be listening to for api
// requests.
const apiUrl = 'http://' + window.location.hostname + ':8987/api/'

export const getJpegs = async (store) => {               // Export method, requires a Redux store input.
	await fetch(apiUrl + 'getjpegs')                       // Make server request to get the list of jpegs
	.then( response => {									                 // Error Handeling (if there is an error it will be text)
		if (response.ok) return response.json()				       // If no error: converts the data streem into json object
		else return response.text()							             // If Error: converts data stream in to text object
	})
	.then( responseData => {
		let newJpegs = responseData.map((file, i) => {       // itterate through the list of jpegs
			return({                                           // replace each item with and object
				file: file,                                      // so the new structure looks like this:
				id: i                                            // newJpegs [{file: 'filename.jpg', id: i}]
			})
		})
		store.dispatch({                                     // call the Redux Action: ADD_JPEGS
			type: "ADD_JPEGS",                                 // and feed in newJpegs so be added to
			payload: newJpegs                                  // the global state.
		})
	})
}

export const zipJpegs = (files) => {                                    // Export method, Requires an array of files
	let url = new URL(apiUrl + 'zipjpegs')                                // Create URL object with the given URL strings.
	url.searchParams.append('basketContents', JSON.stringify(files))      // add the array of files to the querry
	return url.href;                                                      // parameters of the URL.
}                                                                       // Return the entirety of newly constructed URL.

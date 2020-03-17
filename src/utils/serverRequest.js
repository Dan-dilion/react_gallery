import { resequenceJpegs } from './utils.js'


// This is the route and port that the node server will be listening to for api
// requests.
const apiUrl = 'http://' + window.location.hostname + ':8987/api/'

export const getJpegs = async () => {                 // Export method, requires a Redux store input.
	return await fetch(apiUrl + 'getjpegs')             // Make server request to get the list of jpegs
	.then( response => {									              // Error Handeling (if there is an error it will be text)
		if (response.ok) return response.json()				    // If no error: converts the data streem into json object
		else return response.text()							          // If Error: converts data stream in to text object
	})
	.then( async responseData => {
		let newJpegs = await responseData.map((file, i) => {    // itterate through the list of jpegs
      const img = new Image()
      img.src = "./images/resize300/" + file
			return({                                              // replace each item with and object
				file: file,                                         // so the new structure looks like this:
				id: i,                                              // newJpegs [{file: 'filename.jpg', id: i}]
        res: {
          height: img.height,
          width: img.width
        }
			})
		})
    //return await resequenceJpegs(newJpegs);           // Resequence and return results!
    return newJpegs;
	})
  //.then( newJpegs => {return resequenceJpegs(newJpegs)} )
}

export const zipJpegs = (files) => {                                    // Export method, Requires an array of files
	let url = new URL(apiUrl + 'zipjpegs')                                // Create URL object with the given URL strings.
	url.searchParams.append('basketContents', JSON.stringify(files))      // add the array of files to the querry
	return url.href;                                                      // parameters of the URL.
}                                                                       // Return the entirety of newly constructed URL.

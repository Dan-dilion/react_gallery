//import { resequenceJpegs } from './utils.js'
import store from '../store.js';
import { toggleIsFetching } from '../actions/fileActions.js';

// This is the route and port that the node server will be listening to for api
// requests.
const apiUrl = 'http://' + window.location.hostname + ':8987/api/'

export const getJpegs = async () => {                       // Export method.
	return await fetch(apiUrl + 'getjpegs')                   // Make server request to get the list of jpegs
	.then( async response => {									              // Error Handeling (if there is an error it will be text)
		if (response.ok) return await response.json()				    // If no error: converts the data streem into json object
		else return await response.text()							          // If Error: converts data stream in to text object
	})

  .then( async responseData => {                                  // Pass in the response from previous .then statement.
    let newJpegs = [];                                            // Declare an empty array.
    await Promise.all(responseData.map( (file, i) => {            // Process every itteration of the response data concurrently.
      return new Promise((resolve, reject) => {                   // Each itteration returns a promise.
        const img = new Image()                                   // create new image object.
        img.addEventListener('load', () => {                      // When the image has loaded,
            resolve({                                             // resolve the promise with the following object.
              file: file,                                         // Filename.
              id: i,                                              // Id (used by React-Spring).
              toBeRemoved: false,                                 // Used by the basket to indicate when to fade-out a thumbnail.
              res: { width: img.width, height: img.height }       // Dimentions used by pattern sequencer.
          })                                                      //
        })                                                        //
        img.src = "./images/resize300/" + file                    // Initialises loading the image.
      }).then( response => newJpegs.push(response) )              // Add the new jpeg object to newJpegs.
    }))                                                           //
    console.log(newJpegs)                                         //
    return newJpegs;                                              // Return array.
  })
  .catch( err => console.log('ERROR!!!', err) )                   // Catch errors, output console log.
}

export const zipJpegs = (files) => {                                    // Export method, Requires an array of files
	let url = new URL(apiUrl + 'zipjpegs')                                // Create URL object with the given URL strings.
	url.searchParams.append('basketContents', JSON.stringify(files))      // add the array of files to the querry
	return url.href;                                                      // parameters of the URL.
}                                                                       // Return the entirety of newly constructed URL.

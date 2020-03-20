//import { resequenceJpegs } from './utils.js'


// This is the route and port that the node server will be listening to for api
// requests.
const apiUrl = 'http://' + window.location.hostname + ':8987/api/'

export const getJpegs = async () => {                 // Export method, requires a Redux store input.
	return await fetch(apiUrl + 'getjpegs')             // Make server request to get the list of jpegs
	.then( async response => {									              // Error Handeling (if there is an error it will be text)
		if (response.ok) return await response.json()				    // If no error: converts the data streem into json object
		else return await response.text()							          // If Error: converts data stream in to text object
	})


/*
**  This next .then() statement has the problem that it doesnt wait for Image() to load
**  and by the time the rest of the program is using the jpegs Array the width and height
**  data is not available. The effect is that the resequencing method does not work until
**  you refresh the page after the prliminary first load of the gallery.
**
**  the following two (commented) .then() statements are my attempts to get the browser
**  to wait until the dimentions have been retrieved from the Image() object.
**  Unfortunately neither of them work!
*/

  .then( responseData => {
    const newJpegs = responseData.map((file, i) => {
      const img = new Image();
      img.src = "./images/resize300/" + file

      return {                                              // replace each item with and object
      	file: file,                                         // so the new structure looks like this:
      	id: i,                                              // newJpegs [{file: 'filename.jpg', id: i}]
        res: {width: img.width, height: img.height}         //actualDimentions()
      }
    })
    console.log(newJpegs)
    return newJpegs;
	})


/*
**  This next .then() statement almost works!!! But it doesn't!
**  I think what is happening is it's updating the memory after
**  it runs the rest of the program! The console.log at the end
**  looks like it dumps a nice array with all the correct data in.
**  It even shows up in Redux logger's output for the action
**  except it never updates the new state with the jpegs array.
**  Also if you console.log(JSON.stringify(newJpegs)) you just
**  get a blank array ("[]") sugesting that it's not waiting.
*/

//   .then( async responseData => {
//     let newJpegs = [];
//     await Promise.all(responseData.map( async (file, i) => {
//       const img = await new Image()
//       await img.addEventListener('load', () => {
//           newJpegs.push({
//             file: file,
//             id: i,
//             res: { width: img.width, height: img.height }
//         })
//       })
//       img.src = "./images/resize300/" + file
//     }))
//     console.log(newJpegs)
//     return newJpegs;
//   })


/*
**  This Next attempt has the exact same effect as the one above!!!
*/

	// .then( async responseData => {
	// 	let newJpegs = [];
  //   await responseData.map( async (file, i) => {                               // itterate through the list of jpegs
  //
  //     const getDimentions = async () => {
  //       return await new Promise((resolve, reject) => {
  //         try{
  //           const img = new Image();
  //           img.addEventListener('load', () => {
  //             console.log('w: ' + img.width + 'h: ' + img.height)
  //             resolve( {
  //                 file: file,
  //                 id: i,
  //                 res: { width: img.width, height: img.height }
  //               })
  //             //img.onerror = reject('ERROR!!!')
  //           })
  //           img.src = "./images/resize300/" + file
  //         } catch (err) {
  //           reject('Error')
  //           console.log('error');
  //         }
  //       })
  //     }
  //     await getDimentions().then(async output => { await newJpegs.push(output)})
	// 	})
  //   console.log(newJpegs)
  //   return newJpegs;
	// })

  /*
  **  I think I might have found a question on stackOverflow that might resolve
  **  this problem or it might not. Find it here:
  **
  **  https://stackoverflow.com/questions/46399223/async-await-in-image-loading
  **
  **  It's responders are saying that the OP
  **  shouold turn the image.prototype.onload function in to a promise.
  **  It's possible that I have already thried something similar in the last
  **  attempt (above) but it's definitely worth looking in to next.
  */

  .catch(err => console.log('ERROR!!!', err))
}

export const zipJpegs = (files) => {                                    // Export method, Requires an array of files
	let url = new URL(apiUrl + 'zipjpegs')                                // Create URL object with the given URL strings.
	url.searchParams.append('basketContents', JSON.stringify(files))      // add the array of files to the querry
	return url.href;                                                      // parameters of the URL.
}                                                                       // Return the entirety of newly constructed URL.

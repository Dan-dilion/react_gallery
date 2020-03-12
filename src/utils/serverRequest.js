// This is the route and port that the node server will be listening to for api
// requests.
const apiUrl = 'http://' + window.location.hostname + ':8987/api/'

export const getJpegs = async () => {                 // Export method, requires a Redux store input.
	return await fetch(apiUrl + 'getjpegs')             // Make server request to get the list of jpegs
	.then( response => {									              // Error Handeling (if there is an error it will be text)
		if (response.ok) return response.json()				    // If no error: converts the data streem into json object
		else return response.text()							          // If Error: converts data stream in to text object
	})
	.then( responseData => {
		let newJpegs = responseData.map((file, i) => {    // itterate through the list of jpegs
			return({                                        // replace each item with and object
				file: file,                                   // so the new structure looks like this:
				id: i                                         // newJpegs [{file: 'filename.jpg', id: i}]
			})
		})
  return resequenceJpegs(newJpegs);                   // Resequence and return results!
	})
}

export const zipJpegs = (files) => {                                    // Export method, Requires an array of files
	let url = new URL(apiUrl + 'zipjpegs')                                // Create URL object with the given URL strings.
	url.searchParams.append('basketContents', JSON.stringify(files))      // add the array of files to the querry
	return url.href;                                                      // parameters of the URL.
}                                                                       // Return the entirety of newly constructed URL.











const resequenceJpegs = (jpegs) => {

  let debug = 1;                    // Turn on/off debug info in the console.
  let newSequence = [];
  let columns = 0;
  let rows = 1;

  const logit = (...message) => {
    if (debug) {
      let output = '';
      message.forEach(item => output += item);
      console.log(output)
    }
  }

  const getPortrait = (pegs) => {                                 // Function to make array of all portrait images
    let portraits = [];                                           // declare empty array
    jpegs.forEach(item => {                                       // iterate through jpegs
      const img = new Image()                                     // create instance of the Image object
      img.src = "./images/resize300/" + item.file;                // use this iterations filename as the source
      if (img.width < img.height) portraits.push(item);           // if the width is smaller than the height add it to portraits
    })
    return portraits;                                             // return the array of portraits
  }

  const getLandscape = (pegs) => {                                // Function to make array of all landscape images
    let landscapes = [];                                          // declare empty array
    jpegs.forEach(item => {                                       // iterate through jpegs
      const img = new Image()                                     // create instance of the Image object
      img.src = "./images/resize300/" + item.file;                // use this iterations filename as the source
      if (img.width >= img.height) landscapes.push(item);         // if the width is larger than or the same as the height add it to landscapes
    })
    return landscapes;                                            // return the array of landscapes
  }

  const landscapes = getLandscape(jpegs)
  const portraits = getPortrait(jpegs)

  logit('Number of Portraits = ', portraits.length)
  logit('Number of Landscapes = ', landscapes.length)

  const numOfRows = () => {                                                               // Function to predict the number of rows after image distribution
    let predictedRows = parseInt(((landscapes.length * 2) + portraits.length) / 12)       // landscapes take twice as much space as portraits
    if (((landscapes.length * 2) + portraits.length) % 12 > 0) rows++;                    // if there is a remainder add a final row
    return predictedRows;                                                                 // return prediction
  }

  logit('Predicted Num Of Rows: ', numOfRows())

  const pFrequency = parseInt(landscapes.length / (portraits.length - (numOfRows())))     // the number of landsacpe images inbetween the portraits after you
                                                                                          // deduct the portraits used to ofset the rows
  // const lFrequency = portraits.length / landscapes.length

  logit('pFrequency = ', pFrequency)
  // logit('lFrequency = ', lFrequency)

  while (landscapes.length > 0 || portraits.length > 0) {             // Continue looping while there are portraits and landscapes left to distribute

    for (let j = parseInt(pFrequency); j > 0; j-- ) {
      logit('J Distribution: ', j)

      if (portraits.length > 0 && rows % 2 == 0 && columns == 0) {    // If there's still portraits left, the row is odd and first in row
        newSequence.push(portraits.shift());                          // push portrait
        columns ++;                                                   // uphold columns counter
        j ++;                                                         // reimberse landscape distribution counter
        logit('Even Row!!!');
        logit('column: ', columns);
        logit('row: ', rows);
      } else if (landscapes.length > 0) {                             // if there's still landscapes left
        if (columns + 2 <= 12) {                                      // if landscape is not too big to fit in row
          newSequence.push(landscapes.shift());                       // push landscape
          columns += 2;                                               // uphold columns counter
          logit('column: ', columns);
          logit('row: ', rows);
        } else {                                                      // landscape must be too big to fit in row
          newSequence.push(portraits.shift());                        // push portrait
          columns ++;                                                 // uphold columns counter
          j ++;                                                       // reimberse landscape distribution counter
          logit('Missfit!!!')
          logit('column: ', columns);
          logit('row: ', rows);
        }

        if (columns === 12) {                                         // if columns is 12
          columns = 0;                                                // reset columns
          rows ++;                                                    // increment rows
          logit('New Row!!!');
        }
      }
    }
                                                                      // after lanscape distribution
    if (portraits.length > 0) {                                       // if there's still portraits left
      newSequence.push(portraits.shift())                             // push portrait
      columns ++;                                                     // uphold columns counter
      logit('column: ', columns);
      logit('row: ', rows);
      if (columns === 12) {                                           // if columns is 12
        columns = 0;                                                  // reset columns
        rows ++;                                                      // increment rows
        logit('New Row!!!');
      }
    }

  }

  console.log('Array resequenced!!! num of items = ', newSequence.length)
  return newSequence;
//  return jpegs;     // Bypass the whole alogrythm
}


// const resequenceJpegs = (jpegs) => {
//
//   let debug = 0;                    // Turn on/off debug info in the console.
//
// //  let newSequence = jpegs;        // Bypass the whole alogrythm
//   let newSequence = [];
//   let jpegsQueue = [];
//   let columns = 0;
//   let rows = 1;
//   let misFits = 0;
//
//   const logit = (...message) => {
//     if (debug) {
//       let output = '';
//       message.forEach(item => output += item);
//       console.log(output)
//     }
//   }
//
//   jpegs.forEach( (item, i) => {
//
//     const img = new Image()
//     img.src = "./images/resize300/" + item.file;
//
//     logit('image: ' + item.file + ' w: ' + img.width + ' h: ' + img.height)
//
//     if (columns === 0 && jpegsQueue.length > 0) {           // if at beginning of row and there are items in the queue
//       logit('DUMPING QUEUE!!! ', jpegsQueue.length)
//       misFits ++;
//       jpegsQueue.forEach( (queueItem) => {                  // dump the queue in to the newSequence
//         columns += 2;                                       // uphold the comumns counter
//         newSequence.push(queueItem)
//         logit('Adding to newSequence: ', queueItem.file)
//         if (columns === 12) {
//           rows ++;
//           columns = 0;                                      // reset on each full row
//           logit('NEW ROW!!!')
//         }
//       })
//       jpegsQueue = [];
//     }
//
//     if (img.width < img.height) {                           // if image is portrait
//       logit('PORTRAIT!!!')
//       columns += 1;                                         // uphold the columns counter
//       newSequence.push(item)                                // push in to newSequence
//       logit('Adding to newSequence: ', item.file)
//       if (columns === 12) {
//         rows ++;
//         columns = 0;                                        // reset counter on full row
//         logit('NEW ROW!!!')
//       }
//     } else {                                                // image must be landscape
//       logit('LANDSCAPE!!!')
//       columns += 2;                                         // uphold the columns counter
//       if (columns === 12) {                                 // if the row is full
//         newSequence.push(item)                              // push in to newSequence
//         logit('Adding to newSequence: ', item.file)
//         rows ++;
//         columns = 0;                                        // reset the counter
//         logit('NEW ROW!!!')
//       }
//       else if (columns > 12) {                              // if this image doesn't fit in row
//         logit('MISSFIT!!!')
//         jpegsQueue.push(item);                              // push on to jpegsQueue
//         logit('Adding to queue: ', item.file)
//         columns -= 2;                                       // revert columns counter
//       } else {                                              // must be in the middle of the row
//         newSequence.push(item)                              // push on to newSequence
//         logit('Adding to newSequence: ', item.file)
//       }
//     }
//
//     if (                                                    // if there are no more portraits
//       i === jpegs.length -1                                 // at the final item in array
//       && jpegsQueue.length > 0                              // push the jpegsQueue on to newSequence
//     ) {
//       logit('NO MORE PORTRAITS!!! Dumping Queue!')
//       jpegsQueue.forEach( (item) => {                       // dump the queue in to the newSequence
//         columns += 2;                                       // uphold the columns counter
//         logit('Adding to newSequence: ', item.file)
//         newSequence.push( item)
//         if (columns === 12) {
//           rows ++;
//           columns = 0;                                      // reset on each full row
//           logit('NEW ROW!!!')
//         }
//       })
//     }
//
//   })
//
//   console.log('Array resequenced!!! num of items = ', newSequence.length)
//   logit('Nomber of Rows: ', rows)
//   logit('Nomber of misFits: ', misFits)
//   return newSequence;
// }

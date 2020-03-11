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

  let debug = 0;                    // Turn on/off debug info in the console.

//  let newSequence = jpegs;
  let newSequence = [];
  let jpegsQueue = [];
  let columns = 0;
  let rows = 1;
  let misFits = 0;

  const logit = (message) => { if (debug) console.log(message)}

  // const getPortrait = () => {
  //   const portrait = jpegs.find( (item) => {
  //     const img = new Image()
  //     img.src = "./images/resize300/" + item.file;
  //     if (img.width < img.height) return item;
  //   })
  //   return jpegs.splice( jpegs.findIndex(portrait()), 1 )      // splice at start index, delete count, return deleted
  // }
  //
  // const getLandscape = () => {
  //   const landscape = jpegs.find( (item) => {
  //     const img = new Image()
  //     img.src = "./images/resize300/" + item.file;
  //     if (img.width > img.height) return item;
  //   })
  //   return jpegs.splice( jpegs.findIndex(landscape()), 1 )      // splice at start index, delete count, return deleted
  // }
  //
  // logit(getLandscape())


  jpegs.forEach( (item, i) => {

    const img = new Image()
    img.src = "./images/resize300/" + item.file;

    if (columns === 0 && jpegsQueue.length > 0) {           // if at beginning of row and there are items in the queue
      logit('DUMPING QUEUE!!! ', jpegsQueue.length)
      misFits ++;
      jpegsQueue.forEach( (queueItem) => {                  // dump the queue in to the newSequence
        columns += 2;                                       // uphold the comumns counter
        newSequence.push(queueItem)
        logit('Adding to newSequence: ', queueItem.file)
        if (columns === 12) {
          rows ++;
          columns = 0;                                      // reset on each full row
          logit('NEW ROW!!!')
        }
      })
      jpegsQueue = [];
    }

    if (img.width < img.height) {                           // if image is portrait
      logit('PORTRAIT!!!')
      columns += 1;                                         // uphold the columns counter
      newSequence.push(item)                                // push in to newSequence
      logit('Adding to newSequence: ', item.file)
      if (columns === 12) {
        rows ++;
        columns = 0;                                        // reset counter on full row
        logit('NEW ROW!!!')
      }
    } else {                                                // image must be landscape
      logit('LANDSCAPE!!!')
      columns += 2;                                         // uphold the columns counter
      if (columns === 12) {                                 // if the row is full
        newSequence.push(item)                              // push in to newSequence
        logit('Adding to newSequence: ', item.file)
        rows ++;
        columns = 0;                                        // reset the counter
        logit('NEW ROW!!!')
      }
      else if (columns > 12) {                              // if this image doesn't fit in row
        logit('MISSFIT!!!')
        jpegsQueue.push(item);                              // push on to jpegsQueue
        logit('Adding to queue: ', item.file)
        columns -= 2;                                       // revert columns counter
      } else {                                              // must be in the middle of the row
        newSequence.push(item)                              // push on to newSequence
        logit('Adding to newSequence: ', item.file)
      }
    }

    if (                                                    // if there are no more portraits
      i === jpegs.length -1                                 // at the final item in array
      && jpegsQueue.length > 0                              // push the jpegsQueue on to newSequence
    ) {
      logit('NO MORE PORTRAITS!!! Dumping Queue!')
      jpegsQueue.forEach( (item) => {                       // dump the queue in to the newSequence
        columns += 2;                                       // uphold the columns counter
        logit('Adding to newSequence: ', item.file)
        newSequence.push( item)
        if (columns === 12) {
          rows ++;
          columns = 0;                                      // reset on each full row
          logit('NEW ROW!!!')
        }
      })
    }

  })

  console.log('Array resequenced!!! num of items = ', newSequence.length)
  logit('Nomber of Rows: ', rows)
  logit('Nomber of misFits: ', misFits)
  return newSequence;
}

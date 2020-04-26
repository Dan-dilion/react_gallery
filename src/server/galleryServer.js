//Node Router
const express = require('express');
const url = require('url');
const path = require ('path');
const fs = require ('fs');

// Import variables and functions
const {
  imgDir,
  zipFile,
  resizeImages,
  getJpegs,
  zipJpegs
} = require('./fileServices.js');

let app = express();                                              // Instantiate express object


app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");            // Set response headers to allow CORS
  next();                                                         // (Cross Origin Resource Sharing)
});

// Listen for a "GET" request to '/' or '/home' - this will just respond with nothing
app.get('/' || '/home', (request, response) => {                  // Will respond to "GET" request at the specified URIs
  response.set({'Content-Type' : 'text/html'});                   // Set response type
  console.log('ROUTING FAILURE: No params in URL.');              // Log message to console
  response.sendStatus(204);		                                    // Status 204 (successful but no content) type html
})

// Listen for "GET" request to '/api/getjpegs' - return list of files in the images folder
app.get('/api/getjpegs', (request, response) => {                 // Will respond to "GET" request at specified URI
  console.log('SERVER: fetching jpegs for: ', request.ip);
  async function waitJpegs(dir) {								                  // waitJpegs() async function wait for output
    try {
      let jpegs = await getJpegs(dir)                             // Wait for array of jpegs to be returned
      await resizeImages(jpegs)                                   // Wait for images to be resized
      response.set({                                              // Send the server response
        'Content-Type' : 'application/json',			                // Declare content type JSON
      });
      data = JSON.stringify(jpegs);						                    // Stringify jpegs array
      console.log('SERVER: returning ' + jpegs.length + ' jpegs');
      response.send(data);									                      // Send stringified jpegs array in server response
    } catch(err) {                                                // If there was an error
      returnError(err);									                          // Send the error in the response
    }
  }
  waitJpegs(imgDir)
})

// Listen for "GET" request to /api/zipjpegs - initate the zipJpegs function and return zipfile in readstream
app.get('/api/zipjpegs', (request, response) => {                 // Will respond to "GET" request at specified URI
  response.attachment('downloaded-images.zip');                   // Set response type

  let urlPerameters = JSON.parse(request.query.basketContents)    // Strip the basketContents array from the URI
  if (urlPerameters.length) {                                     // If there are any items in the array
    let zip = zipJpegs(urlPerameters, response)                   // Pass items to zipJpegs() and 'zip' will be the outcome
    zip.pipe(response);                                           // Pipe the response thtrough a readstream back to client
    zip.finalize();                                               // Finalise the zipfile structure
    console.log('Finalising Zipfile Structure for: ', request.ip)
  } else response.sendStatus(204);                                // If no files in URI respond with status 204
})                                                                // (successful but no content)

app.listen(8987);                                                 // Server to listen to specified port
console.log("server initialised - port: 8987\n");

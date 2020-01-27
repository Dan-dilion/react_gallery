//Node Router
const express = require('express');
const url = require('url');
const path = require ('path');
const fs = require ('fs');

const {
	imgDir,
	zipFile,
	resizeImages,
	getJpegs,
	zipJpegs
} = require('./fileServices.js');

let app = express();


app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/' || '/home', (request, response) => {
	response.set({'Content-Type' : 'text/html'});
	console.log('ROUTING FAILURE: No params in URL.');
	response.sendStatus(204);		// status 204 (successful but no content) type html
})

app.get('/api/getjpegs', (request, response) => {
	console.log('SERVER: fetching jpegs');
	async function waitJpegs(dir) {								// getJpegs() async function wait for output
		console.log('0 - fetching Jpegs')
		try {
			let jpegs = await getJpegs(dir)
			console.log('3.1 - Get Jpegs Finnished, starting resize')
			await resizeImages(jpegs)
			console.log('6.1 - Resize finnished')

																// send the server response after the result
			console.log('7 - Sending Response')
			response.set({
				'Content-Type' : 'application/json',			// content type JSON
			});
			data = JSON.stringify(jpegs);						// stringify jpegs array
			console.log(data);									// send jpegs array in server response
			response.send(data);									// send jpegs array in server response
		} catch(err) {
			returnError(err);									// send the error in the response
		}
	}
	waitJpegs(imgDir)
})

app.get('/api/zipjpegs', (request, response) => {
	response.attachment('downloaded-images.zip');

	let urlPerameters = JSON.parse(request.query.basketContents)
	let zip = zipJpegs(urlPerameters, response)

	zip.pipe(response);
	zip.finalize();
	console.log('Finalizing Zipfile Structure: ')
})

app.listen(8987);
console.log("server initialised - port: 8987\n");

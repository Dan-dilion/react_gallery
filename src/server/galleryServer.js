//Node Router
const http = require('http');
const express = require('express');
const url = require('url');

const {
	imgDir,
	resizeSmlDir,
	resizeMedDir,
	resizeImages,
	getJpegs
} = require('./fileServices.js');

let app = express();

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
				'Access-Control-Allow-origin' : '*'				// CORS Permission
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

app.post('/api/zipjpegs', (request, response) => {
	console.log('SERVER: Zip-Jpegs ' + JSON.stringify(request.headers));
	response.set({
		'Content-Type' : 'application/json',			// content type JSON
		'Access-Control-Allow-origin' : '*'				// CORS Permission
	});
	data = JSON.stringify('FileNameHere.zip');
	response.send(data);
})

app.get('/api/removezip', (request, response) => {
	console.log('SERVER: Removing Zip File');
	response.send(JSON.stringify('Removig Zipfile'))
})

app.listen(8987);
console.log("server initialised - port: 8987\n");

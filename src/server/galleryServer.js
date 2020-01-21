//Node Router
const http = require('http');
const url = require('url');

const {
	imgDir,
	resizeSmlDir,
	resizeMedDir,
	resizeImages,
	getJpegs
} = require('./fileServices.js');

const server = http.createServer((request, response) => {			// instantiate server object

	const returnError = (err) => {
		console.log('SERVER RESPONSE: ERROR RECIEVED')		// had returned from the event handeler
		console.log('Passing error to client...')
		response.writeHead(500, {							// status 500 (Internal Server Error)
			'Content-Type' : 'text/html',					//
			'Access-Control-Allow-origin' : '*'				// CORS Permission
		});
		data = JSON.stringify(err.message);					// stringify error message
		response.end(data);									// send message in server response
	}



	if (request.url === '/' || request.url === '/home') {           // if url is / or /home
		response.writeHead(204, {'Content-Type' : 'text/html'});	// status 204 (successful but no content) type html
		console.log('ROUTING FAILURE: No params in URL.');			//
	} else if (request.url == '/api/getjpegs'){						//
		console.log('SERVER: fetching jpegs');						//

		async function waitJpegs(dir) {									// getJpegs() async function wait for output
			console.log('0 - fetching Jpegs')
			try {
				let jpegs = await getJpegs(dir)
				console.log('3.1 - Get Jpegs Finnished, starting resize')
				await resizeImages(jpegs)
				console.log('6.1 - Resize finnished')

																	// send the server response after the result
				console.log('7 - Sending Response')
				response.writeHead(200, {							// status 200 (Ok! successfull HTTP Request)
					'Content-Type' : 'application/json',			// content type JSON
					'Access-Control-Allow-origin' : '*'				// CORS Permission
				});
				data = JSON.stringify(jpegs);						// stringify jpegs array
				console.log(data);									// send jpegs array in server response
				response.end(data);									// send jpegs array in server response


			} catch(err) {
																		// if there was a reject promise returned
				returnError(err);									// send the error in the response

			}
		}
		waitJpegs(imgDir)
	} else if (request.url == '/api/zipjpegs') {
		console.log('SERVER: Receiving Jpegs');						//

	}
});

server.listen(8987);
console.log("server initialised - port: 8987\n");

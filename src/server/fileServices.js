const fs = require('fs');
const path = require('path');
const sharp = require('sharp');


const imgDir = path.join(			// joins two paths together (adds "/" between).
	path.dirname(__filename), 		// separates the path from the file name.
	'../images'						// will be joined on to this path.
)

const resizeMedDir = path.join(imgDir, 'resize1024');
const resizeSmlDir = path.join(imgDir, 'resize300');


const readdir = (dir) => {								// I have wrapped the readdir method in a promise
	console.log('2 readDir Here')
	return new Promise((resolve, reject) => {			// so that I can use the .await and the .then methods later
		fs.readdir(dir, (error, files) => {				//
			error ? reject(error) : resolve(files);		// ternary opperator, reject promise with error
		});												// If rejected bypass .then collect with .catch
	});													// or resolve promise with list of files
}														// pass result on to .then

async function forEachAsync(array, callback) {		// Asyncronous version of array.forEach
  for (let i = 0; i < array.length; i++) {			// each itteration will be passed over to
    await callback(array[i]);						// the event handelers, feeing up the call stack
  }
}

async function getJpegs(dir) {						// This is an async function which allows us
	console.log('1 - getJpegs here')
	let jpegs;										// to use the await command. the .then will
	await readdir(dir)								// only be executed after readdir has finished
	.then(output => {
			jpegs = output.filter((output) => {				// iterate through the array
				return (path.extname(output) 				// keep only the entries with
				== '.jpg' || path.extname(output) 			// .jpg or JPEG extention names
				== '.JPEG');								// the filter is not case sensitive
			})												// to make case sensitive use ===
	})
	.catch(error => {										// Catch the reject promise object from readdir
		console.log('getJpegs ERROR: ', error.message)		// Log error
		throw new Error(error.message)						// throw error (this will be collected by .catch
	})														// in the calling function)
	console.log('3 - Jpegs Retreived')
	return jpegs;
}

async function resizeImages(jpegs) {
	console.log('4 - resize Images here')
	if (!fs.existsSync(resizeSmlDir)) {							//
    	fs.mkdirSync(resizeSmlDir);								//
		console.log('Creating Directory... ', resizeSmlDir);	//
	}
	if (!fs.existsSync(resizeMedDir)) {							//
    	fs.mkdirSync(resizeMedDir);								//
		console.log('Creating Directory... ', resizeMedDir);	//
	}

	console.log('B4')
	await Promise.all([
		processImages(jpegs, 'm'),
		processImages(jpegs, 's')
	])
	.catch((err) => { throw new Error(err); })
	console.log('AFTER')
}


async function processImages(jpegs, size) {
	console.log('5 - Processing images')

	let resolution;
	let saveDir;

	switch (size) {
		case 'm':
			resolution = 1024;
			saveDir = resizeMedDir;
			break;
		case 's':
			resolution = 300;
			saveDir = resizeSmlDir;
			break;
		default:
			resolution = 300;
			saveDir = resizeSmlDir;
	}

	sharp.cache({
		memory: 50,
		files: 1,
		items: 1
	})
	try {
		await forEachAsync(jpegs, async (file) => {
			let resizeFileName = path.join(saveDir, file);
			let width = null;
			let height = null;

			if (!fs.existsSync(resizeFileName)) {
				console.log('Resizing: ', resizeFileName);
				const image = sharp(path.join(imgDir, file));
				await image
					.metadata()
					.then(metadata => {
						if (metadata.width > metadata.height) {	height = resolution; }
						else { width = resolution; }
						console.log('ACTUALLY RESIZING', resizeFileName)
						return image
							.jpeg({
								quality: 80
							})
							.resize(width, height, {
								fit: 'inside',
								withoutEnlargement: true,
							})
							.toFile(resizeFileName)
					})
					.catch(error => {										// Catch the reject promise object from sharp
						console.log('Resizeing ERROR: ', error.message)		// Log error
						throw new Error(error.message)						// throw error
					})
			}
		})
	} catch(err) { throw new Error(err) }
	console.log('6 - Images Processed!')
}


module.exports = {
	imgDir: imgDir,
	resizeMedDir: resizeMedDir,
	resizeSmlDir: resizeSmlDir,
	resizeImages: resizeImages,
	getJpegs: getJpegs
}

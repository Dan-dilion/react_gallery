const fs = require('fs');
const path = require('path');
const sharp = require('sharp');                            // Image Processing API
const archiver = require('archiver');                      // Zip file API


const imgDir = path.join(                                  // joins two paths together (adds "/" between).
  path.dirname(__filename),                                // separates the path from the file name.
  '../images'                                              // will be joined on to this path.
)

const resizeMedDir = path.join(imgDir, 'resize1024');
const resizeSmlDir = path.join(imgDir, 'resize300');
const zipFile = (path.join('./src/images', 'downloaded-images.zip'))


const readdir = (dir) => {                                 // I have wrapped the readdir method in a promise
  return new Promise((resolve, reject) => {                // I can use the await and the .then methods later
    fs.readdir(dir, (error, files) => {
      error ? reject(error) : resolve(files);              // ternary opperator, reject promise with error
    });                                                    // If rejected bypass .then collect with .catch
  });                                                      // or resolve promise with list of files
}                                                          // pass result on to .then

async function forEachAsync(array, callback) {             // Asyncronous version of array.forEach
  for (let i = 0; i < array.length; i++) {                 // each itteration will be passed over to
    await callback(array[i]);                              // the event handelers, freeing up the call stack
  }
}

async function getJpegs(dir) {                             // Async function allows us to use await and .then
  let jpegs;                                               // ensuring the code is executed sequentially
  await readdir(dir)                                       // Read the directory contents
  .then(output => {                                        // Iterate through the directory contents
    jpegs = output.filter((output) => {                    // and filter out all jpegs
      return (
        path.extname(output)                               // keep only the entries with
        == '.jpg' || path.extname(output)                  // .jpg or .JPEG extention names
        == '.JPEG'                                         // the filter is not case sensitive
      );
    })
  })
  .catch(error => {                                        // Catch the reject promise object from readdir
    console.log('getJpegs ERROR: ', error.message)         // Log error to console
    throw new Error(error.message)                         // throw error (this will be collected by .catch
  })                                                       // in the calling function)
  return jpegs;                                            // Return the list of jpeg files
}

async function resizeImages(jpegs) {                        
  if (!fs.existsSync(resizeSmlDir)) {                      // If directory does not exist
    fs.mkdirSync(resizeSmlDir);                            // create directory
    console.log('Creating Directory... ', resizeSmlDir);
  }
  if (!fs.existsSync(resizeMedDir)) {                      // If directory does not exist
    fs.mkdirSync(resizeMedDir);                            // create directory
    console.log('Creating Directory... ', resizeMedDir);
  }

  await Promise.all([                                      // Asynchronously promisifys an
    processImages(jpegs, 'm'),                             // array of functions and processes
    processImages(jpegs, 's')                              // all entries simaltaniously
  ])                                                       //
  .catch((err) => { throw new Error(err); })               // Catches and throws any errors
}


async function processImages(jpegs, size) {                // receives an array of images and a size ('m' or 's')

  let resolution;
  let saveDir;

  switch (size) {
    case 'm':
      resolution = 1024;                                   // Set the resolution
      saveDir = resizeMedDir;                              // and the image directory
      break;

    case 's':
      resolution = 300;                                    // Set the resolution
      saveDir = resizeSmlDir;                              // and the image directory
      break;

    default:
      resolution = 300;
      saveDir = resizeSmlDir;
  }

  sharp.cache({                                            // Ajust Sharps cache settings so that
    memory: 50,                                            // it has a minimal impact on the
    files: 1,                                              // server and uses minimal resources
    items: 1
  })
  try {
    await forEachAsync(jpegs, async (file) => {            // Itterate through each jpeg and
      let resizeFileName = path.join(saveDir, file);       // preform the following function
      let width = null;
      let height = null;

      if (!fs.existsSync(resizeFileName)) {                            // If the file does not already exist
        const image = sharp(path.join(imgDir, file));                  // instantiate the sharp object
        await image.metadata()                                         // Promisify the metadata method
        .then(metadata => {                                            // Pass output through to .then
          if (metadata.width > metadata.height)	height = resolution;   // Respect portrait and landscape, assign the
          else width = resolution;                                     // resize resolution to the smallest dimention
          console.log('Resizing image: ', resizeFileName)
          return image.jpeg({                              // Return jpeg file type method
            quality: 80                                    // Set compression quality
          })
          .resize(width, height, {                         // Run resize method, if only one dimentions is specified
            fit: 'inside',                                 // rezize will respect aspect ratio
            withoutEnlargement: true,                      // if the image is smaller than rezize, do not enlarge
          })
          .toFile(resizeFileName)                          // save new image to file
        })
        .catch(error => {                                  // Catch the reject promise object from sharp
          console.log('Resizeing ERROR: ', error.message)  // Log error to console
          throw new Error(error.message)                   // throw error
        })
      }
    })
  } catch(err) { throw new Error(err) }                    // Catch and throw any errors
}


const zipJpegs = (files, response) => {
  console.log('\nSERVER: Zip-Jpegs ' + files);

  let zip = archiver('zip', {                              // Instantiate archiver object
    comment: 'This zipFile was created by React-Gallery',  // Set zipfile's comment attribute
    zlib: { level: 1 }                                     // Set to quickest and lowest compression
  })                                                       // jpegs are already compressed

  files.map( (file) =>{                                    // Iterate through list of files
    zip.file(path.join(imgDir, file), {                    // pass the file to the zip.file() method
      name: path.join('Downloaded-images/', file)          // Set internal directory structure
    });
  })

  return zip;                                              // Return the archiver object
}


module.exports = {                                         // Set modules to be exported
  imgDir: imgDir,
  zipFile: zipFile,
  resizeImages: resizeImages,
  getJpegs: getJpegs,
  zipJpegs: zipJpegs
}

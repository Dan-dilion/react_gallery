const fs = require('fs');
const path = require('path');
const sharp = require('sharp');                            // Image Processing API
const archiver = require('archiver');                      // Zip file API


const imgDir = path.join(                                  // Joins two paths together (adds "/" between).
  path.dirname(__filename),                                // Separates the path from the file name.
  '../images'                                              // Will be joined on to this path.
)

const resizeMedDir = path.join(imgDir, 'resize1024');
const resizeSmlDir = path.join(imgDir, 'resize300');
const zipFile = (path.join('./src/images', 'downloaded-images.zip'))


const readdir = (dir) => {                                 // I have wrapped the readdir method in a promise
  return new Promise((resolve, reject) => {                // I can use the await and the .then methods later
    fs.readdir(dir, (error, files) => {
      error ? reject(error) : resolve(files);              // Ternary operator, reject promise with error
    });                                                    // If rejected bypass .then collect with .catch
  });                                                      // or resolve promise with list of files
}                                                          // Pass result on to .then

async function forEachAsync(array, callback) {             // Asynchronous version of array.forEach
  for (let i = 0; i < array.length; i++) {                 // Each iteration will be passed over to
    await callback(array[i]);                              // the event handlers, freeing up the call stack
  }
}

async function getJpegs(dir) {                             // Async function allows us to use await and .then
  let jpegs;                                               // ensuring the code is executed sequentially
  await readdir(dir)                                       // Read the directory contents
  .then(output => {                                        // Iterate through the directory contents
    jpegs = output.filter((output) => {                    // and filter out all jpegs
      return (
        path.extname(output)                               // Keep only the entries with
        == '.jpg' || path.extname(output)                  // .jpg or .JPEG extension names
        == '.JPEG'                                         // The filter is not case sensitive
      );
    })
  })
  .catch(error => {                                        // Catch the reject promise object from readdir
    console.log('getJpegs ERROR: ', error.message)         // Log error to console
    throw new Error(error.message)                         // Throw error (this will be collected by .catch
  })                                                       // in the calling function)
  return jpegs;                                            // Return the list of jpeg files
}

async function resizeImages(jpegs) {
  if (!fs.existsSync(resizeSmlDir)) {                      // If directory does not exist
    fs.mkdirSync(resizeSmlDir);                            // Create directory
    console.log('Creating Directory... ', resizeSmlDir);
  }
  if (!fs.existsSync(resizeMedDir)) {                      // If directory does not exist
    fs.mkdirSync(resizeMedDir);                            // Create directory
    console.log('Creating Directory... ', resizeMedDir);
  }

  await Promise.all([                                      // Asynchronously promisifys an
    processImages(jpegs, 'm'),                             // array of functions and processes
    processImages(jpegs, 's')                              // all entries simultaneously
  ])                                                       //
  .catch((err) => { throw new Error(err); })               // Catches and throws any errors
}


async function processImages(jpegs, size) {                // Receives an array of images and a size ('m' or 's')

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

  sharp.cache({                                            // Adjust Sharp's cache settings so that
    memory: 50,                                            // it has a minimal impact on the
    files: 1,                                              // server and uses minimal resources
    items: 1
  })
  try {
    await forEachAsync(jpegs, async (file) => {            // Iterate through each jpeg and
      let resizeFileName = path.join(saveDir, file);       // perform the following function
      let width = null;
      let height = null;

      if (!fs.existsSync(resizeFileName)) {                            // If the file does not already exist
        const image = sharp(path.join(imgDir, file));                  // Instantiate the sharp object
        await image.metadata()                                         // Promisify the metadata method
        .then(metadata => {                                            // Pass output through to .then
          if (metadata.width > metadata.height)	height = resolution;   // Respect portrait and landscape, assign the
          else width = resolution;                                     // resize resolution to the smallest dimension
          console.log('Resizing image: ', resizeFileName)
          return image.jpeg({                              // Return jpeg file type method
            quality: 80                                    // Set compression quality
          })
          .resize(width, height, {                         // Run resize method, if only one dimension is specified
            fit: 'inside',                                 // resize will respect aspect ratio
            withoutEnlargement: true,                      // if the image is smaller than resize, do not enlarge
          })
          .toFile(resizeFileName)                          // Save new image to file
        })
        .catch(error => {                                  // Catch the reject promise object from sharp
          console.log('Resizing ERROR: ', error.message)  // Log error to console
          throw new Error(error.message)                   // Throw error
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
    zip.file(path.join(imgDir, file), {                    // Pass the file to the zip.file() method
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

export const resequenceJpegs = (jpegs) => {

  let debug = 1;                    // Turn on/off debug info in the console.
  let newSequence = [];

  const logit = (...message) => {
    if (debug) {
      let output = '';
      message.forEach(item => output += item);
      console.log(output)
    }
  }

  const getPortraits = (pegs) => {                           // Function to make array of all portrait images
    let ports = [];                                          // declare empty array
    jpegs.forEach(item => {                                  // iterate through jpegs
      const img = new Image()                                // create instance of the Image object
      img.src = "./images/resize300/" + item.file;           // use this iterations filename as the source
      if (img.width < img.height) ports.push(item);          // if the width is smaller than the height add it to portraits
    })
    return ports;                                            // return the array of portraits
  }

  const getLandscapes = (pegs) => {                          // Function to make array of all landscape images
    let lands = [];                                          // declare empty array
    jpegs.forEach(item => {                                  // iterate through jpegs
      const img = new Image()                                // create instance of the Image object
      img.src = "./images/resize300/" + item.file;           // use this iterations filename as the source
      if (img.width >= img.height) lands.push(item);         // if the width is larger than or the same as the height add it to landscapes
    })
    return lands;                                            // return the array of landscapes
  }

  const portraits = getPortraits(jpegs)
  const landscapes = getLandscapes(jpegs)

  logit('Number of Portraits = ', portraits.length)
  logit('Number of Landscapes = ', landscapes.length)

  const getNumOfRows = () => {                                                            // Function to predict the number of rows after image distribution
    let predictedRows = parseInt(((landscapes.length * 2) + portraits.length) / 12)       // landscapes take twice as much space as portraits
    if ((((landscapes.length * 2) + portraits.length) % 12) > 0) predictedRows++;         // if there is a remainder add a final row
    return predictedRows;                                                                 // return prediction
  }
  const predictedNumOfRows = getNumOfRows()
  logit('Predicted Num Of Rows: ', predictedNumOfRows)

  const sequencer = (numOfPortraits = 0, offset = 0) => {                                    // This is the sequencer!
    let pattern = '111111';                                                                  // if no numberOfPortraits is given the default will be none
    switch(numOfPortraits) {                                                                 //
      case  2: if (offset) pattern = '0111110'; else pattern = '1101011'; break;             // alternate patterns for offset and not (even and odd)
      case  4: if (offset) pattern = '01011010'; else pattern = '10100101'; break;           //
      case  6: if (offset) pattern = '010010010'; else pattern = '100010001'; break;         //
      case  8: if (offset) pattern = '0010000100'; else pattern = '1000000001'; break;       //
      case 10: pattern = '00000100000'; break;                                               // only one symmetrical pattern can be made
      case 12: pattern = '000000000000'; break;                                              // only one symmetrical pattern can be made
      default: break;
    }

    logit('Pattern: ', pattern);

    [...pattern].forEach(item => {                                                           // convert the pattern in to an array and begin itterating through it's characters
      if (parseInt(item) && landscapes.length > 0) newSequence.push(landscapes.shift())      // if item is a 1 and there are landscapes left push landscape
      else if (portraits.length > 0) newSequence.push(portraits.shift())                     // otherwise if there are any portraits left push portrait
      else if (landscapes.length > 0) newSequence.push(landscapes.shift())                   // otherwise if there are any landscapes left push lanscape
    });
  }

  let offsetToggle = 0;
  let leftOverRows = 0;
  let oddPorts = 0;
  let evenPorts = 2;
  let portsPerRow = portraits.length / predictedNumOfRows

  if (portsPerRow <= 1) evenPorts = 2;                   // if there's less or the same number of portraits than the number of rows
  else if (portsPerRow <= 2) evenPorts = 2;              // if there's less than or the same number of portraits for two per row
  else if (portsPerRow <= 4) evenPorts = 4;              // if there's less than or the same number of portraits for four per row
  else if (portsPerRow <= 6) evenPorts = 6;              // if there's less than or the same number of portraits for six per row
  else if (portsPerRow <= 8) evenPorts = 8;              // if there's less than or the same number of portraits for eight per row
  else if (portsPerRow <= 10) evenPorts = 10;            // if there's less than or the same number of portraits for ten per row
  else evenPorts = 12;                                                               // if there's less than or the same number of portraits for twelve per row
  logit('Case Selector: ', portsPerRow )

  if (portraits.length > predictedNumOfRows) {                                       // if there is enough portraits to offset every other row
    leftOverRows = Math.ceil(                                                        // rounds a real number up to the nearest integer even if less than 0.5 over
      ((portraits.length - ((predictedNumOfRows / 2) * evenPorts)) / evenPorts)      // number of rows that can be filled with the left over portraits (after offset rows)
    );
  }
  logit('LeftOver: ', leftOverRows)

  for ( let i = predictedNumOfRows; i > 0; i -- ) {                         // Iterate round this loop once for each predicted row
    if (leftOverRows > 0 && !offsetToggle) {                                      // if there is enough portraits for the even rows also distribute in odd rows
      oddPorts = evenPorts;                                                 // distribute the same number of portraits in the odd rows as the even
      leftOverRows --;                                                      // decreace the number of leftOverRows
    }
    else oddPorts = 0;                                                      // if there is only enough portraits left for the even rows do not distribute in odd rows
    if (!offsetToggle) sequencer(oddPorts, offsetToggle)                                // if on odd numbered row call the sequencer and pass in num of odd portraits
    else sequencer(evenPorts, offsetToggle)                                       // else call sequencer and pass in num of even portraits
    offsetToggle = !offsetToggle;                                                       // Toggle offset

    logit('itteration: ', i)
    logit('left over rows: ', leftOverRows)
    logit('OddPorts: ' + oddPorts + ' even Ports: ' + evenPorts)
  }

  console.log('Array resequenced!!! num of items = ', newSequence.length)
  return newSequence;
}

export const resequenceJpegs = (jpegs) => {

  let debug = 0;                    // Turn on/off debug info in the console.
  let newSequence = [];
  let gridWidth = 12;
  if (window.matchMedia("(max-width: 800px)").matches) gridWidth = 6;
  console.log('Grid Width = ', gridWidth)

  const logit = (...message) => {
    if (debug) {
      let output = '';
      message.forEach(item => output += item);
      console.log(output)
    }
  }

  const getPortraits = (pegs) => {                              // Function to make array of all portrait images
    let ports = [];                                             // declare empty array
    jpegs.forEach(item => {                                     // iterate through jpegs
      if (item.res.width < item.res.height) ports.push(item);   // if the width is smaller than the height add it to portraits
    })
    return ports;                                               // return the array of portraits
  }

  const getLandscapes = (pegs) => {                             // Function to make array of all landscape images
    let lands = [];                                             // declare empty array
    jpegs.forEach(item => {                                     // iterate through jpegs
      if (item.res.width >= item.res.height) lands.push(item);  // if the width is larger than or the same as the height add it to landscapes
    })
    return lands;                                               // return the array of landscapes
  }

  const portraits = getPortraits(jpegs)
  const landscapes = getLandscapes(jpegs)

  logit('Number of Portraits = ', portraits.length)
  logit('Number of Landscapes = ', landscapes.length)

  const predictedNumOfRows =  Math.ceil(((landscapes.length * 2) + portraits.length) / gridWidth)       // landscapes take twice as much space as portraits,
  logit('Predicted Num Of Rows: ', predictedNumOfRows)                                                  // round result up if not an integer

/*                     **
**  Pattern sequencer  **
**                     */
  const sequencer = (numOfPortraits = 0, offset = 0) => {                                      // This is the sequencer!
    let pattern = [];
    if (gridWidth == 12) {
      pattern = '111111';                                                                      // if no numberOfPortraits is given the default will be none
      switch(numOfPortraits) {                                                                 //
        case  2: if (offset) pattern = '0111110'; else pattern = '1101011'; break;             // alternate patterns for offset and not (even and odd)
        case  4: if (offset) pattern = '01011010'; else pattern = '10100101'; break;           //
        case  6: if (offset) pattern = '010010010'; else pattern = '100010001'; break;         //
        case  8: if (offset) pattern = '0010000100'; else pattern = '1000000001'; break;       //
        case 10: pattern = '00000100000'; break;                                               // only one symmetrical pattern can be made
        case 12: pattern = '000000000000'; break;                                              // only one symmetrical pattern can be made
        default: break;
      }
    }
    if (gridWidth == 6) {
      pattern = '111'
      if (numOfPortraits > 0) {
        if (offset) pattern = '0110';
        else pattern = '1001';
      }
    }

    logit('Pattern: ' + pattern + ' gridWidth: ' + gridWidth + ' numOfPortraits: ' + numOfPortraits);

/*                    **
**  Image Distributer **
**                    */
    [...pattern].forEach(item => {                                                           // convert the pattern in to an array and begin itterating through it's characters
      if (parseInt(item) && landscapes.length > 0) newSequence.push(landscapes.shift())      // if item is a 1 and there are landscapes left push landscape
      else if (portraits.length > 0) newSequence.push(portraits.shift())                     // otherwise if there are any portraits left push portrait
      else if (landscapes.length > 0) newSequence.push(landscapes.shift())                   // otherwise if there are any landscapes left push lanscape
    });
  }


  let offsetToggle = 1;
  let leftoverPorts = 0;
  let oddPorts = 0;
  let evenPorts = 0;

/*                                **
**  Logical Portraits Distributer **
**                                */

// this next loop decides how many time you can distribute 2 portraits on every other row
// Each time through the loop it either adds two portraits to the even rows or two to the odd rows
// If there is not enough portraits left for a whole pass they are added to leftoverPorts

  if (portraits.lenghth < predictedNumOfRows) evenPorts = 2;     // if there not enough portraits for the offset rows
  else {                                                         // use the portraits for the offset rows only
    let i = portraits.length;
    do {
      i -= predictedNumOfRows;                                   // each time round the loop deduct 2 portraits for half the number of rows
      if (offsetToggle) evenPorts += 2;                          // every other time round the loop either 2 portraits will be added on to
      else oddPorts += 2;                                        // evenPorts or 2 will be added on to oddPorts.
      offsetToggle = !offsetToggle;                              // this switches offsetToggle
    }
    while (i > predictedNumOfRows);                              // if there is not enough portraits left to accomodate another pass of the loop
    leftoverPorts = i;                                           // break out of the loop and add the leftover portraits to leftoverPorts
  }

// This next loop calls the sequencer for each row and distributes leftoverPorts amongst the odd numbered rows

  offsetToggle = 0;                                      // Reset the toggle
  for (let i = predictedNumOfRows; i > 0; i--) {         // loop once for every row
    if (!offsetToggle) {                                 // if its an odd numbered row
      if (leftoverPorts > 0) {                           // call the sequencer and pass in the number of oddPorts
        sequencer(oddPorts + 2, offsetToggle)            // if there are leftoverPorts left add 2 to the number
        leftoverPorts -= 2;                              // of oddPorts and deduct 2 from the number of leftoverPorts
      } else sequencer(oddPorts, offsetToggle);          // if there's no leftoverPorts just pass in oddPorts unadulterated
    }
    else sequencer(evenPorts, offsetToggle);             // Otherwise it's an even row, call sequencer and pass in evenPorts

    offsetToggle = !offsetToggle;                        // switch the toggle
  }

  logit('OddPorts: ' + oddPorts + ' evenPorts: ' + evenPorts)

  console.log('Array resequenced!!! num of items = ', newSequence.length)
  return newSequence;
}

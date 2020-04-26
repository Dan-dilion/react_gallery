export const resequenceJpegs = (jpegs) => {

  let newSequence = [];
  let gridWidth = 12;
  if (window.matchMedia("(max-width: 800px)").matches) gridWidth = 6;     // Set the gridWidth according to the viewport width

  const getPortraits = (pegs) => {                              // Function to make array of all portrait images
    let ports = [];                                             // Declare empty array
    pegs.forEach(item => {                                      // Iterate through jpegs
      if (item.res.width < item.res.height) ports.push(item);   // If the width is smaller than the height add it to portraits
    })
    return ports;                                               // Return the array of portraits
  }

  const getLandscapes = (pegs) => {                             // Function to make array of all landscape images
    let lands = [];                                             // Declare empty array
    pegs.forEach(item => {                                      // Iterate through jpegs
      if (item.res.width >= item.res.height) lands.push(item);  // If the width is larger than or the same as the height add it to landscapes
    })
    return lands;                                               // Return the array of landscapes
  }

  const portraits = getPortraits(jpegs)
  const landscapes = getLandscapes(jpegs)

  const predictedNumOfRows =  Math.ceil(((landscapes.length * 2) + portraits.length) / gridWidth)       // Landscapes take twice as much space as portraits,
                                                                                                        // Round result up if not an integer
/*                     **
**  Pattern selector   **
**                     */
  const sequencer = (numOfPortraits = 0, patternSelector = 1, offset = 0) => {                          // This is the sequencer!
    let pattern = [];

    if (gridWidth === 12) {        // This is the pattern sequencer for the 12 fraction grid
      pattern = ['000000'];       // If no numberOfPortraits is given the default will be none
      switch(numOfPortraits) {
        case  2:
          if (offset) pattern = ['1000001'];                             // Offset patterns begin with portraits (0)
          else pattern = ['0010100', '0100010']; break;                  // Non-offset patterns begin with landscapes (1)
        case  4:
          if (offset) pattern = ['10100101', '10011001'];                // I have left out 11000011 for better aesthetics
          else pattern = ['01011010', '01100110']; break;                // I have left out 00111100 for better aesthetics
        case  6:
          if (offset) pattern = ['101101101', '110101011'];              // To access different variations of the pattern
          else pattern = ['011101110']; break;                           // just cycle through the index number of the pattern group
        case  8:
          if (offset) pattern = [                                        // I am using the patternSelector variable for this
            '1011111101', '1101111011', '1110110111', '1111001111'       // It accumulates for every odd or even row and is
          ];                                                             // always kept within range (see later)
          else pattern = ['0111111110']; break;
        case 10: pattern = ['11111011111']; break;                       // Only one symmetrical pattern can be made
        case 12: pattern = ['111111111111']; break;                      // Only one symmetrical pattern can be made
        default: break;
      }
    }

    if (gridWidth === 6) {         // This is the pattern sequencer for the 6 fraction grid
      pattern = ['000'];          // If no numberOfPortraits is given the default will be none
      switch(numOfPortraits) {
        case 2: if (offset) pattern = ['1001']; else pattern = ['0110']; break
        case 4: pattern = ['11011']; break;
        default: break;
      }
    }

    while (patternSelector > pattern.length) {            // This little loop makes sure that the pattern selector is always in range of the
      patternSelector -= pattern.length;                  // number of variations in the pattern array. It repeatedly subtracts the number of
    }                                                     // patterns available until the value is within range

/*                    **
**  Row Sequencer     **
**                    */

// The Image Dropper will iterate through each character in the pattern and drop a portrait for "1" characters and a landscape for "0" characters.
// It is written in such a way that if there are none of the desired images left it will just drop the other type.
// This way it is always better to over prescribe the portraits (round numbers up) if there is a discrepancy because it can always compensate.

    [...pattern[patternSelector -= 1]].forEach(item => {                                   // Convert the pattern into an array and begin iterating through its characters
      if (parseInt(item) && portraits.length > 0) newSequence.push(portraits.shift())      // If item is a 1 and there are landscapes left push landscape
      else if (landscapes.length > 0) newSequence.push(landscapes.shift())                 // Otherwise if there are any portraits left push portrait
      else if (portraits.length > 0) newSequence.push(portraits.shift())                   // Otherwise if there are any landscapes left push lanscape
    });
  }


  /*                                **
  **  Portraits Distributor         **
  **                                */
  // This next loop decides how many time you can distribute 2 portraits on every other row
  // Each time through the loop it either adds two portraits to the even rows or two to the odd rows
  // If there are not enough portraits left for a whole pass they are added to leftoverPorts variable

  let offsetToggle = 1;           // Set to 1 to ensure the portraits are distributed on the even numbered rows first
  let leftoverPorts = 0;
  let oddPorts = 0;
  let evenPorts = 0;
  let oddPatternNumber = 1;
  let evenPatternNumber = 1;

  if (portraits.lenghth < predictedNumOfRows) evenPorts = 2;     // If there not enough portraits for the offset rows
  else {                                                         // Use the portraits for the offset rows only
    let i = portraits.length;
    do {
      i -= predictedNumOfRows;                                   // Each time round the loop deduct 2 portraits for half the number of rows
      if (offsetToggle) evenPorts += 2;                          // Every other time round the loop either 2 portraits will be added on to
      else oddPorts += 2;                                        // evenPorts or 2 will be added on to oddPorts.
      offsetToggle = !offsetToggle;                              // This switches offsetToggle
    }
    while (i > predictedNumOfRows);                              // If there is not enough portraits left to accommodate another pass of the loop
    leftoverPorts = i;                                           // Break out of the loop and add the leftover portraits to leftoverPorts
  }

/*                    **
**    Row Builder     **
**                    */

// This next loop calls the sequencer for each row and feeds in the number of portraits allocated by the portrait distributor
// If there were any portraits left over in leftoverPorts it distributes them amongst the odd numbered rows

  oddPatternNumber = 1;
  evenPatternNumber = 1;                                              // Reset the pattern selectors
  offsetToggle = 0;                                                   // Reset the toggle
  for (let i = predictedNumOfRows; i > 0; i--) {                      // Loop once for every row
    if (!offsetToggle) {                                              // If it's an odd numbered row
      if (leftoverPorts > 0) {                                        // Call the sequencer and pass in the number of oddPorts
        sequencer(oddPorts + 2, oddPatternNumber, offsetToggle)       // If there are leftoverPorts left add 2 extra images
        leftoverPorts -= 2;                                           // from oddPorts and deduct 2 from the number of leftoverPorts
      } else sequencer(oddPorts, oddPatternNumber, offsetToggle);     // If there are no leftoverPorts just pass in oddPorts unadulterated
      oddPatternNumber +=1;                                           // Keep track of the pattern deviation
    }
    else {
      sequencer(evenPorts, evenPatternNumber, offsetToggle);          // Otherwise it's an even row – call sequencer and pass in evenPorts
      evenPatternNumber += 1;                                         // Keep track of the offset pattern deviation
    }
    offsetToggle = !offsetToggle;                                     // Switch the toggle
  }

  console.log('Array resequenced!!! num of items = ', newSequence.length)
  return newSequence;
}

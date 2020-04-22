import React, { useEffect } from "react";
import Prism from "prismjs";

import '../css/home.css';

export const Home = (props) => {

  useEffect(() => {                   // Necessary to initialise Prism
      Prism.highlightAll();           // Otherwise you have to refresh
  })                                  // page for highlights to work

  return(
    <div className="home-container">
      <div className="intro-box right-pad">
        <section className="welcome-message fade-in">
          <h2>Welcome to React Gallery</h2>
          <p>
            My name is Daniel Marston; I am a self-taught React/Javascript
            developer seeking entry into the corporate world. I am eager to gain
            commercial experience and become a valuable developer to a reputable
            organisation.
          </p>
          <p>
            I am developing React Gallery as a way to apply the technologies I
            have learned during my studies. React is a magic box of tricks. I
            love developing with it – it is fast, responsive and makes UI design
            simple and rewarding. I believe it is the future of professional web
            design. Combining React with NodeJS, I have been able to develop the
            front end and the back end exclusively using Javascript,
            incorporating state of the art techniques and leading web development
            practices. Below is a summary of the technologies I have used.
          </p>
          <p>
            Source code can be downloaded from <a target="_blank"
            href="https://github.com/dan-dilion">my GitHub account</a>.
          </p>

        </section>

        <section className="tech-ul-container">
          <div className="technologies-ul fade-in">
            <h3>Back End</h3>
            <ul>
              <li>NodeJS</li>
              <li>NPM</li>
              <ul>
                <li>Express router</li>
                <li>Archiver</li>
                <li>Sharp</li>
              </ul>
              <li>AJAX/XHR</li>
              <li>Bundlers, trans-compilers and other build tools</li>
                <ul>
                  <li>Create-React-App</li>
                  <li>Webpack</li>
                  <li>Babel</li>
                  <li>Nodemon</li>
                </ul>
              <li>Deployment</li>
              <ul>
                <li>Apache Web Server</li>
                <li>SSH & SCP</li>
                <li>Bash Scripts</li>
              </ul>
            </ul>
            <br />
          </div>

          <div className="technologies-ul fade-in">
            <h3>Front End</h3>
            <ul>
              <li>Javascript</li>
              <li>Frameworks & APIs</li>
              <ul>
                <li>React</li>
                <li>React-Spring</li>
                <li>Redux</li>
                  <ul>
                    <li>Redux-Logger</li>
                    <li>Redux-Thunk</li>
                  </ul>
              </ul>
              <li>HTML</li>
              <li>CSS</li>
            </ul>
          </div>
          <br className="clear" />
        </section>

        <section className="walkthrough-video fade-in">
          <h3>Walkthrough</h3>
          <video className="embedded-video" controls>
            <source src="./resources/video/walkthrough.mp4" type="video/mp4">
            </source>
            There was a problem finding the video source
          </video>

          <br />
          <br />
        </section>
      </div>

      <section className="concept right-pad fade-in">
        <h3>Concept</h3>
        <p>
          React Gallery is designed to provide a useful way to share
          photographs. As a keen amateur photographer, I can drop large
          quantities of images on my web server and make them instantly,
          publicly available, with a convenient download basket facility.
        </p>
      </section>

      <section className="Header-navbar right-pad fade-in">
        <h3>Header, Nav-Bar & Function Bar</h3>
        <p>
          The header provides the primary controls for the application. It also
          provides navigational feedback and shows the number of items in the
          basket and which functions are available. This is achieved with two
          panels: the nav-bar and the function bar.
        </p>
        <p>
          <strong>The nav-bar</strong> indicates which page and which
          collection of images you are viewing (the gallery or the basket).
        </p>
        <p>
          <strong>The function bar</strong> provides three functions:
        </p>
        <ul>
          <li>Add all images to the basket</li>
          <li>Empty the basket</li>
          <li>Download the images in the basket</li>
        </ul>
        <br />
      </section>

      <div className="underline-animation-container section-container fade-in">

        <section className="underline-animation-text section-text right-pad">
          <h3>Underline Animation</h3>
          <p>
            Using CSS, I have attached a pseudo element to
            the navbar buttons using the <code className="language-css">
            ::after{'{'}</code> keyword. It is centrally positioned at the bottom
            with a light coloured border and a width of zero to make it
            invisible. On hovering over the button with the mouse pointer, the
            width is increased (to the right) and the position is moved (to the
            left) allowing the (now visible) line to remain central. I gave
            the <code className="language-css">
            left:</code> and <code className="language-css">width:</code> CSS
            properties a <code className="language-css">
            transition-duration: 400ms;</code> to make the change animate over
            time.
          </p>
        </section>

        <section className="underline-animation-code right-pad">
          <h3>CSS</h3>
          <pre className="code-exerpt">
            <code className="language-css">
{
`.navbar-items {
  position: relative;                            /* establishes a new flow context to anchor the   */
  line-height: 1.3em;                            /* absolute positionned ::after psudo element.    */
  height: 1em;                                   /* Also ristrict the height of the element to 1em */
}

.navbar-items::after {                           /* Creates a psudo element after the navbar-items */
  content: '';                                   /* elements. Absolute positionning allows the use */
  position: absolute;                            /* of left & bottom and anchors element to it's   */
  bottom: 0;                                     /* closest ancestor with reletive positionning.   */
  left: 50%;                                     /* The psudo element is positionned in the middle */
  width: 0;                                      /* at the bottom with a solid border and 0 width. */
  height: 5px;                                   /* Element is not yet visible!                    */
  border-bottom: 5px solid #fed;
}
                                                 /* propertys transition over a duration */
.navbar-items, .navbar-items::after {
  transition-property: left, width, background-color, border;
  transition-duration: 400ms;
  transition-timing-function: ease-in-out;
}

.navbar-items:hover::after {                     /* On hover ajust the position and the width  */
  left: 10%;                                     /* of the psudo element (making them visible) */
  width: 80%;                                    /* the transition will be animated because of */
}                                                /* the transition effects                     */

.selected {                                      /* When selected highlight the background     */
  transition: background-color 1500ms;
  background-color: #fed4;
}

.selected::after {                               /* When selected Keep the underline visible   */
  left: 10%;
  width: 80%;
  border-bottom: 5px solid #fed;
}`
}
            </code>
          </pre>
          <br />
          <br />
        </section>

      </div>

      <div className="button-logic-container section-container fade-in">

        <section className="button-logic-text section-text right-pad">
          <h3>Button Logic</h3>
          <p>
            I have centralised the button logic with
            a <code className="language-js">buttonDispenser()</code> function,
            an elegant alternative to a huge messy heap of if-then-else
            statements that would be impossible to read.
          </p>
          <p>
            <code className="language-js">buttonDispenser()</code> requires the
            button type as an input and depending on the number of items in the
            basket and the current page, it will choose the state and return a
            JSX button with corresponding class names. Using CSS, I can target
            the class names to style the buttons according to their status (on or
            off; selected or not).
          </p>
        </section>

        <section className="button-logic-code right-pad">
          <h3>JS - buttonDispenser()</h3>
          <pre className="code-exerpt">
            <code className="language-js">
              {`function buttonDispenser(button) {

switch (button) {
  case 'home':
    if (props.selectedPage === 'home')          // If homepage is selected
      return homeButton(1);                     // highlight button
    else return homeButton(0);                  // otherwise do not highlight

  case 'gallery':
    if (props.selectedPage === 'gallery')       // If gallery is selected
      return galleryButton(1);                  // highlight button
    else return galleryButton(0);               // otherwise do not highlight

  case 'basket':
    if (props.selectedPage === 'basket')        // If basket is selected
      return basketButton(1);                   // highlight button
    else return basketButton(0);                // otherwise do not highlight

  case 'download':
    if (
      props.selectedPage !== 'home'             // If not on homepage and
      && props.getBasket.length !== 0           // there are items in the basket
    )
    return downloadButton(1);                   // Button is on
    else return downloadButton(0);              // Otherwise ghost button

  case 'addAll':
    if (
      props.getJpegs.length                     // If all images are not
      !== props.getBasket.length                // already in the basket and
      && props.selectedPage === 'gallery'       // the selected page is gallery
    )
    return addAll(1);                           // Button is on
    else return addAll(0);                      // Otherwise ghost button

  case 'emptyBasket':
    if (
      props.selectedPage !== 'home'             // If not on homepage and
      && props.getBasket.length > 0             // basket is not empty
    )
    return emptyBasketButton(1);                // Button is on
    else return emptyBasketButton(0);           // Otherwise ghost button

    default: break;
  }
}
              `}
            </code>
          </pre>
          <br />
          <br />
        </section>

      </div>

      <div className="gallery-basket-container fade-in">

        <section className="gallery-basket-text right-pad">
          <h3>Gallery & Basket View</h3>
          <p>
            Gallery view is the centrepiece of the web-app. Its first incarnation
            was a simple image grid but I wanted it to be more visually
            interesting. I decided to offset every other row to form a brick wall
            pattern. After much experimentation, I constructed a pattern
            sequencer.
          </p>
          <p>
            <code className="language-js">resequenceJpegs()</code> starts by
            distributing two portrait images at the start and end of each even
            numbered row. This ensures that the images on adjacent rows will be
            offset to one another. If there are any portrait images
            left, <code className="language-js">resequenceJpegs()</code> will
            distribute two portraits at a time to the odd numbered rows followed
            by the even numbered rows and so on. For each row, the pattern
            sequencer will cycle through all possible symmetrical patterns.
          </p>
          <p>
            I have attached an event listener to a mediaQueryList object that
            will call the pattern sequencer if the viewport width changes to
            below 800 pixels. This enables responsive, real-time re-sequencing of
            the images when the window size or the screen orientation is changed
            by the user.
          </p>
          <p>
            Each thumbnail has a button, which either adds the image to, or
            removes it from the basket. In gallery view, the button will remain
            static if the image is in the basket. Otherwise, the button will be
            invisible unless you hover over the image.
          </p>
        </section>

        <div className="sequencer-container">
          <section className="gallery-basket-code right-pad">
            <h3>JS - resequenceJpegs()</h3>
            <pre className="code-exerpt">
              <code className="language-js">
                {`
  export const resequenceJpegs = (jpegs) => {

    let newSequence = [];
    let gridWidth = 12;
    if (window.matchMedia("(max-width: 800px)").matches) gridWidth = 6;

    const getPortraits = (pegs) => {                                    // Function to make array of all portrait images
      let ports = [];                                                   // declare empty array
      pegs.forEach(item => {                                            // iterate through jpegs
        if (item.res.width < item.res.height) ports.push(item);         // if the width is smaller than the height add it to portraits
      })
      return ports;                                                     // return the array of portraits
    }

    const getLandscapes = (pegs) => {                                   // Function to make array of all landscape images
      let lands = [];                                                   // declare empty array
      pegs.forEach(item => {                                            // iterate through jpegs
        if (item.res.width >= item.res.height) lands.push(item);        // if width is larger or the same as height add it to landscapes
      })
      return lands;                                                     // return the array of landscapes
    }

    const portraits = getPortraits(jpegs)
    const landscapes = getLandscapes(jpegs)
    const predictedNumOfRows =  Math.ceil(                              // calculate the number of rows there will be
      ((landscapes.length * 2) + portraits.length) / gridWidth          // landscapes take twice as much space as portraits,
    )

  /*                     **
  **  Pattern selecter   **
  **                     */

    const sequencer = (numOfPortraits = 0, patternSelecter = 1, offset = 0) => {
      let pattern = [];

      if (gridWidth == 12) {                                            // This is the pattern store for the 12 fraction grid
        pattern = ['000000'];                                           // if no numberOfPortraits is given the default will be none
        switch(numOfPortraits) {
          case  2:
            if (offset) pattern = ['1000001'];                          // offset patterns begin with portraits (1)
            else pattern = ['0010100', '0100010']; break;               // normal patterns begin with landscapes (0)
          case  4:
            if (offset) pattern = ['10100101', '10011001'];             // I have left out 11000011 for the aesthetics
            else pattern = ['01011010', '01100110']; break;             // I have left out 00111100 for the aesthetics
          case  6:
            if (offset) pattern = ['101101101', '110101011'];
            else pattern = ['011101110']; break;
          case  8:
            if (offset) pattern = [
              '1011111101', '1101111011', '1110110111', '1111001111'
            ];
            else pattern = ['0111111110']; break;
          case 10: pattern = ['11111011111']; break;                    // only one symmetrical pattern can be made
          case 12: pattern = ['111111111111']; break;                   // only one symmetrical pattern can be made
          default: break;
        }
      }

      if (gridWidth == 6) {                                             // This is the pattern store for the 6 fraction grid
        pattern = ['000'];                                              // if no numberOfPortraits is given the default will be none
        switch(numOfPortraits) {
          case 2: if (offset) pattern = ['1001']; else pattern = ['0110']; break
          case 4: pattern = ['11011']; break;
          default: break;
        }
      }

      while (patternSelecter > pattern.length) {                        // This little loop makes sure that the pattern selecter is always
        patternSelecter -= pattern.length;                              // in range of the number of deviations in the pattern array
      }

  /*                    **
  **  Row Sequencer     **
  **                    */
  // The Image Dropper will itterate through each character in the pattern and drop a portrait for 1 characters and a landscape for 0's.
  // it is written in such a way that if there are none of the desired images left it will just drop the other type.
  // This way it is always better to over prescribe the portraits (round numbers up) because it will always be able to compensate.

      [...pattern[patternSelecter -= 1]].forEach(item => {              // convert pattern to an array and itterate through it's characters
        if (parseInt(item) && portraits.length > 0)
          newSequence.push(portraits.shift())                           // if item is a 1 and there are landscapes left push landscape
        else if (landscapes.length > 0)
          newSequence.push(landscapes.shift())                          // otherwise if there are any portraits left push portrait
        else if (portraits.length > 0)
          newSequence.push(portraits.shift())                           // otherwise if there are any landscapes left push lanscape
      });
    }

  /*                                **
  **  Portraits Distributer         **
  **                                */

  let offsetToggle = 1;                                                 // Set to 1 so portraits are first distributed on even rows
  let leftoverPorts = 0;
  let oddPorts = 0;
  let evenPorts = 0;
  let oddPatternNumber = 1;
  let evenPatternNumber = 1;

  // this next loop decides how many time you can distribute 2 portraits on every other row
  // Each time through the loop it either adds two portraits to the even rows or two to the odd rows
  // If there is not enough portraits left for a whole pass they are added to leftoverPorts variable

    if (portraits.lenghth < predictedNumOfRows) evenPorts = 2;          // if there not enough portraits for offset rows
    else {                                                              // only use the portraits for the offset rows
      let i = portraits.length;
      do {
        i -= predictedNumOfRows;                                        // each loop deduct 2 portraits for half the number of rows
        if (offsetToggle) evenPorts += 2;                               // either add 2 portraits to evenPorts
        else oddPorts += 2;                                             // or 2 on to oddPorts (depending on offsetToggle).
        offsetToggle = !offsetToggle;                                   // switch offsetToggle ready for the next pass
      }
      while (i > predictedNumOfRows);                                   // if not enough portraits left for one pass of the loop
      leftoverPorts = i;                                                // exit the loop and add the leftover portraits to leftoverPorts
    }

  /*                    **
  **    Row Builder     **
  **                    */
  // This next loop calls the sequencer for each row and feeds in the number of Portraits allocated by the portrait distributer
  // If there were any portraits left over in leftoverPorts it distributes them amongst the odd numbered rows

    oddPatternNumber = 1;
    evenPatternNumber = 1;                                              // reset the pattern selecters
    offsetToggle = 0;                                                   // Reset the toggle
    for (let i = predictedNumOfRows; i > 0; i--) {                      // loop once for every row
      if (!offsetToggle) {                                              // if its an odd numbered row
        if (leftoverPorts > 0) {                                        // call the sequencer and pass in the number of oddPorts
          sequencer(oddPorts + 2, oddPatternNumber, offsetToggle)       // if there are any leftoverPorts add 2 extra images to the row
          leftoverPorts -= 2;                                           // and deduct 2 from leftoverPorts
        } else sequencer(oddPorts, oddPatternNumber, offsetToggle);     // if there's no leftoverPorts just pass in oddPorts unadulterated
        oddPatternNumber +=1;                                           // Keep track of the pattern variant
      }
      else {
        sequencer(evenPorts, evenPatternNumber, offsetToggle);          // Otherwise it's an even row, call sequencer and pass in evenPorts
        evenPatternNumber += 1;                                         // Keep track of the offset pattern variant
      }
      offsetToggle = !offsetToggle;                                     // switch the toggle
    }

    return newSequence;                                                 // Return the resequenced array!
  }
                `}
              </code>
            </pre>
            <br />
            <br />
          </section>

          <br />
          <br />

          <section className="responsive-design-video fade-in right-pad">
            <h3>Responsive Design</h3>
            <video className="embedded-video" controls>
              <source src="./resources/video/responsive-design.mp4" type="video/mp4">
              </source>
              There was a problem finding the video source
            </video>

            <br />
            <br />
          </section>
        </div>

      </div>

      <div className="single-image-container section-container fade-in">

        <section className="single-image-text section-text right-pad">
          <h3>Single Image Slider</h3>
          <p>
            In single image view, the image slider will slide through the images
            in the gallery or the basket. I have
            implemented <a href='https://www.react-spring.io/' target="_blank">
            React-Spring</a> for the transition effect. Going forward, I intend
            to add other effects such as finger gestures in mobile view.
          </p>
          <p>
            The <code className="language-js">
            removeButtonDispenser()</code> function
            will dispense one of four different remove buttons that each behave
            differently depending on the selected page (gallery or basket) and
            the position of the image within the array of images. The four
            buttons are:
          </p>
          <ul>
          <li>
            <cite>lastInBasket</cite> – no images remaining in basket on
            removal, return to (empty) basket view
          </li>
          <li>
            <cite>beginningOfBasket</cite> – no previous images, slide to
            next image on removal
          </li>
          <li>
            <cite>normalBasket</cite> – slide to previous image on removal
          </li>
          <li>
            <cite>gallery</cite> – just remove image from basket and
            replace <code className="language-js">
            removeButton()</code> with <code className="language-js">
            addButton()</code>
          </li>
          </ul>
          <br />
        </section>

        <section className="single-image-code right-pad">
          <h3>removeButtonDispenser()</h3>
          <pre className="code-exerpt">
            <code className="language-js">
              {`
const removeButtonDispenser = (jpegItem, buttonType) => {
  switch (buttonType) {

    case 'lastInBasket':                                          // If last image in basket link back to
      return(<Link                                                // basket view after image is removed
        className="top-buttons remove-button"
        to={ '/basket' }
        onClick={() => {
          props.removeBasket(props.getBasket.indexOf(jpegItem))
        }}
      />); break;

    case 'beginningOfBasket':                                     // If at the beginning of the basket slide
      return(<Link                                                // to next after image is removed
        className="top-buttons remove-button"
        to={ './' + next.jpegItem.file }
        onClick={() => {
          props.removeBasket(props.getBasket.indexOf(jpegItem))
        }}
      />); break;

    case 'normalBasket':                                          // If in the middle of the basket array
      return(<Link                                                // slide to previous after image is removed
        className="top-buttons remove-button"
        to={ './' + prev.jpegItem.file }
        onClick={() => {
          props.removeBasket(props.getBasket.indexOf(jpegItem))
        }}
      />); break;

    case 'gallery':                                               // If viewing the gallery just remove image
      return(
        <button
          className="top-buttons remove-button"
          onClick={() => {
            props.removeBasket(props.getBasket.indexOf(jpegItem))
          }}
        />
      ); break;

    default: break;
  }
}
              `}
            </code>
          </pre>
          <br />
          <br />
        </section>

      </div>

      <div className="basket-redux-container section-container fade-in">

        <section className="basket-redux-text section-text right-pad">
          <h3>The Basket and Redux</h3>
          <p>
            The basket utility allows the user to add, review, remove and
            download their favourite images on demand. These functions are
            achieved by dispatching Redux actions to the Redux store. Using Redux
            keeps all of React’s state variables and logic centralised and tidy,
            providing a comprehensive structure, eliminating complex data routing
            between components and creating plenty of room for future expansion.
          </p>
          <p>Other Redux actions I have created include:</p>
          <ul>
            <li>
              <code className="language-js">emptyBasket()</code> – clear all
              images from basket
            </li>
            <li>
              <code className="language-js">addAll()</code> – add all the images
              in the gallery to the basket
            </li>
            <li>
              <code className="language-js">refreshJpegs()</code> – initiate an
              XHR “GET” request to the Node server to update the list of images
            </li>
          </ul>
          <br />

          <p>
            <strong>Note:</strong> I have used the middleware <a
            href="https://www.npmjs.com/package/redux-thunk" target="_blank">
            Redux-Thunk</a> so that I can dispatch asynchronous actions.
          </p>
        </section>

        <section className="basket-redux-code right-pad">
          <h3>refreshJpegs()</h3>
          <pre className="code-exerpt">
            <code className="language-js">
{`export const refreshJpegs = () => {                                         // refreshJpegs() is an asynchronous
  return async dispatch => {                                                // Redux action made possible by Redux-Thunk
    if (store.getState().fileReducer.jpegs.length === 0) {                  // If there are no images
      await getJpegs()                                                      // Wait for getJpegs() to be complete
        .then( async response => {                                          // When getJpegs() responds
          dispatch( toggleIsFetching(true) )                                // toggle the "isFetching" flag
          await dispatch( addJpegs(response) )                              // Send the response to addJpegs()
          dispatch( toggleIsFetching(false) )                               // toggle the "isFetching" flag
        })                                                                  //
        .catch( error => {                                                  // If anything had an error in it's response
          console.log('fileActions.js - refreshJpegs: ERROR!!!', error )    // Log the error to console
        })                                                                  //
    } else console.log(                                                     // If there are already images then
      'FileActions - Refresh Jpegs Unnecessary! ',                          // a refresh is unnecessary
      store.getState().fileReducer.jpegs.length                             // log message to console
    )
  }
}`}
            </code>
          </pre>
          <br />
          <br />
        </section>

      </div>

      <div className="nodejs-container section-container fade-in">

      <div className="nodejs-wrapper">
        <h3>NodeJS</h3>
        <p>
          Using a Node server allows me to run a portion of the website outside
          of the browser environment. This enables functionality that would
          otherwise be restricted by the browser but allows me to maintain the
          same level of security by controlling the precise level of access to
          the server’s resources.
        </p>
        <p>
          I have used the <a href="https://expressjs.com/" target="_blank">
          Express</a> API for routing client requests, it is configured to
          listen to a specific port and respond to certain URIs. It circumvents
          Cross Origin Resource Sharing (CORS) restrictions by attaching the
          “Access-Control-Allow-Origin” header to it’s responses.
        </p>

          <div className="nodejs-text-vid-wrapper">
            <section className="nodejs-text right-pad">
              <p>
                <code className="language-js">getJpegs()</code> is one of the services
                provided by the Node server. When the browser makes an XHR “GET”
                request Node will respond with an array containing all images in the
                images folder attached to the response segment of the "GET" request.
                You can see the response from <code className="language-js">
                getJpegs()</code> by visiting <a
                  href="http://www.waxworlds.org:8987/api/getjpegs/" target="_blank">
                  the URL that the Express router is
                  configured to respond to
                </a>.
              </p>
              <p>
                <code className="language-js">resizeImages()</code> resizes new images
                placed in the images folder using the Sharp API available with
                the <a href="https://www.npmjs.com/" target="_blank">
                Node Package Manager</a> (
                <a href="https://www.npmjs.com/" target="_blank">NPM</a>).
              </p>
              <p>
                <code className="language-js">zipJpegs()</code> receives a list of
                files that is embedded in the search parameter segment of the URL
                used in the “GET” request intercepted by Express-Router. Using
                the <a href="https://www.archiverjs.com/" target="_blank">
                archiver</a> API (also available
                from <a href="https://www.npmjs.com/" target="_blank">NPM</a>), it
                will begin to zip these files and pipe a read-stream back to the
                browser in the XHR response as an attachment. The data stream is
                passed in chunks of data to the browser so there are no temporary
                files stored on the server. Depending on how the browser is
                configured, it will either save the zip file in the Downloads folder
                or invoke the “save as” prompt.
              </p>
            </section>

            <section className="nodejs-video fade-in right-pad">
              <h3>Node Server</h3>
              <video className="embedded-video" controls>
                <source src="./resources/video/node-server.mp4" type="video/mp4">
                </source>
                There was a problem finding the video source
              </video>

              <br />
              <br />
            </section>
          </div>
        </div>

        <div className="nodejs-code-container section-container">

          <section className="nodejs-code">
            <h3>Client side</h3>
            <h3>getJpegs()</h3>
            <pre className="code-exerpt">
              <code className="language-js">
{`export const getJpegs = async () => {
return await fetch(apiUrl + 'getjpegs')                   // Make XHR request to to NodeJS server
.then( async response => {                                // Error Handeling (if Node server returns an error it will be text)
  if (response.ok) return await response.json()           // If no error: converts the data streem into json object
  else return await response.text()                       // If Error: converts data stream in to text object and
})                                                        // error will be displayed in the gallery
.catch(err => console.log('ERROR!!!', err))               // Catch errors not from NodeJS, output to console
`}
              </code>
            </pre>

            <br />
            <br />
          </section>

          <section className="nodejs-code">
            <h3>Server side</h3>
            <h3>getJpegs()</h3>
            <pre className="code-exerpt">
              <code className="language-js">
{`async function getJpegs(dir) {                          // This is an async function which allows us
  let jpegs;                                            // to use the await command. the .then will
  await readdir(dir)                                    // only be executed after readdir has finished
  .then(output => {
    jpegs = output.filter((output) => {                 // iterate through the array
      return (path.extname(output)                      // keep only the entries with
      == '.jpg' || path.extname(output)                 // .jpg or .JPEG extention names
      == '.JPEG');                                      // the filter is not case sensitive
    })                                                  // to make case sensitive use ===
  })
  .catch(error => {                                     // Catch the reject promise object from readdir
    console.log('getJpegs ERROR: ', error.message)      // Log error to console
    throw new Error(error.message)                      // throw error (this will be collected by .catch
  })                                                    // in the calling function)
  return jpegs;                                         // Return the list of jpegs
}`}
              </code>
            </pre>

            <br />
            <br />
          </section>

        </div>
      </div>

      <section className="deployment right-pad">
      <h3>Bundlers, trans-compilers and other build tools</h3>

      <p>
        <cite>Create-React-App</cite> is a React bootstrapping utility. It
        installs and configures Webpack and Babel amongst other tools, ready
        to be used in a React project. It stores its configuration settings
        in the package.json file created by NPM and will bundle, minify and
        optimise your code when you build your app for
        production. <a href="https://create-react-app.dev/" target="_blank">
        Create-React-App</a> also configures the browser to refresh upon
        changes to the code in the project
        directory. <a href="https://nodemon.io/" target="_blank">Nodemon</a> is
        another tool that I have used to monitor for changes. In this case it
        monitors my server code and relaunches my Node server when anything is
        changed.
      </p>

      <br />

      <h3>Deployment</h3>
      <p>
        To deploy React Gallery with an Apache server I had to take a number
        of steps:
      </p>
      <ul>
      <li>
        I configured a .htaccess file to instruct Apache to redirect
        everything in the URL after React Gallery’s root directory over to
        index.html. This ensures that React Router can intercept the URL
        changes and serve up the corresponding React components.
      </li>
      <br />
      <li>
        I created a parameter in package.json: <code className="language-js">
        "homepage": "/dan/react_gallery"</code> which is used by NPM during the
        production build process to insure that the build points to the correct
        subdirectory. It can then be referenced in the app using the
        environment variable <code className="language-js">
        process.env.PUBLIC_URL</code>.
      </li>
      <br />
      <li>
        Using the terminal command “screen” I can run my Node server with a
        Bash script in a detached session. This ensures that it continues
        to run after I close the terminal.
      </li>
      </ul>

      </section>

      <br className="clear" />
    </div>
  )
}

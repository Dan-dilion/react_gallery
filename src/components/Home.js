import React, { useEffect } from "react";
import Prism from "prismjs";

import '../css/home.css';

export const Home = (props) => {

  useEffect(() => {
      Prism.highlightAll();
  })

  return(
    <div className="home-container">
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

      <br />
      <br />

      <section className="ul-container">
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
        <br class="clear" />
      </section>

      <br />
      <br />

      <section className="Write-up fade-in">
        <h3>Concept</h3>
        <p>
          React Gallery is designed to provide a useful way to share
          photographs. As a keen amateur photographer, I can drop large
          quantities of images on my web server and make them instantly,
          publicly available, with a convenient download basket facility.
        </p>

        <br />

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
          <ul>
            <li>Add all images to the basket</li>
            <li>Empty the basket</li>
            <li>Download the images in the basket</li>
          </ul>
        </p>

        <br />

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
        <br/>
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
        <br />
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
        <br />
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
            XHR “GET” request to the Node server to update the list of
          </li>
        </ul>
        <br />

        <p>
          <strong>Note:</strong> I have used the middleware <a
          href="https://www.npmjs.com/package/redux-thunk" target="_blank">
          Redux-Thunk</a> so that I can dispatch asynchronous actions.
        </p>

        <br />

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
        <p>
          <code className="language-js">getJpegs()</code> is one of the
          services provided by the Node server. It will respond to an XHR “GET”
          request by attaching a JSON object with an array containing all
          images in the images folder to the response segment of the request.
          You can see the response from <code className="language-js">
          getJpegs()</code> by visiting the URL that the Express router is
          configured to respond to.
        </p>
        <p>
          <code className="language-js">resizeImages()</code> detects and
          resizes new images placed in the images folder using the Sharp API
          available with the Node Package Manager
          (<a href="https://www.npmjs.com/" target="_blank">NPM</a>).
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

        <br />

        <h3>Bundlers, trans-compilers and other build tools</h3>

        <p>
          <cite>Create-React-App</cite> is a React bootstrapping utility. It
          installs and configures Webpack and Babel amongst other tools, ready
          to be used in a React project. It stores its configuration settings
          in the package.json file created by NPM and will bundle, minify and
          optimise your code when you build your app for production.
          Create-React-App also configures the browser to refresh upon changes
          to the code in the project directory. Nodemon is another tool that I
          have used to monitor for changes. In this case it monitors my server
          code and relaunches my Node server when anything is changed.
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
            I created a parameter in package.json: “homepage” is used by NPM
            during the production build process to insure that the build points
            to the correct subdirectory. It can then be referenced in the app
            using the environment variable process.env.PUBLIC_URL.
          </li>
          <br />
          <li>
            Using the terminal command “screen” I can run my Node server with a
            Bash script in a detached session. This ensures that it continues
            to run after I close the terminal.
          </li>
        </ul>


      </section>

      <br />



      <div className="code-exerpt fade-in">
        <pre><code className="language-css">
{`.navbar-items {
  position: relative;       /* establishes a new flow context to anchor the   */
  line-height: 1.3em;       /* absolute positionned ::after psudo element.    */
  height: 1em;              /* Also ristrict the height of the element to 1em */
}

.navbar-items::after {      /* Creates a psudo element after the navbar-items */
  content: '';              /* elements. Absolute positionning allows the use */
  position: absolute;       /* of left & bottom and anchors element to it's   */
  bottom: 0;                /* closest ancestor with reletive positionning.   */
  left: 50%;                /* The psudo element is positionned in the middle */
  width: 0;                 /* at the bottom with a solid border and 0 width. */
  height: .2em;             /* Element is not yet visible!                    */
  border-bottom: .15em solid #fed;
}

.navbar-items, .navbar-items::after { /* propertys transition over a duration */
  transition-property: left, width, background-color, border;
  transition-duration: 0.4s;
  transition-timing-function: ease-in-out;
}

.navbar-items:hover::after {    /* On hover ajust the position and the width  */
  left: 10%;                    /* of the psudo element (making them visible) */
  width: 80%;                   /* the transition will be animated because of */
}                               /* the transition effects */

.selected {                     /* When selected highlight the background     */
  transition: background-color 1500ms;
  background-color: #fed4;
}

.selected::after {              /* When selected Keep the underline visible   */
  left: 10%;
  width: 80%;
  border-bottom: .15em solid #fed;
}`}
        </code></pre>
      </div>
    </div>
  )
}

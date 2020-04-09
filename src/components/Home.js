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
          <p>My name is Daniel Marston, I am a self-taught React/Javascript
          developer seeking entry into the corporate world. I am eager to gain
          commercial experience in order to become a valued developer to a
          reputable organisation and find my place in the industry.
          </p>
          <p>I have developed React Gallery as a means to showcase the
          technologies I have learned during my studies. It is still under
          development so expect new features to be added regularly. I have
          developed it purely in Javascript using state of the art techniques
          and leading web technologies. Below is a brief summary of technologies
          used. Feel free to read on for a more detailed description, I hope you
          enjoy using it.
          </p>
          <p>Source code can be downloaded from <a target="_blank" href="https://github.com/dan-dilion">my GitHub account</a>.</p>
        </section>

        <br />

        <div className="ul-container">
          <section className="technologies-ul fade-in">
            <h3>Back End</h3>
            <ul>
              <li>NodeJS</li>
              <li>NPM</li>
              <li>APIs</li>
              <ul>
                <li>Express-Router</li>
                <li>Archiver</li>
                <li>Sharp</li>
              </ul>
              <li>AJAX/XHR</li>
              <li>Bundelers & Trans-compilers</li>
                <ul>
                  <li>Create-React-App</li>
                  <li>Webpack</li>
                  <li>Babel</li>
                </ul>
              <li>Deployment</li>
              <ul>
                <li>Apache Web Server</li>
                <li>SSH & SCP</li>
                <li>Bash Scripts</li>
              </ul>
            </ul>
          </section>

          <section className="technologies-ul fade-in">
            <h3>Front End</h3>
            <ul>
              <li>Javascript</li>
              <li>Frameworks & APIs</li>
              <ul>
                <li>React</li>
                <li>React-Router</li>
                <li>React-Spring</li>
                <li>Redux</li>
                <li>Middleware</li>
                  <ul>
                    <li>Redux-Logger</li>
                    <li>Redux-Thunk</li>
                  </ul>
              </ul>
              <li>HTML</li>
              <li>CSS</li>
            </ul>
          </section>
        </div>

        <section className="Write-up fade-in">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        </section>



        <div className="code-exerpt">
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

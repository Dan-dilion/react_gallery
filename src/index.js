import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from 'history';

import { getJpegs } from './utils/serverRequest.js';

import store from './store.js';

import App from './pages/App.js';

import './css/index.css';
import './css/App.css';
import './css/Header.css';
import './css/Gallery.css';
import './css/SingleImage.css';
import './css/FullSize.css';
import './css/Thumbnail.css';
import './css/home.css';

/************************ Added by Create-React-App ************************
**                                                                        **
**  import * as serviceWorker from './serviceWorker';                     **
**                                                                        **
***************************************************************************/

/******************************************************************************
For the purposes of deployment I am using the HTML <base> element to prepend
the subdirectory on to the url's in this app: <base href="%PUBLIC_URL%/">. I
have set the subdirectory in package.json ("homepage": "/dan/react_gallery") so
that way the subdirectory will only be prepended there on the production build.
******************************************************************************/

export const history = createBrowserHistory({      // This will insure that the relevent path
    basename: process.env.PUBLIC_URL               // is used in each environment: local as
});                                                // well as production.

// Call the getJpegs function to acquire, from the node server, the list of jpegs in the './images/' folder
// Pass in the Redux store so that the list can be stored in the global state via the reducers.
getJpegs(store);

// Render the main React component (<App />).
render(
	<Provider store={store}>                   {/* The <Provider> component is supplied by Redux.         */}
		<App />                                  {/* All React output will be contained within this element */}
	</Provider>,
	document.getElementById('root')            // Target the element 'root' for rendering.
);

/************************ Added by Create-React-App ************************
** If you want your app to work offline and load faster, you can change   **
** unregister() to register() below. Note this comes with some pitfalls.  **
** Learn more about service workers: https://bit.ly/CRA-PWA               **
** serviceWorker.unregister();                                            **
***************************************************************************/

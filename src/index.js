import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from 'history';

import store from './store.js';

import App from './pages/App.js';

import './css/index.css';
import './css/App.css';
import './css/prism.css';

import './css/FullSize.css';
import './css/Thumbnail.css';

/******************************************************************************
For the purposes of deployment I am using the HTML <base> element to prepend
the subdirectory on to the urls in this app: <base href="%PUBLIC_URL%/">. I
have set the subdirectory in package.json ("homepage": "/dan/react_gallery") so
that the subdirectory will be prepended on the production build.
******************************************************************************/

export const history = createBrowserHistory({      // This will insure that the relevant path
    basename: process.env.PUBLIC_URL               // is used in each environment: local as
});                                                // well as production.

// Render the main React component (<App />).
render(
	<Provider store={store}>                   {/* The <Provider> component is supplied by Redux.         */}
		<App />                                  {/* All React output will be contained within this element. */}
	</Provider>,
	document.getElementById('root')            // Target the element 'root' for rendering.
);

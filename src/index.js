import React from 'react';
import { render } from "react-dom";

import './css/index.css';
import './css/App.css';
import './css/Gallery.css';
import './css/SingleImage.css';

import App from './App';
//import * as serviceWorker from './serviceWorker';

render(
	<App />,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

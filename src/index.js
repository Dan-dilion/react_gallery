import React from 'react';
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from 'history';

import { serverRequest } from './utils/serverRequest.js';
import store from './store.js';

import App from './pages/App.js';

import './css/index.css';
import './css/App.css';
import './css/Gallery.css';
import './css/SingleImage.css';


//import * as serviceWorker from './serviceWorker';

//store.subscribe(() => {
//	console.log("Action Called ", store.getState());
//});

export const history = createBrowserHistory({
    basename: process.env.PUBLIC_URL
});

console.log('Base URL:', + history.basename + ' -- ' + window.location.hostname)

console.log('0 - envoking request')
serverRequest('getjpegs')	// Make server request
	.then( response => {									// Error Handeling (if there is an error it will be text)
		if (response.ok) return response.json()				// If no error: converts the data streem into json object
		else return response.text()							// If Error: converts data stream in to text object
	})
	.then( responseData => {
		store.dispatch({
			type: "SET_JPEGS",
			payload: responseData
		});

	})



render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

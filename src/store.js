import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import fileReducer from './reducers/fileReducer.js';
import basketReducer from './reducers/basketReducer.js';

// Consolidate the state of the different reducers in to one global store
// apply middleware
export default createStore(
	combineReducers({fileReducer, basketReducer}),
	applyMiddleware(createLogger(), thunk)
);

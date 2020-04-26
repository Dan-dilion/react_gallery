import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import fileReducer from './reducers/fileReducer.js';
import basketReducer from './reducers/basketReducer.js';

// Consolidate the state of the different reducers into one global store
// Apply middleware
export default createStore(
	combineReducers({fileReducer, basketReducer}),
	applyMiddleware(createLogger(), thunk)
);

import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import fileReducer from './reducers/fileReducer.js';
import basketReducer from './reducers/basketReducer.js';

export default createStore(
	combineReducers({fileReducer, basketReducer}),
	applyMiddleware(createLogger(), thunk)
);

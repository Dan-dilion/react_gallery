import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

import fileReducer from './reducers/fileReducer.js';

export default createStore(
	fileReducer,
	applyMiddleware(createLogger())
);

import { getJpegs } from '../utils/serverRequest.js';
import store from '../store.js';

// These are the Redux actions for the file reducer. When dispatched they
// instruct the reducer how to change the Redux state object/store.

export const addJpegs = (jpegs) => {
  return {
		type: "ADD_JPEGS",
		payload: jpegs
	}
};

export const toggleIsFetching = (state) => {
  return {
    type: "TOGGLE_FLAG",
    payload: state
  }
}

export const refreshJpegs = () => {                                             // refreshJpegs() is an asynchronous
  return async dispatch => {                                                    // Redux action made possible by Redux-Thunk
    if (store.getState().fileReducer.jpegs.length === 0) {                      // If there are no images
      await getJpegs()                                                          // Wait for getJpegs() to be complete
        .then( async response => {                                              // When getJpegs() responds
          dispatch( toggleIsFetching(true) )                                    // Toggle the "isFetching" flag
          await dispatch( addJpegs(response) )                                  // Dispatch the response with addJpegs() action
          dispatch( toggleIsFetching(false) )                                   // Toggle the "isFetching" flag again
        })                                                                      //
        .catch( error => {                                                      // If anything had an error in its response
          console.log('fileActions.js - refreshJpegs: ERROR!!!', error )        // Log the error to console
        })                                                                      //
    } else console.log(                                                         // If there are already images
      'FileActions - Refresh Jpegs Unnecessary! ',                              // A refresh is unnecessary
      store.getState().fileReducer.jpegs.length                                 // Log message to console
    )
  }
}

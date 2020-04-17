import { getJpegs } from '../utils/serverRequest.js';
import store from '../store.js';

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
          dispatch( toggleIsFetching(true) )                                    // toggle the "isFetching" flag
          await dispatch( addJpegs(response) )                                  // Send the response to addJpegs()
          dispatch( toggleIsFetching(false) )                                   // toggle the "isFetching" flag
        })                                                                      //
        .catch( error => {                                                      // If anything had an error in it's response
          console.log('fileActions.js - refreshJpegs: ERROR!!!', error )        // Log the error to console
        })                                                                      //
    } else console.log(                                                         // If there are already images then
      'FileActions - Refresh Jpegs Unnecessary! ',                              // a refresh is unnecessary
      store.getState().fileReducer.jpegs.length                                 // log message to console
    )
  }
}

// export function refreshJpegs() {
//   console.log('FileActions, refresh called - jpegs.length: ', store.getState().fileReducer.jpegs.length)
//   return async dispatch => {
//
//     function onSuccess(success) {
//       dispatch({
//     		type: "ADD_JPEGS",
//     		payload: success
//     	});
//       console.log('File Action - Jpegs Refreshed.', store.getState().fileReducer.jpegs.length)
//       return success;
//     }
//
//     function onError(error) {
//       console.log('fileActions.js - refreshJpegs: ERROR!!!', error);
//       return error;
//     }
//
//     try {
//       //if (store.getState().fileReducer.jpegs.length === 0){
//         const success = await getJpegs();
//         return onSuccess(success);
//       //} else {
//     //    throw('Refresh Jpegs Action: ERROR! No need to refresh')
//     //  }
//     } catch (error) {
//       return onError(error);
//     }
//   }
//
// }

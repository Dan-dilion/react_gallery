import { getJpegs } from '../utils/serverRequest.js';
import store from '../store.js';

export function addJpegs(jpegs) {
  return {
		type: "ADD_JPEGS",
		payload: jpegs
	}
};

export function refreshJpegs() { return async dispatch => {
  console.log('FileActions, refresh called - jpegs.length: ', store.getState().fileReducer.jpegs.length)
  if (store.getState().fileReducer.jpegs.length === 0) {

    await getJpegs()
      .then( async response => await dispatch( await addJpegs(response) ) )
      .then( console.log('File Action - Jpegs Refreshed.', store.getState().fileReducer.jpegs.length) )
      .catch( error => console.log('fileActions.js - refreshJpegs: ERROR!!!', error ) )

  } else console.log('FileActions - Refresh Jpegs Unnecessary! ', store.getState().fileReducer.jpegs.length)
}}

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

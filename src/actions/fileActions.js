import { getJpegs } from '../utils/serverRequest.js';
import store from '../store.js';

export function addJpegs(jpegs) {
	return {
		type: "ADD_JPEGS",
		payload: jpegs
	};
};

export function refreshJpegs() {return dispatch => {
  if (store.getState().fileReducer.jpegs.length == 0) {
    try {
      getJpegs()
      .then(newJpegs => dispatch(addJpegs(newJpegs)))
    } catch (error) {
      console.log('fileActions.js - refreshJpegs: ERROR!!!', error)
    }
    console.log('File Action - Jpegs Refreshed.')
  } else console.log('FileActions - Refresh Jpegs Unnecessary!')
}}

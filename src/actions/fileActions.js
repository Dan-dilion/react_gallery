import { getJpegs } from '../utils/serverRequest.js';
import store from '../store.js';

export function addJpegs(jpegs) {
	return {
		type: "ADD_JPEGS",
		payload: jpegs
	};
};

export const refreshJpegs = () => async dispatch => {
  if (store.getState().fileReducer.jpegs.length == 0) {
    try {
      await getJpegs()
      .then(newJpegs => dispatch(addJpegs(newJpegs)))
    } catch (error) {
      console.log('fileActions.js - refreshJpegs: ERROR!!!', error)
    }
  } else console.log('Refresh Jpegs Unnecessary')
}

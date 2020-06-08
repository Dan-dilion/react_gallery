// These are the basket reducers. They respond when actions are dispatched
// and will change the state accordingly. Each reducer takes the old
// state and creates a new state with the changes in effect. This process
// has to be immutable because of the way React tracks changes in components.
import {
  resequenceJpegs,
  resequenceDelete
 } from '../utils/sequencer.js'

const initialState = {
	basketJpegs: [],
};

const basketReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_BASKET":
			if (!state.basketJpegs.some( item => item.file === action.payload.file) ) {    // only if action.payload.file is not already in the basket
				state = {
					...state,
					basketJpegs: [...state.basketJpegs, action.payload],
				};
        state = { ...state, basketJpegs: [...resequenceJpegs(state.basketJpegs)] }   // Once added resequenceJpegs()
			} else {                                                                       // If file is already in basket print error to console
				console.log('Not Adding: ', action.payload)
				console.log('Item Already in Basket!!! ')
			}
			break;

    case "ADD_ALL":
      state = { ...state, basketJpegs: [...resequenceJpegs(action.payload)] }       // Add payload
      break;

		case "REMOVE_BASKET":

      let orientation = '';
      if (state.basketJpegs[action.payload].res.height > state.basketJpegs[action.payload].res.width) {
        orientation = 'P';
      }
      else orientation = 'L';

			let newList = [...resequenceDelete(state.basketJpegs, action.payload, orientation)]
			//newList.splice(action.payload, 1);
			state = {
				...state, basketJpegs: [...newList]
			}
      break;

    case "TO_BE_REMOVED":
      state = {
        ...state,
        basketJpegs: [
          ...state.basketJpegs
        ]
      }
      state.basketJpegs[action.payload] = {
        ...state.basketJpegs[action.payload],
        toBeRemoved: !state.basketJpegs[action.payload].toBeRemoved
      }
      break;

    case "EMPTY_BASKET":
      return {...state, basketJpegs: []}

		default:
			console.log('BASKET REDUCER: No action specified!!!');
			break;
	}
	return state;
}

export default basketReducer;

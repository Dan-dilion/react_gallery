// These are the basket reducers. They respond to actions when they are
// dispatched and will change the state accordingly. Each reducer takes the old
// state and creates a new state with the changes in effect. This process
// has to be immutable because of the way React works.

const initialState = {
	basketJpegs: [],
};

const basketReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_BASKET":
			if (!state.basketJpegs.some( item => item.file === action.payload.file) ) {
				state = {
					...state,
					basketJpegs: [...state.basketJpegs, action.payload],
				};
			} else {
				console.log('Not Adding: ', action.payload)
				console.log('Item Already in Basket!!! ')
			}
			break;

    case "ADD_ALL":
      state = { ...state, basketJpegs: [...action.payload] }
      break;

		case "REMOVE_BASKET":
			let newList = [...state.basketJpegs];
			newList.splice(action.payload, 1);
			return {
				...state, basketJpegs: newList
			}

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

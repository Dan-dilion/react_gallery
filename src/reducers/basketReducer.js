const initialState = {
	basketJpegs: [],
};

const basketReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_BASKET":
			if (!state.basketJpegs.some( item => item.file == action.payload.file) ) {
				console.log('Adding item to basket: ', action.payload);
				state = {
					...state,
					basketJpegs: [...state.basketJpegs, action.payload],
				};
				console.log('New State: ', state)
			} else {
				console.log('Not Adding: ', action.payload)
				console.log('Item Already in Basket!!! ')
			}
			break;

      case "ADD_ALL":
        console.log('Adding entire gallery to the basket');
        state = { ...state, basketJpegs: [...action.payload] }
        break;

		case "REMOVE_BASKET":
			console.log('Removing item from basket', state.basketJpegs[action.payload]);
			let newList = [...state.basketJpegs];
			newList.splice(action.payload, 1);
			return {
				...state, basketJpegs: newList
			}

    case "EMPTY_BASKET":
      console.log('Empying basket');
      return {...state, basketJpegs: []}
      break;

		default:
			console.log('BASKET REDUCER: No action specified!!!');
			break;
	}
	return state;
}

export default basketReducer;

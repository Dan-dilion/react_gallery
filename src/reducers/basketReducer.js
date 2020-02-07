const initialState = {
	basketJpegs: [],
	nextId: 0
};

const basketReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_BASKET":
			if (!state.basketJpegs.some( item => item.file == action.payload) ) {
				console.log('Adding file to basket: ', action.payload);
				state = {
					...state,
					basketJpegs: [...state.basketJpegs,
					{
						file: action.payload,
						id: state.nextId
					}],
					nextId: state.nextId + 1
				};
				console.log('New State: ', state)
			} else {
				console.log('Not Adding: ', action.payload)
				console.log('File Already in Basket!!! ')
			}
			break;

		case "REMOVE_BASKET":
			console.log('Removing item from basket', action.payload);
			let pegs = [...state.basketJpegs];
			pegs.splice(action.payload, 1);
			return {
				...state, basketJpegs: pegs
			}

		default:
			console.log('BASKET REDUCER: No action specified!!!');
			break;
	}
	return state;
}

export default basketReducer;

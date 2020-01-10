const basketReducer = (state = {
	basketJpegs: []
},
action) => {
	switch (action.type) {
		case "ADD_BASKET":
			console.log('Adding file to basket: ', action.payload);
			state = {
				...state,
				basketJpegs: [...state.basketJpegs, action.payload]
			};
			console.log('New State: ', state)
			break;

		case "REMOVE_BASKET":
			console.log('Removing item from basket', action.payload);
			state = {
				...state,
				basketJpegs: [...state.basketJpegs.splice(action.payload, 1)]
			}

		default:
			console.log('No action specified');
			break;
	}
	return state;
}

export default basketReducer;

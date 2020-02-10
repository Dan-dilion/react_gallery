const initialState = {
	jpegs: [],
};

const fileReducer = (state = initialState, action) => {
	console.log('FILE REDUCER HERE')
	switch (action.type) {
		case "ADD_JPEGS":
			console.log('Adding Jpeg: ', action.payload);
			state = {
				...state,
				jpegs: [...state.jpegs, ...action.payload]
			};
			console.log('New State: ', state)
			break;

		default:
			console.log('FILE REDUCER: No action specified!!!');
			break;
	}
	return state;
}

export default fileReducer;

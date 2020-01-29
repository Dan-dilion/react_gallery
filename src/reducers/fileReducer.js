const initialState = {
	jpegs: ['Server Not Responding!!!']
};

const fileReducer = (state = initialState, action) => {
	console.log('FILE REDUCER HERE')
	switch (action.type) {
		case "SET_JPEGS":
			console.log('Setting Jpegs: ', action.payload);
			state = {
				...state,
				jpegs: action.payload
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

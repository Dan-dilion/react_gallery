const fileReducer = (state = {
	jpegs: ['nothing1', 'nothing2']
},
action) => {
	console.log('REDUCER HERE')
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
			console.log('No action specified');
			break;
	}
	return state;
}

export default fileReducer;

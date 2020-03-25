const initialState = {
  isFetching: true,
	jpegs: [],
};

const fileReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_JPEGS":
			state = {
				...state,
				jpegs: [...state.jpegs, ...action.payload]
			};
			break;
    case "TOGGLE_FLAG":
      state = {
        ...state,
        isFetching: action.payload
      }

		default:
			console.log('FILE REDUCER: No action specified!!!');
			break;
	}
	return state;
}

export default fileReducer;

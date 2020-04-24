// These are the file reducers. They respond to actions when they are
// dispatched and will change the state accordingly. Each reducer takes the old
// state and creates a new state with the changes in effect. This process
// has to be immutable because of the way React works.

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
      break;

		default:
			console.log('FILE REDUCER: No action specified!!!');
			break;
	}
	return state;
}

export default fileReducer;

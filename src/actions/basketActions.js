// These are the Redux actions for the basket reducer. When dispatched they
// instruct the reducer how to change the Redux state object/store.

export function addBasket(jpeg) {
	return {
		type: "ADD_BASKET",
		payload: jpeg
	};
};

export function addAll(jpegsArray) {
  return{
    type: "ADD_ALL",
    payload: jpegsArray
  }
}

export function emptyBasket() {
  return {
    type: "EMPTY_BASKET",
    payload: null
  };
};

export function removeBasket(index) {
	return {
		type: "REMOVE_BASKET",
		payload: index
	};
};

export function toBeRemoved(index) {
  return {
    type: "TO_BE_REMOVED",
    payload: index
  }
}

export function removeBasketFadeDelay(index) {  // removeBasketFadeDelay() calls the toBeRemoved action
  return dispatch => {                          // first which sets the "toBeRomoved" flag that is used
    dispatch(toBeRemoved(index))                // to trigger the thumbnail fading out. There is then a
    setTimeout( () =>                           // delay while the fade out happens and finally the
      dispatch(removeBasket(index))             // removeBasket() action is called. This action is only
    , 200)                                      // used in basket view – inducing a delay to the
  }                                             // removeBasket() action creates a crash when removing
}                                               // images in single image basket view.


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

export function removeBasketAction(index) {
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

export function removeBasket(index) {           // removeBasket cals the toBeRemoved action
  return dispatch => {                          // first which sets the "toBeRomoved" flag
    dispatch(toBeRemoved(index))                // that is used to trigger the thumbnail
    setTimeout( () =>                           // fading out. There is then a delay while
      dispatch(removeBasketAction(index))       // the fade out happens and finally the
    , 200)                                      // removeBasketAction is called to remove
  }                                             // the image from the basket array
}

export function emptyBasket() {
  return {
    type: "EMPTY_BASKET",
    payload: null
  };
};


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

// If you want to induce the random crash bug just remove this delay.
export function removeBasket(index) {           // I have introduced a tiny delay because
  return dispatch => {                          // the remove button in the single image
    setTimeout( () =>                           // slider was causing a random crash.
      dispatch(removeBasketAction(index))       // This hasn't entirly fixed the problem
    , 10)                                       // but it is considerably more stable!
  }                                             // (I realise this is a hack but i need to
}                                               // get my app online and get a job!)

export function emptyBasket() {
  return {
    type: "EMPTY_BASKET",
    payload: null
  };
};

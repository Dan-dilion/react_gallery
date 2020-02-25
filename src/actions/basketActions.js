
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

export function removeBasket(index) {
	return {
		type: "REMOVE_BASKET",
		payload: index
	};
};

export function emptyBasket() {
  return {
    type: "EMPTY_BASKET",
    payload: null
  };
};

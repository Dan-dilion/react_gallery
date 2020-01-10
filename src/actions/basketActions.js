
export function addBasket(jpeg) {
	return {
		type: "ADD_BASKET",
		payload: jpeg
	};
};

export function removeBasket(index) {
	return {
		type: "REMOVE_BASKET",
		payload: index
	};
};

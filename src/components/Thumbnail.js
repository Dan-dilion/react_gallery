import React from "react";
import { Link } from "react-router-dom";

export const Thumbnail = (props, origin, file, i) => {

	const addButton = (file) => {
		return(
			<button
				className="add-basket standard-button"
				onClick={ () => props.addBasket(file) }
			>Add</button>
		)
	}

	const removeButton = (file) => {
		return(
			<button
				className="remove-basket standard-button"
				onClick={() => props.removeBasket(
					props.getBasket.indexOf(file)
				)}
			>Remove</button>
		)
	}

	const basketButtonPicker = (file) => {
		if (props.getBasket.length >0 && props.getBasket.includes(file)) {
			return removeButton(file)
		} else return addButton(file)
	}

	return (
		<div className={'thumbnail'} key={i}>
			<div className={'thumbnail-inner-container'} key={i}>
				<Link
					to={'./single/'
					+ props.setOrigin(origin)
					+ '/'
					+ file
					}

				><img
					alt={"File not found: " + file}
					className="images"
					key={i}
					src={"./images/resize300/"
						+ file
					}
				/></Link>

			</div>
			{ basketButtonPicker(file) }
		</div>
	);
}

import React from "react";
import { Link } from "react-router-dom";

export const Thumbnail = (props, origin, jpeg, i) => {

	const addButton = (jpeg) => {
		return(
			<button
				className="add-basket standard-button"
				onClick={ () => props.addBasket(jpeg) }
			>Add</button>
		)
	}

	const removeButton = (jpeg) => {
		return(
			<button
				className="remove-basket standard-button"
				onClick={ () => {
					props.removeBasket( props.getBasket.indexOf(jpeg) )
				}}
			>Remove</button>
		)
	}

	const basketButtonPicker = (jpeg) => {
		if (props.getBasket.length >0 && props.getBasket.some( item => item.file == jpeg.file )) {
			return removeButton(jpeg)
		} else return addButton(jpeg)
	}

	return (
		<div className={'thumbnail'} key={i}>
			<div className={'thumbnail-inner-container'} key={i}>
				<Link
					to={'./single/'
					+ jpeg.file
					+ '?origin='
					+ origin
					+ '&index='
					+ jpeg.id}
				><img
					alt={"File not found: " + jpeg.file}
					className="images"
					key={jpeg.id}
					src={"./images/resize300/"
						+ jpeg.file
					}
				/></Link>

			</div>
			{ basketButtonPicker(jpeg) }
		</div>
	);
}

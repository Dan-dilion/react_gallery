import React from "react";

import { Thumbnail } from './Thumbnail.js';
import { resequenceJpegs } from '../utils/utils.js'


export const Basket = (props) => {

	const fullBasket = (jpegs) => {
		return jpegs.map((item, i) => {
			return( Thumbnail(props, item, i) )
		})
	}


	// The imageFail function will be called in the case that
	// getJpegs() returns anything other that an array signifying
	// that there was an error.
	const emptyBasket = (files) => {
		return(
			<div className="empty_phcontainer">
				<div>
					<p>Your basket is empty!</p>
				</div>
			</div>
		)
	}


	let imageComponent = (jpegs) => {
		if (jpegs.length >= 1) {
			return fullBasket(jpegs);
		}
		else {
			return emptyBasket(jpegs);
		}
	}


	return(
		<div className="phcontainer">
			{imageComponent(resequenceJpegs(props.getBasket))}
		</div>
	);
}

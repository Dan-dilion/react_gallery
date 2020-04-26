import React from "react";

import { Thumbnail } from './Thumbnail.js';
import { resequenceJpegs } from '../utils/utils.js'

import '../css/Gallery.css';

export const Basket = (props) => {

// fullBasket() will iterate through each item in 'jpegs' and return the
// thumbnail JSX
	const fullBasket = (jpegs) => {
		return jpegs.map((item, i) => {
			return( Thumbnail(props, item, i) )
		})
	}

// emptyBasket() just displays an empty basket message!
	const emptyBasket = (files) => {
		return(
			<div id="empty_phcontainer">
				<div>
					<p>Your basket is empty!</p>
				</div>
			</div>
		)
	}


	let imageComponent = (jpegs) => {
		if (jpegs.length >= 1) {              // If the basket is not empty
			return fullBasket(jpegs);           // return the fullBasket() method
		}
		else {                                // otherwise the basket must be empty
			return emptyBasket(jpegs);          // so return the emptyBasket() message
		}
	}

// This is the main basket element. It calls imageComponent() and passes it
// the resequenced array of jpegs. It will then return the outcome of the
// fullBasket() method or emptyBasket().
	return(
		<div id="phcontainer">
			{imageComponent(resequenceJpegs(props.getBasket))}
		</div>
	);
}

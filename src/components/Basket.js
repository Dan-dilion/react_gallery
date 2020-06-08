import React from "react";

import { Thumbnail } from './Thumbnail.js';

import '../css/Gallery.css';

export const Basket = (props) => {
console.log(props.getBasket)
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
		return (
      (jpegs.length >= 1)         // If the basket is not empty
        ? fullBasket(jpegs)       // return the fullBasket() method
		    : emptyBasket(jpegs)      // otherwise return the emptyBasket() message
    )
	}

// This is the main basket element. It calls imageComponent() and passes it
// the resequenced array of jpegs. It will then return the outcome of the
// fullBasket() method or emptyBasket().
	return(
		<div id="phcontainer">
			{
        imageComponent(props.getBasket)
      }
		</div>
	);
}

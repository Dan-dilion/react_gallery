import React from "react";
import { Link } from "react-router-dom";

import { Header } from './Header.js';
import { Thumbnail } from './Thumbnail.js';


export const Basket = (props) => {
	const fullBasket = (files) => {
		return files.map((file, i) => {
			return( Thumbnail(props, file, i) )
		})
	}


	// The imageFail function will be called in the case that
	// getJpegs() returns anything other that an array signifying
	// that there was an error.
	const emptyBasket = (files) => {
		return(
			<div className="phcontainer">
				<div>
					<p>Your basket is empty!</p>
				</div>
			</div>
		)
	}


	let imageComponent = (files) => {
		if (files.length >= 1) {
			return fullBasket(files);
		}
		else {
			return emptyBasket(files);
		}
	}


	return(
		<div>
			<Header
				getBasket={props.getBasket}
			/>
			<h3> Download Basket </h3>
			<div className="phcontainer">
				{imageComponent(props.getBasket)}
			</div>
		</div>
	);
}

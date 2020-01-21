import React from "react";
import { Link } from "react-router-dom";

import { Header } from './Header.js';


export const Basket = (props) => {
	const fullBasket = (files) => {
		return (
			<div className="phcontainer">
				{files.map((file, i) => {
					return (
						<div key={i}>
							<Link
								to={'./single/'
								+ file
								+ '?origin=basket'
								+ '&index='
								+ i}
							><img
								alt={"File not found: " + file}
								className="images"
								key={i}
								src={"./images/resize300/"
									+ file
								}
							/></Link>
							<button className="Remove-Basket" onClick={() => props.removeBasket(i)}>Remove</button>
						</div>
					);
				})}
			</div>
		)
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
			<Header basketQuantity={props.getBasket.length} />
			<h3> Download Basket </h3>
			{imageComponent(props.getBasket)}
		</div>
	);
}

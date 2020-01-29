import React from "react";
import { Link } from "react-router-dom";

import { Header } from './Header.js';
import { Thumbnail } from './Thumbnail.js';

export const Gallery = (props) => {

	const imageSuccess = (files) => {
		return files.map((file, i) => {
			return( Thumbnail(props, file, i) )
		})
	}

	// The imageFail function will be called in the case that
	// getJpegs() returns anything other that an array signifying
	// that there was an error.
	const imageFail = (files) => {
		return(
			<div className="phcontainer">
				<div>
					<p>System Message: {files}</p>
				</div>
			</div>
		)
	}

	let imageComponent = (files) => {
		if (Array.isArray(files)) {
			return imageSuccess(files);
		}
		else {
			return imageFail(files);
		}
	}

	return(
		<div>
			<Header
				basketQuantity={props.getBasket.length}
				getJpegs={props.getJpegs}
				addBasket={props.addBasket}
			/>
			<h3> Photography Gallery </h3>
			<div className="phcontainer">
				{imageComponent(props.getJpegs)}
			</div>
		</div>
	);
}

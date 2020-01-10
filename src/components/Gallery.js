import React from "react";
import { Link } from "react-router-dom";

export const Gallery = (props) => {
	console.log('PROPS', props)
	const imageSuccess = (files) => {
		return (
			<div className="phcontainer">
				{files.map((file, i) => {
					return (
						<div key={i}>
							<Link
								to={'./single/'
								+ file
								+ '?index='
								+ i}
							><img
								alt={"File not found: " + file}
								className="images"
								key={i}
								src={"./images/resize300/"
									+ file
								}
							/></Link>
							<button className="add-basket" onClick={() => props.addBasket(file)}>Add To Basket</button>
						</div>
					);
				})}
			</div>
		)
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
			<h3> Gallery Title Here </h3>
				{imageComponent(props.getJpegs)}
			<p>JPEGS: {props.getJpegs}</p>
			<p>BASKET: {props.getBasket}</p>
		</div>
	);
}

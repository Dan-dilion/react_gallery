import React from "react";
import { Link } from "react-router-dom";

export const Basket = (props) => {
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
			<h3> Download Basket </h3>
				{imageComponent(props.getBasket)}
			<p>{props.getBasket}</p>
		</div>
	);
}

import React from "react";

import { Thumbnail } from './Thumbnail.js';

export const Gallery = (props) => {

	const imageSuccess = (jpegs) => {
		return jpegs.map((item, i) => {
			return( Thumbnail(props, item, i) )
		})
	}

	// The imageFail function will be called in the case that
	// getJpegs() returns anything other that an array signifying
	// that there was an error.
	const imageFail = (jpegs) => {
		return(
			<div className="ph_fail_container">
				<div>
					<p>System Message: {jpegs}</p>
				</div>
			</div>
		)
	}

	let imageComponent = (jpegs) => {
		if (Array.isArray(jpegs)) {
			return imageSuccess(jpegs);
		}
		else {
			return imageFail(jpegs);
		}
	}

	return(
		<div className="phcontainer">
			{imageComponent(props.getJpegs)}
		</div>
	);
}

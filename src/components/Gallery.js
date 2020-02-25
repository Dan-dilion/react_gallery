import React from "react";

import { Header } from './Header.js';
import { Thumbnail } from './Thumbnail.js';

export const Gallery = (props) => {

	const imageSuccess = (jpegs) => {
		return jpegs.map((item, i) => {
			return( Thumbnail(props, 'gallery', item, i) )
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
		<div>
			<Header
				getBasket={props.getBasket}
				getJpegs={props.getJpegs}
				addBasket={props.addBasket}
        addAll={props.addAll}
        emptyBasket={props.emptyBasket}
			/>
			<h3 className={'gallery-title'}>  </h3>
			<div className="phcontainer">
				{imageComponent(props.getJpegs)}
			</div>
		</div>
	);
}

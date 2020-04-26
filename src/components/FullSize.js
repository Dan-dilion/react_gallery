import React from "react";

// Just a simple element that displays the full sized image.
export const FullSize = () => {
	return(
		<img
			className="full-size"
			alt={'File not found: ' + window.location.pathname}
			src={'./' + window.location.pathname}
		/>
	)
}

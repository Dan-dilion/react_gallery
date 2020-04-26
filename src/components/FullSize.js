import React from "react";

export const FullSize = (props) => {
	return(
		<img
			className="full-size"
			alt={'File not found: ' + window.location.pathname}
			src={'./' + window.location.pathname}
		/>
	)
}

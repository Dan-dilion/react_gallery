import React from "react";
import { Link } from "react-router-dom";

export const SingleImage = (props) => {
//	const {params} = this.props.match.params;	// Make an object out of the URL perameters
	const urlParams = new URLSearchParams(window.location.search);	// Make an object out of the URL perameters
	let next = {
		file: props.getJpegs[parseInt(urlParams.get('index')) + 1],
		index: parseInt(urlParams.get('index')) + 1
	}

	const prev = {
		file: props.getJpegs[parseInt(urlParams.get('index')) - 1],
		index: parseInt(urlParams.get('index')) - 1
	}

	return(
		<div className="single-container">
			<div>
				<img
					alt={"File Not Found " + urlParams.get('fileName')}
					className="single-image"
					src={
						process.env.PUBLIC_URL
							+ "../images/resize1024/"
							+ urlParams.get('fileName')
					}
				/>

				<a
					className="prev-image"
					href={
						process.env.PUBLIC_URL
							+ '?fileName='
							+ prev.file
							+ '&index='
							+ prev.index
					}


				>Prev</a>

				<a
					className="next-image"
					href={
						process.env.PUBLIC_URL
							+ '?fileName='
							+ next.file
							+ '&index='
							+ next.index
					}

				>Next</a>

			</div>
		</div>



	)

}

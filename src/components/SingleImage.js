import React from "react";
import { Link } from "react-router-dom";

export const SingleImage = (props) => {
	const urlParams = new URLSearchParams(window.location.search);	// Make an object out of the URL perameters

	let currentFile = {
		file: props.getJpegs[parseInt(urlParams.get('index'))],
		index: parseInt(urlParams.get('index'))
	}

	let next = {...currentFile}
	let prev = {...currentFile}

	if (parseInt(urlParams.get('index')) < parseInt(props.getJpegs.length) - 1) {
		next.file = props.getJpegs[parseInt(urlParams.get('index')) + 1];
		next.index ++;
	}

	if (parseInt(urlParams.get('index')) > 0) {
		prev.file = props.getJpegs[parseInt(urlParams.get('index')) - 1];
		prev.index --;
	}

	console.log('FILE NAME: ', urlParams.get('fileName'))

	return(
		<div className="single-container">
			<div>
				<img
					alt={"File Not Found " + props.getJpegs[(parseInt(urlParams.get('index')))]}
					className="single-image"
					src={
						'./images/resize1024/'
						+ props.getJpegs[parseInt(urlParams.get('index'))]
					}
				/>

				<Link
					className="prev-image"
					to={
						'./'
						+ prev.file
						+ '?index='
						+ prev.index
					}
				>Prev</Link>

				<Link
					className="next-image"
					to={
						'./'
						+ next.file
						+ '?index='
						+ next.index
					}
				>Next</Link>
			</div>
		</div>



	)

}

import React from "react";
import { Link } from "react-router-dom";
import path from 'path';

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

	return(
		<div className="single-container">
			<div>
				<img
					alt={"File Not Found " + JSON.stringify(urlParams.get('fileName'))}
					className="single-image"
					src={path.join(
						process.env.PUBLIC_URL,
						'../images/resize1024/',
						urlParams.get('fileName')
					)}
				/>

				<Link
					className="prev-image"
					to={
						process.env.PUBLIC_URL
							+ '?fileName='
							+ prev.file
							+ '&index='
							+ prev.index
					}
				>Prev</Link>

				<Link
					className="next-image"
					to={
						process.env.PUBLIC_URL
							+ '?fileName='
							+ next.file
							+ '&index='
							+ next.index
					}
				>Next</Link>
			</div>
		</div>



	)

}

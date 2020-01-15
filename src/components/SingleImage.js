import React from "react";
import { Link } from "react-router-dom";

export const SingleImage = (props) => {
	const urlParams = new URLSearchParams(window.location.search);	// Make an object out of the URL perameters

	let jpegsOrigin = props.getJpegs;
	if (urlParams.get('origin') == 'basket') { jpegsOrigin = props.getBasket }

	const currentFile = {
		file: jpegsOrigin[parseInt(urlParams.get('index'))],
		index: parseInt(urlParams.get('index'))
	}

	const next = {...currentFile}
	const prev = {...currentFile}

	if (parseInt(urlParams.get('index')) < parseInt(jpegsOrigin.length) - 1) {
		next.file = jpegsOrigin[parseInt(urlParams.get('index')) + 1];
		next.index ++;
	}

	if (parseInt(urlParams.get('index')) > 0) {
		prev.file = jpegsOrigin[parseInt(urlParams.get('index')) - 1];
		prev.index --;
	}

	const addButton = (file) => {
		return(
			<button
				className="add-basket"
				onClick={ () => props.addBasket(file) }
			>Add To Basket</button>
		)
	}

	const removeButton = (file) => {
		return(
			<button
				className="remove-basket"
				onClick={() => props.removeBasket(
					props.getBasket.indexOf(file)
				)}
			>Remove From Basket</button>
		)
	}

	const basketButton = (file) => {
		if (props.getBasket.length >0 && props.getBasket.includes(file)) {
			return removeButton(file)
		} else return addButton(file)
	}


	return(
		<div>
			<h3>{jpegsOrigin[parseInt(urlParams.get('index'))]}</h3>
			<div className="single-container">
				<div>
					<a href={
						'./images/'
						+ jpegsOrigin[parseInt(urlParams.get('index'))]
					}>
						<img
							alt={"File Not Found " + jpegsOrigin[(parseInt(urlParams.get('index')))]}
							className="single-image"
							src={
								'./images/resize1024/'
								+ jpegsOrigin[parseInt(urlParams.get('index'))]
							}
						/>
					</a>

					{basketButton(jpegsOrigin[parseInt(urlParams.get('index'))])}


					<Link
						className="prev-image"
						to={
							'./'
							+ prev.file
							+ '?origin='
							+ urlParams.get('origin')
							+ '&index='
							+ prev.index
						}
					>Prev</Link>

					<Link
						className="next-image"
						to={
							'./'
							+ next.file
							+ '?origin='
							+ urlParams.get('origin')
							+ '&index='
							+ next.index
						}
					>Next</Link>
				</div>
			</div>
		</div>


	)

}

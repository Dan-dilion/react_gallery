import React from "react";
import { Link } from "react-router-dom";

import { Header } from './Header.js';

export const SingleImage = (props) => {
	const urlParams = new URLSearchParams(window.location.search);	// Make an object out of the URL perameters

	let jpegsOrigin = props.getJpegs;
	if (urlParams.get('origin') == 'basket') { jpegsOrigin = props.getBasket }

	const currentFile = {
		file: jpegsOrigin[parseInt(urlParams.get('index'))],
		index: parseInt(urlParams.get('index'))
	}

	const next = {...currentFile}
	if (parseInt(urlParams.get('index')) < parseInt(jpegsOrigin.length) - 1) {
		next.file = jpegsOrigin[parseInt(urlParams.get('index')) + 1];
		next.index ++;
	}

	const prev = {...currentFile}
	if (parseInt(urlParams.get('index')) > 0) {
		prev.file = jpegsOrigin[parseInt(urlParams.get('index')) - 1];
		prev.index --;
	}

	const nextButton = () => {
		if (parseInt(urlParams.get('index')) < parseInt(jpegsOrigin.length) - 1) {
			return (
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
			)
		} else { return ( <a
			className={
				"next-image " +
				"disable-selection"
			}
		>End!</a> )}
	}

	const prevButton = () => {
		if (parseInt(urlParams.get('index')) > 0) {
			return(
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
			)
		} else { return <a
			className={
				"prev-image " +
				"disable-selection"
			}
		>Start!</a>  }

	}

	const addButton = (file) => {
		return(
			<button
				className="add-remove-basket"
				onClick={ () => props.addBasket(file) }
			>Add To Basket</button>
		)
	}

	const removeButton = (file) => {
		if ( jpegsOrigin.length <= 1) {
			return (
				<button
					className="add-remove-basket"
					onClick={() => props.removeBasket(
					props.getBasket.indexOf(file)
				)}>
					<Link to={ '/basket' }>Remove From Basket</Link>
				</button>
			)
		} else if (urlParams.get('origin') == 'basket') {
			return(
				<button className="add-remove-basket"
				onClick={() => props.removeBasket(
					props.getBasket.indexOf(file)
				)}>
				<Link
					to={
						'./'
						+ prev.file
						+ '?origin='
						+ urlParams.get('origin')
						+ '&index='
						+ prev.index
					}
				>Remove From Basket</Link></button>
			)
		} else {
			return (
				<button
					className="add-remove-basket"
					onClick={() => props.removeBasket(
						props.getBasket.indexOf(file)
					)}
				>Remove From Basket</button>
			)
		}
	}

	const basketButton = (file) => {
		if (props.getBasket.length >0 && props.getBasket.includes(file)) {
			return removeButton(file)
		} else return addButton(file)
	}


	return(
		<div>
			<Header basketQuantity={props.getBasket.length} />
			<h3>{jpegsOrigin[parseInt(urlParams.get('index'))]}</h3>
			<div className="single-container">
				<div>
					<Link to={
						'/images/'
						+ jpegsOrigin[parseInt(urlParams.get('index'))]
					} target='_blank'
					><img
						alt={"File Not Found " + jpegsOrigin[(parseInt(urlParams.get('index')))]}
						className="single-image"
						src={
							'./images/resize1024/'
							+ jpegsOrigin[parseInt(urlParams.get('index'))]
						}
					/></Link>

					{basketButton(jpegsOrigin[parseInt(urlParams.get('index'))])}

					{ prevButton() }
					{ nextButton() }
				</div>
			</div>
		</div>


	)

}

import React from "react";
import { Link } from "react-router-dom";

import { Header } from './Header.js';
import { Slider } from './Slider.js';

export const SingleImage = (props) => {
	const urlParams = new URLSearchParams(window.location.search);	// Make an object out of the URL perameters

	let jpegsOrigin = props.getJpegs;
	if (urlParams.get('origin') === 'basket') { jpegsOrigin = props.getBasket }

	const currentFile = {
		file: jpegsOrigin[parseInt(urlParams.get('index'))].file,
		index: parseInt(urlParams.get('index'))
	}

	const next = {...currentFile}
	if (parseInt(urlParams.get('index')) < parseInt(jpegsOrigin.length) - 1) {
		next.file = jpegsOrigin[parseInt(urlParams.get('index')) + 1].file;
		next.index ++;
	}

	const prev = {...currentFile}
	if (parseInt(urlParams.get('index')) > 0) {
		prev.file = jpegsOrigin[parseInt(urlParams.get('index')) - 1].file;
		prev.index --;
	}

	const nextButton = () => {
		if (parseInt(urlParams.get('index')) < parseInt(jpegsOrigin.length) - 1) {
			return (
				<Link
					className="next-image disable-selection"
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
		} else { return(
			<div
				className={
					"next-image " +
					"disable-selection"
				}
			>End!</div>
		)}
	}

	const prevButton = () => {
		if (parseInt(urlParams.get('index')) > 0) {
			return(
				<Link
					className="prev-image disable-selection"
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
		} else { return <div
			className={
				"prev-image " +
				"disable-selection"
			}
		>Start!</div>  }

	}

	const addButton = (file) => {
		return(
			<button
				className="add-remove-basket standard-button disable-selection"
				onClick={ () => props.addBasket(file) }
			>Add To Basket</button>
		)
	}

	const removeButton = (file) => {
		if ( jpegsOrigin.length <= 1) {
			return (
				<button
					className="add-remove-basket standard-button disable-selection"
					onClick={() => props.removeBasket(
					props.getBasket.indexOf(file)
				)}>
					<Link to={ '/basket' }>Remove From Basket</Link>
				</button>
			)
		} else if (urlParams.get('origin') === 'basket') {
			return(
				<button className="add-remove-basket standard-button disable-selection"
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
					className="add-remove-basket standard-button disable-selection"
					onClick={() => props.removeBasket(
						props.getBasket.indexOf(file)
					)}
				>Remove From Basket</button>
			)
		}
	}

	const basketButton = (file) => {
		if (props.getBasket.length >0 && props.getBasket.some(item => item.file == file)) {
			return removeButton(file)
		} else return addButton(file)
	}


	return(
		<div>
			<Header getBasket={props.getBasket} />
			<h3>{decodeURIComponent(jpegsOrigin[parseInt(urlParams.get('index'))].file)}</h3>
			<div className="single-wrapper">
				<div className={'image-container'}>
					<Link
						to={
							'/images/'
							+ jpegsOrigin[parseInt(urlParams.get('index'))].file
						}
						target='_blank'
					>
						{Slider(parseInt(urlParams.get('index')), jpegsOrigin, props)}
					</Link>

					{basketButton(jpegsOrigin[parseInt(urlParams.get('index'))].file)}
				</div>
				<div className={'next-prev-container'}>
					{ prevButton() }
					{ nextButton() }
				</div>
			</div>
		</div>


	)

}

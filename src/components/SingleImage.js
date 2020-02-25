import React from "react";
import { Link } from "react-router-dom";

import { Slider } from './Slider.js';

export const SingleImage = (props) => {

	const urlParams = new URLSearchParams(window.location.search);	// Make an object out of the URL perameters
	let jpegsOrigin = props.getJpegs;
	if (urlParams.get('origin') === 'basket') { jpegsOrigin = props.getBasket }

	const currentJpegItem = {
		jpegItem: jpegsOrigin[parseInt(urlParams.get('index'))],
		index: parseInt(urlParams.get('index'))
	}

	const next = {...currentJpegItem}
	if (parseInt(urlParams.get('index')) < parseInt(jpegsOrigin.length) - 1) {
		next.jpegItem = jpegsOrigin[parseInt(urlParams.get('index')) + 1];
		next.index ++;
	}

	const prev = {...currentJpegItem}
	if (parseInt(urlParams.get('index')) > 0) {
		prev.jpegItem = jpegsOrigin[parseInt(urlParams.get('index')) - 1];
		prev.index --;
	}

	const nextButton = () => {
		if (parseInt(urlParams.get('index')) < parseInt(jpegsOrigin.length) - 1) {
			return (
				<Link
					className="next-image disable-selection"
					to={
						'./'
						+ next.jpegItem
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
						+ prev.jpegItem
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

	const addButton = (jpegItem) => {
		return(
			<button
				className="add-remove-basket standard-button disable-selection"
				onClick={ () => props.addBasket(jpegItem) }
			>Add To Basket</button>
		)
	}

	const removeButton = (jpegItem) => {
		if ( jpegsOrigin.length <= 1) {
			return (
				<button
					className="add-remove-basket standard-button disable-selection"
					onClick={() => props.removeBasket(
					props.getBasket.indexOf(jpegItem)
				)}>
					<Link to={ '/basket' }>Remove From Basket</Link>
				</button>
			)
		} else if (urlParams.get('origin') === 'basket') {
			return(
				<button className="add-remove-basket standard-button disable-selection"
				onClick={() => props.removeBasket(
					props.getBasket.indexOf(jpegItem)
				)}>
				<Link
					to={
						'./'
						+ prev.jpegItem
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
						props.getBasket.indexOf(jpegItem)
					)}
				>Remove From Basket</button>
			)
		}
	}

	const basketButton = (jpegItem) => {
		if (props.getBasket.length >0 && props.getBasket.some(item => item.file == jpegItem.file)) {
			return removeButton(jpegItem)
		} else return addButton(jpegItem)
	}


	return(

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

					{basketButton(jpegsOrigin[parseInt(urlParams.get('index'))])}
				</div>
				<div className={'next-prev-container'}>
					{ prevButton() }
					{ nextButton() }
				</div>
			</div>


	)

}

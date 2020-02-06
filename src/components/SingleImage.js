import React, { useState } from 'react';
import { Link } from "react-router-dom";

import { Header } from './Header.js';

import '../css/SingleImage.css';

export const SingleImage = (props) => {

	const urlParams = new URLSearchParams(window.location.search);	// Make an object out of the URL perameters

	const urlSplits = window.location.href.split('/');
	const origin = urlSplits[urlSplits.length -2];
	let file = urlSplits[urlSplits.length -1];



	let jpegsSource;
	if (origin === 'gallery') { jpegsSource = [...props.getJpegs] };
	if (origin === 'basket') { jpegsSource = [...props.getBasket] }

	console.log('ORIGIN: ', origin + ' File: ', file + ' Index: ', jpegsSource.indexOf(file));


	let [index, setIndex] = useState(parseInt(jpegsSource.indexOf(file)));		// React Hook
	const item = `../images/resize1024/${jpegsSource[index]}`;
	console.log('INDEX: ', index)

	const nextButton = () => {
		if (index < jpegsSource.length -1) {
			return (
				<button
					className="next-image disable-selection"
					onClick={ () => {
						setIndex(index += 1);
					}}
				/>
			)
		}
	}

	const prevButton = () => {
		if (index > 0) {
			return (
				<button
					className="prev-image disable-selection"
					onClick={() => {
						setIndex(index -= 1);
					}}
				/>
			)
		}
	}

	const addButton = (imageFile) => {
		return(
			<button
				className="add-remove-basket standard-button disable-selection"
				onClick={ () => props.addBasket(imageFile) }
			>Add To Basket</button>
		)
	}

	const removeButton = (imageFile) => {
		if (props.getBasket.length <= 1 && origin == 'basket') {		// If only 1 item in basket ond viewing basket contents
			return (
				<Link to={ '/basket' }>
					<button
						className="add-remove-basket standard-button disable-selection"
						onClick={
							() => props.removeBasket(props.getBasket.indexOf(imageFile))
						}
					>Remove From Basket</button>
				</Link>
			)
		} else if (index == props.getBasket.length -1) {	// If item is at the end of the basket
			return (
				<button
					className="add-remove-basket standard-button disable-selection"
					onClick={ () => {
						setIndex(index -= 1)
						props.removeBasket(props.getBasket.indexOf(imageFile))
					}}
				>Remove From Basket</button>
			)
		} else {
			return(
				<button
					className="add-remove-basket standard-button disable-selection"
					onClick={
						() => props.removeBasket(props.getBasket.indexOf(imageFile))
					}
				>Remove From Basket</button>
			)
		}
	}


	const basketButton = (imageFile) => {
		if (props.getBasket.includes(imageFile)) return removeButton(imageFile);
		else return addButton(imageFile);
	}


	return(
		<div>
			<Header getBasket={props.getBasket} />
			<h3>{jpegsSource[index]}</h3>
			<div
			 	key={index}
				className="single-wrapper"
			>
			<img
				alt={"File Not Found " + item}
				className="single-image"
				src={`../images/resize1024/${jpegsSource[index]}`}
			/>

			{basketButton(jpegsSource[index])}

			</div>
			<div className={'next-prev-container'}>
				{ prevButton() }
				{ nextButton() }
			</div>
		</div>

	)

}

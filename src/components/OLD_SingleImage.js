import React, { useState } from 'react'
import { Link } from "react-router-dom";
import clamp from 'lodash-es/clamp'
import { useTransition, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'

import { Header } from './Header.js';

import '../css/SingleImage.css';

export const SingleImage = (props) => {


	const urlParams = new URLSearchParams(window.location.search);	// Make an object out of the URL perameters

	let jpegsOrigin = props.getJpegs;
	if (urlParams.get('origin') === 'basket') { jpegsOrigin = props.getBasket }

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

	const [index, setIndex] = useState(urlParams.get('index'));

	const item = `../images/resize1024/${jpegsOrigin[index]}`


	// const nextButton = () => {
	// 	if (parseInt(urlParams.get('index')) < parseInt(jpegsOrigin.length) - 1) {
	// 		return (
	// 			<Link
	// 				className="next-image disable-selection"
	// 				to={
	// 					'./'
	// 					+ next.file
	// 					+ '?origin='
	// 					+ urlParams.get('origin')
	// 					+ '&index='
	// 					+ next.index
	// 				}
	// 			>Next</Link>
	// 		)
	// 	} else { return(
	// 		<div
	// 			className={
	// 				"next-image " +
	// 				"disable-selection"
	// 			}
	// 		>End!</div>
	// 	)}
	// }

	const nextButton = () => {
		return (
			<button
				className="next-image disable-selection"
				onClick={ () => setIndex(index + 1) }
			/>
		)
	}

	// const prevButton = () => {
	// 	if (parseInt(urlParams.get('index')) > 0) {
	// 		return(
	// 			<Link
	// 				className="prev-image disable-selection"
	// 				to={
	// 					'./'
	// 					+ prev.file
	// 					+ '?origin='
	// 					+ urlParams.get('origin')
	// 					+ '&index='
	// 					+ prev.index
	// 				}
	// 			>Prev</Link>
	// 		)
	// 	} else { return <div
	// 		className={
	// 			"prev-image " +
	// 			"disable-selection"
	// 		}
	// 	>Start!</div>  }
	//
	// }

	const prevButton = () => {
		return (
			<button
				className="prev-image disable-selection"
				onClick={() => {
					setIndex(index - 1)
					window.location.params = ``
				}}
			/>
		)
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
				<Link to={ '/basket' }>
					<button
						className="add-remove-basket standard-button disable-selection"
						onClick={
							() => props.removeBasket(props.getBasket.indexOf(file))
						}
					>Remove From Basket</button>
				</Link>
			)
		} else if (urlParams.get('origin') === 'basket') {
			return(
				<Link
					to={
						'./'
						+ prev.file
						+ '?origin='
						+ urlParams.get('origin')
						+ '&index='
						+ prev.index
					}
				><button
					className="add-remove-basket standard-button disable-selection"
					onClick={
						() => props.removeBasket(props.getBasket.indexOf(file))
					}
				>Remove From Basket</button></Link>
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
		if (props.getBasket.length >0 && props.getBasket.includes(file)) {
			return removeButton(file)
		} else return addButton(file)
	}



	return(
		<div>
			<Header getBasket={props.getBasket} />
			<h3>{jpegsOrigin[parseInt(urlParams.get('index'))]}</h3>
			<div
			 	key={index}
				className="single-wrapper"
			>
			<img
				alt={"File Not Found " + item}
				className="single-image"
				src={item}
			/>


				{basketButton(jpegsOrigin[parseInt(urlParams.get('index'))])}
			</div>
			<div className={'next-prev-container'}>
				{ prevButton() }
				{ nextButton() }
			</div>
		</div>

	)





	// return(
	// 	<div>
	// 		<Header getBasket={props.getBasket} />
	// 		<h3>{jpegsOrigin[parseInt(urlParams.get('index'))]}</h3>
	// 		<div className="single-wrapper">
	// 			<div className={'image-container'}>
	// 				<Link to={
	// 					'/images/'
	// 					+ jpegsOrigin[parseInt(urlParams.get('index'))]
	// 				} target='_blank'
	// 				><img
	// 					alt={"File Not Found " + jpegsOrigin[(parseInt(urlParams.get('index')))]}
	// 					className="single-image"
	// 					src={
	// 						'./images/resize1024/'
	// 						+ jpegsOrigin[parseInt(urlParams.get('index'))]
	// 					}
	// 				/></Link>
	// 				{basketButton(jpegsOrigin[parseInt(urlParams.get('index'))])}
	// 			</div>
	// 			<div className={'next-prev-container'}>
	// 				{ prevButton() }
	// 				{ nextButton() }
	// 			</div>
	// 		</div>
	// 	</div>
	//
	//
	// )

}

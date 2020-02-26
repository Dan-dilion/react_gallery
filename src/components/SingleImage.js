import React from "react";
import { Link } from "react-router-dom";

import { Slider } from './Slider.js';

export const SingleImage = (props) => {

  const urlFilename = () => {
    let pathNames = window.location.pathname.split('/')
    return pathNames[pathNames.length - 1];
  }

	let jpegsArray = props.getJpegs;
	if (props.selectedPage === 'basket') { jpegsArray = props.getBasket }
  

	const currentJpegItem = {
		jpegItem: jpegsArray.find( item => item.file === urlFilename()),
		index: jpegsArray.findIndex( item => item.file === urlFilename())
	}

	const next = {...currentJpegItem}
	if (currentJpegItem.index < jpegsArray.length - 1) {
		next.jpegItem = jpegsArray[currentJpegItem.index + 1];
		next.index ++;
	}

	const prev = {...currentJpegItem}
	if (currentJpegItem.index > 0) {
		prev.jpegItem = jpegsArray[currentJpegItem.index - 1];
		prev.index --;
	}

  console.log('Current: ', currentJpegItem)
  console.log('Next: ', next)
  console.log('Prev: ', prev)
  console.log('PathNames ', window.location.pathname)
  console.log('Array', props.getJpegs)

	const nextButton = () => {
		if (currentJpegItem.index < jpegsArray.length - 1) {
			return (
				<Link
					className="next-image disable-selection"
					to={ './' + next.jpegItem.file }
				>Next</Link>
			)
		}
	}

	const prevButton = () => {
		if (currentJpegItem.index > 0) {
			return(
				<Link
					className="prev-image disable-selection"
					to={ './' + prev.jpegItem.file }
				>Prev</Link>
			)
		}
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
		if ( jpegsArray.length <= 1) {
			return (
				<button
					className="add-remove-basket standard-button disable-selection"
					onClick={() => props.removeBasket(
					props.getBasket.indexOf(jpegItem)
				)}>
					<Link to={ '/basket' }>Remove From Basket</Link>
				</button>
			)
		} else if (props.selectedPage === 'basket') {
			return(
				<button className="add-remove-basket standard-button disable-selection"
				onClick={() => props.removeBasket(
					props.getBasket.indexOf(jpegItem)
				)}>
				<Link
					to={ './' + prev.jpegItem.file }
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

	const basketButtonPicker = (jpegItem) => {
		if (
      props.getBasket.length > 0
      && props.getBasket.some(item => item.file === jpegItem.file)
    ) return removeButton(jpegItem)
		else return addButton(jpegItem)
	}


	return(
		<div className="single-wrapper">
			<div className={'image-container'}>
				<Link
					to={ '/images/' + currentJpegItem.jpegItem.file }
					target='_blank'
				>
					{ Slider(currentJpegItem.index, jpegsArray, props) }
        </Link>
				{ basketButtonPicker(jpegsArray[currentJpegItem.index]) }
			</div>

			<div className={'next-prev-container'}>
				{ prevButton() }
				{ nextButton() }
			</div>
		</div>
	)
}

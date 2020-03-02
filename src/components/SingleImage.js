import React from "react";
import { Link } from "react-router-dom";

import { getJpegs } from '../utils/serverRequest.js'

import { Slider } from './Slider.js';

export const SingleImage = (props) => {

console.log('Length: ', props.getJpegs.length)
  if (props.getJpegs.length <= 0) props.refreshJpegs()    // If you arrived here from a link getJpegs will be empty so call refresh()

  let jpegsArray = props.getJpegs;                                              // jpegsArray to point to the Redux store jpegs
  if (props.selectedPage === 'basket') { jpegsArray = props.getBasket }         // If you arived here from the basket make jpegsArray will be the basket

  const urlFilename = () => {                                                   // get filename from URL:
    let pathNames = window.location.pathname.split('/')                         // Split path at '/' and make items in to an array
    return decodeURIComponent(pathNames[pathNames.length - 1]);                 // return the last in the array (will be the file name) and parse it for escape chars
  }

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

  const removeButton = (jpegItem, buttonType) => {
    const link = (button) => {
      switch (button) {
        case 'lastInBasket':
          return(<Link to={ '/basket' }>Remove From Basket</Link>)
        case 'firstInBasket':
          return(<Link to={ './' + next.jpegItem.file }>Remove From Basket</Link>)
        case 'normalBasket':
          return(<Link to={ './' + prev.jpegItem.file }>Remove From Basket</Link>)
        case 'gallery':
          return('Remove From Basket')
        default: break;
      }
    }

    return(
      <button
				className="add-remove-basket standard-button disable-selection"
				onClick={() => props.removeBasket(
				props.getBasket.indexOf(jpegItem)
			)}>
        {link(buttonType)}
      </button>
    )
  }

  const addRemoveButtonSelecter = (jpegItem) => {
    if (
      props.getBasket.length > 0
      && props.getBasket.some(item => item.file === jpegItem.file)
    ) {
      if (props.selectedPage === 'basket') {
        if ( jpegsArray.length <= 1) return removeButton(jpegItem, 'lastInBasket')
        else if ( jpegsArray.indexOf(jpegItem) === 0) return removeButton(jpegItem, 'firstInBasket')
        else return removeButton(jpegItem, 'normalBasket')
      }
      else return removeButton(jpegItem, 'gallery')
    }
    else return addButton(jpegItem)
  }

// This is a conditional return statement, it will wait for jpegsArray to be
// refreshed before it tries to render anything. Otherwise, if you arrive here
// from a link, jpegsArray will be empty and the async refresh method will be
// triggered after the component is rendered causing a crash!
	return( jpegsArray.length ?
		<div className="single-wrapper">
			<div className={'image-container'}>
				<Link
					to={ '/images/' + currentJpegItem.jpegItem.file }
					target='_blank'
				>
					{ Slider(currentJpegItem.index, jpegsArray, props) }
        </Link>
				{ addRemoveButtonSelecter(jpegsArray[currentJpegItem.index]) }
			</div>

			<div className={'next-prev-container'}>
				{ prevButton() }
				{ nextButton() }
			</div>
		</div> : <div><h2>Waiting for refresh</h2></div>
	)
}

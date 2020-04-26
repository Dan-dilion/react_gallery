import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getJpegs } from '../utils/serverRequest.js'

import { Slider } from './Slider.js';

export const SingleImage = (props) => {

console.log('Length: ', props.getJpegs.length)
  if (!props.getJpegs.length) props.refreshJpegs()    // If you arrived here from a link getJpegs will be empty so call refresh()

  let jpegsArray = props.getJpegs;                                              // jpegsArray to point to the Redux store jpegs
  if (props.selectedPage === 'basket') { jpegsArray = props.getBasket }         // If you arived here from the basket make jpegsArray will be the basket

  const urlFilename = () => {                                                   // get filename from URL:
    let pathNames = window.location.pathname.split('/')                         // Split path at '/' and make items in to an array
    return decodeURIComponent(pathNames[pathNames.length - 1]);                 // return the last in the array (will be the file name) and parse it for escape chars
  }

  console.log('URL Filename: ', urlFilename())
  console.log('Jpegs Array: ', jpegsArray.find( item => item.file === urlFilename()) )

  const currentJpegItem = {
    jpegItem: jpegsArray.find( item => item.file === urlFilename()),
    index: jpegsArray.findIndex( item => item.file === urlFilename())
  }

  let prev = {...currentJpegItem}
  if (currentJpegItem.index > 0) {
    prev = {
      jpegItem: jpegsArray[currentJpegItem.index - 1],
		  index: currentJpegItem.index - 1
    }
  }

  let next = {...currentJpegItem}
  if (currentJpegItem.index > 0) {
    next = {
      jpegItem: jpegsArray[currentJpegItem.index + 1],
		  index: currentJpegItem.index + 1
    }
  }

  // const [next, setNext] = useState(...currentJpegItem)
  // const [prev, setPrev] = useState(...currentJpegItem)
  // //let next = {...currentJpegItem}
  // //let prev = {...currentJpegItem}
  //
  //
  // useEffect( () => {
  //
  // 	if (currentJpegItem.index < jpegsArray.length - 1) {
  // 		setNext( next = {
  //       jpegItem: jpegsArray[currentJpegItem.index + 1],
	// 	    index: currentJpegItem.index + 1
  //     })
  // 	}
  //
  // 	if (currentJpegItem.index > 0) {
  // 		setPrev( prev = {
  //       jpegItem: jpegsArray[currentJpegItem.index - 1],
  // 		  index: currentJpegItem.index - 1
  //     })
  //    }
  // }, [])

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
          return(<Link to={ '/basket' }>Remove From Basket LAST</Link>)
        case 'firstInBasket':
          return(<Link to={ './' + next.jpegItem.file }>Remove From Basket FIRST</Link>)
        case 'normalBasket':
          return(<Link to={ './' + prev.jpegItem.file }>Remove From Basket NORM</Link>)
        case 'gallery':
          return('Remove From Basket GALL')
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

  console.log('URL fileName: ', urlFilename())
  console.log('prev.jpegItem: ', prev.jpegItem)
  console.log('currentJpegItem.jpegItem: ', currentJpegItem.jpegItem)
  console.log('current index: ', props.getBasket.indexOf(currentJpegItem.jpegItem))
  console.log('next.jpegItem: ', next.jpegItem)
// This is a conditional return statement, it will wait for jpegsArray to be
// refreshed before it tries to render anything. Otherwise, if you arrive here
// from a link, jpegsArray will be empty and the async refresh method will be
// triggered after the component is rendered causing a crash!
	return( currentJpegItem.jpegItem && next.jpegItem && prev.jpegItem ?
		<div className="single-wrapper">
			<div className={'image-container'}>
				<Link
					to={ '/images/' + currentJpegItem.jpegItem.file }
					target='_blank'
				>
					{ Slider(currentJpegItem.index, jpegsArray, props) }
        </Link>
				{ addRemoveButtonSelecter(currentJpegItem.jpegItem) }
			</div>

			<div className={'next-prev-container'}>
				{ prevButton() }
				{ nextButton() }
			</div>
		</div> : <div><h2>Waiting for refresh</h2></div>
	)
}

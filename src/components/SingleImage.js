import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { getJpegs } from '../utils/serverRequest.js'

import { Slider } from './Slider.js';

export const SingleImage = (props) => {

  const jpegsRefresher = async () => { await props.refreshJpegs() }
  if (!props.getJpegs.length) { jpegsRefresher()    // If you arrived here from a link getJpegs will be empty so call refresh()
    console.log('Jpegs Refreshed!')
  }

  // let jpegsArray = [];
  //
  // useEffect(  () => {
  //   const jpegsRefresher = async () => { await props.refreshJpegs() }
  //   jpegsRefresher()
  //
  //   jpegsArray = props.getJpegs
  //   if (props.selectedPage === 'basket') { jpegsArray = props.getBasket }
  //   console.log('Re-rendering! ', jpegsArray)
  // })

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

  const prev = {...currentJpegItem}
	if (currentJpegItem.index > 0) {
		prev.jpegItem = jpegsArray[currentJpegItem.index - 1];
		prev.index --;
	}

  const next = {...currentJpegItem}
	if (currentJpegItem.index < jpegsArray.length - 1) {
		next.jpegItem = jpegsArray[currentJpegItem.index + 1];
		next.index ++;
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
		if (currentJpegItem.index < jpegsArray.length - 1) {      // if not the last
			return (
				<Link
					className="next-image disable-selection"
					to={ './' + next.jpegItem.file }
				>Next</Link>
			)
		}
	}

	const prevButton = () => {
		if (currentJpegItem.index > 0) {                          // if not the first
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
				onClick={() => props.removeBasket(props.getBasket.indexOf(jpegItem))}
      >
        {/*Remove From Basket TEST*/}
        {link(buttonType)}
      </button>
    )
  }

  const addRemoveButtonSelecter = (jpegItem) => {
    if (
      props.getBasket.length > 0                         // if the basket is not empty
      && props.getBasket.some(item => item.file === jpegItem.file)        // and the item is in the basket
    ) {
      if (props.selectedPage === 'basket') {                                                  // if we are browsing the basket
        if ( jpegsArray.length <= 1) return removeButton(jpegItem, 'lastInBasket')                      // if we are on the last item in the basket
        else if ( jpegsArray.indexOf(jpegItem) === 0) return removeButton(jpegItem, 'firstInBasket')    // if we are on the first item in the basket
        else return removeButton(jpegItem, 'normalBasket')                                    // otherwise we're in the middle of the basket
      }
      else return removeButton(jpegItem, 'gallery')                       // otherwise we're browsing the Gallery
    }
    else return addButton(jpegItem)                      // otherwise the basket is empty
  }

  console.log('Get Jpegs length: ', props.getJpegs.length)
  console.log('Get Basket length: ', props.getBasket.length)
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

SingleImage.propTypes = {
  selectedPage: PropTypes.string,
  getJpegs: PropTypes.array,
  getBasket: PropTypes.array,
  addBasket: PropTypes.func,
  removeBasket: PropTypes.func,
  refreshJpegs: PropTypes.func
}

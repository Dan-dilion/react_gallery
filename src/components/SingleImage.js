import '../css/SingleImage.css';

import React, { useEffect, useState } from "react";
//import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import { getJpegs } from '../utils/serverRequest.js'

import { Slider } from './Slider.js';

export const SingleImage = (props) => {

  const jpegsRefresher = async () => { await props.refreshJpegs() }
  if (!props.getJpegs.length) { jpegsRefresher()    // If you arrived here from a link getJpegs will be empty so call refresh()
    console.log('Jpegs Refreshed!')
  }

  let jpegsArray = props.getJpegs;                                              // jpegsArray to point to the Redux store jpegs
  if (props.selectedPage === 'basket') jpegsArray = props.getBasket             // If you arived here from the basket jpegsArray will be the basket

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

  const prev = {currentJpegItem}
	if (currentJpegItem.index > 0) {
		prev.jpegItem = jpegsArray[currentJpegItem.index - 1];
		prev.index --;
	}

  const next = {currentJpegItem}
	if (currentJpegItem.index < jpegsArray.length - 1) {
		next.jpegItem = jpegsArray[currentJpegItem.index + 1];
		next.index ++;
	}

  const exitButton = () => {
    return(<Link className="exit-button top-buttons" to={ '/' + props.selectedPage } />)
  }

	const nextButton = () => {
		if (currentJpegItem.index < jpegsArray.length - 1) {      // if not the last
			return (
				<Link
					className="next-image disable-selection next-prev-button"
					to={ './' + next.jpegItem.file }
				/>
			)
		}
	}

	const prevButton = () => {
		if (currentJpegItem.index > 0) {                          // if not the first
			return(
				<Link
					className="prev-image disable-selection next-prev-button"
					to={ './' + prev.jpegItem.file }
				/>
			)
		} else return(<div className="next-prev-button"/>)
	}

	const addButton = (jpegItem) => {
		return(
			<button
				className="add-button top-buttons"
				onClick={ () => props.addBasket(jpegItem) }
			/>
		)
	}

  const removeButtonDispenser = (jpegItem, buttonType) => {
    switch (buttonType) {

                // If last image in basket link back to
                // basket view after image is removed
      case 'lastInBasket':
        return(<Link
          className="top-buttons remove-button"
          to={ '/basket' }
          onClick={() => {
            props.removeBasket(props.getBasket.indexOf(jpegItem))
          }}
        />); break;

                // If at the beginning of the basket slide
                // to next after image is removed
      case 'beginningOfBasket':
        return(<Link
          className="top-buttons remove-button"
          to={ './' + next.jpegItem.file }
          onClick={() => {
            props.removeBasket(props.getBasket.indexOf(jpegItem))
          }}
        />); break;

                // If in the middle of the basket array
                // slide to previous after image is removed
      case 'normalBasket':
        return(<Link
          className="top-buttons remove-button"
          to={ './' + prev.jpegItem.file }
          onClick={() => {
            props.removeBasket(props.getBasket.indexOf(jpegItem))
          }}
        />); break;

                // If viewing the gallery just remove image
      case 'gallery':
        return(
          <button
            className="top-buttons remove-button"
    				onClick={() => {
              props.removeBasket(props.getBasket.indexOf(jpegItem))
            }}
          />
        ); break;

      default: break;
    }
  }

  const addRemoveButtonSelector = (jpegItem) => {
    if (
      props.getBasket.length > 0                // if the basket is not empty
      && props.getBasket.some(
        item => item.file === jpegItem.file     // and the item is in the basket
      )
    ) {
      if (props.selectedPage === 'basket') {             // if we are viewing the basket contents
        if (props.getBasket.length <= 1)                            // if we are viewing the only item in the basket
          return removeButtonDispenser(jpegItem, 'lastInBasket')
        else if ( props.getBasket.indexOf(jpegItem) === 0)              // if we are viewing the first item in the basket
          return removeButtonDispenser(jpegItem, 'beginningOfBasket')
        else return removeButtonDispenser(jpegItem, 'normalBasket')     // otherwise we're in the middle of the basket
      }
      else return removeButtonDispenser(jpegItem, 'gallery')       // otherwise we're browsing the Gallery
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
	return( !props.isFetchingJpegs && currentJpegItem.jpegItem ?
		<div className="single-wrapper">
				<Link
					to={ '/images/' + currentJpegItem.jpegItem.file }
					target='_blank'
				>
					{ Slider(currentJpegItem.index, jpegsArray, props) }
        </Link>
        <div className="top-buttons-container">
          { exitButton() }
          { addRemoveButtonSelector(currentJpegItem.jpegItem) }
        </div>
        <div className="next-prev-container">
          { prevButton() }
          { nextButton() }
        </div>

		</div> : <div><h2>Waiting for refresh</h2></div>
	)
}

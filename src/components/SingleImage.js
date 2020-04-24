import React from "react";
import { Link } from "react-router-dom";

import { Slider } from './Slider.js';

import '../css/SingleImage.css';

export const SingleImage = (props) => {

  if (!props.getJpegs.length) props.refreshJpegs()    // If you arrived here from a link props.getJpegs will be blank so call refresh()

  let jpegsArray = props.getJpegs;                                              // jpegsArray to point to the Redux store jpegs
  if (props.selectedPage === 'basket') jpegsArray = props.getBasket             // If you arived here from the basket jpegsArray will be the basket

  const urlFilename = () => {                                                   // get filename from URL:
    let pathNames = window.location.pathname.split('/')                         // Split path at '/' and make all segments in to an array
    return decodeURIComponent(pathNames[pathNames.length - 1]);                 // return the last in the array (will be the file name) and
  }                                                                             // parse it for escape chars

  const currentJpegItem = {                                                     // Set up the currentJpegItem pointer
    jpegItem: jpegsArray.find( item => item.file === urlFilename()),            // Retrieves the filename for the current item from the URL
    index: jpegsArray.findIndex( item => item.file === urlFilename())           // Looks up the index for the current item
  }

  const prev = {currentJpegItem}                                                // Set up the previous item pointer for the prev button
	if (currentJpegItem.index > 0) {                                              // If not the first item in the array
		prev.jpegItem = jpegsArray[currentJpegItem.index - 1];                      // target the previous item in the array
		prev.index --;                                                              // set the index
	}

  const next = {currentJpegItem}                                                // Set up the next item pointer for the next button
	if (currentJpegItem.index < jpegsArray.length - 1) {                          // if not the last item in the array
		next.jpegItem = jpegsArray[currentJpegItem.index + 1];                      // Target the next item in the array
		next.index ++;                                                              // set the index
	}

// exitButton() - A simple React link to either the gallery or the basket depending on which one is selected
  const exitButton = () => {
    return(<Link className="exit-button top-buttons" to={ '/' + props.selectedPage } />)
  }

// nextButton() - Links to the next pointer object defined earlier
// Return is conditional/turnery - If its the last image in the array return a disfunctional button
	const nextButton = () => {
		return ( (currentJpegItem.index < jpegsArray.length - 1) ?
			<Link
				className="next-image next-prev-button"
				to={ './' + next.jpegItem.file }
			/> :
      <div className="next-image no-highlight next-prev-button" />
		)
	}

// prevButton() - Links to the previous pointer object
// Return is conditional/turnery - If its the first in the array return dysfunctional button
	const prevButton = () => {
		return( (currentJpegItem.index > 0) ?
			<Link
				className="prev-image disable-selection next-prev-button"
				to={ './' + prev.jpegItem.file }
			/> :
      <div className="prev-image no-highlight next-prev-button" />
		)
	}

// addRemoveButtonDispenser() - chooses which of the four remove button variants to use or it returns addButton()
  const addRemoveButtonDispenser = (currentItem) => {

// removeGallery() - If viewing the gallery remove button will just
// remove image from basket
    const removeGallery = (currentItem) => {
      return(
        <button
          className="top-buttons remove-button"
  				onClick={() => {
            props.toggleIsFetching(true);
            props.removeBasket(currentItem.index)
            props.toggleIsFetching(false);
          }}
        />
      );
    }

// lastInBasket() - If last image in basket link back to
// basket view after image is removed
    const removeLastInBasket = (currentItem) => {
      return(<Link
        className="top-buttons remove-button"
        to={ '/basket' }
        onClick={() => {
          props.toggleIsFetching(true);
          props.removeBasket(currentItem.index)
          props.toggleIsFetching(false);
        }}
      />);
    }

// If at the beginning of the basket slide to next after image is removed
    const removeBeginningOfBasket = (currentItem) => {
      return(!props.isFetching ?
        <Link
          className="top-buttons remove-button"
          to={ './' + next.jpegItem.file }
          onClick={async () => {
            props.toggleIsFetching(true);
            props.removeBasket(currentItem.index);
            props.toggleIsFetching(false);
          }}
        /> :
        <div className="top-buttons add-button"  />
      );
    }

// If in the middle of the basket array slide to previous after image is removed
    const removeFromBasket = (currentItem) => {
      return(<Link
        className="top-buttons remove-button"
        to={ './' + prev.jpegItem.file }
        onClick={() => {
          props.toggleIsFetching(true);
          props.removeBasket(currentItem.index)
          props.toggleIsFetching(false);
        }}
      />);
    }

// addButton() - calls the addBasket() Redux action and passes in the current image
  	const addButton = (currentItem) => {
  		return(
  			<button
  				className="add-button top-buttons"
  				onClick={ () => props.addBasket(currentItem.jpegItem) }
  			/>
  		)
  	}

    if (
      props.getBasket.length === 0
      || !props.getBasket.some(item => item.file === currentItem.jpegItem.file) // If the basket is empty or the current item is not in the basket
    ) return addButton(currentItem)                                             // Return addButton() button
    else if (props.selectedPage === 'gallery')                                  // If we are viewing the gallery images
      return removeGallery(currentItem)                                         // Return removeGallery() button
    else if (props.getBasket.length <= 1)                                       // if we are viewing the only item in the basket
      return removeLastInBasket(currentItem)                                    // Return removeLastInBasket() button
    else if (currentItem.index === 0)                                           // if we are viewing the first item in the basket
      return removeBeginningOfBasket(currentItem)                               // Return removeBeginningOfBasket() button
    else return removeFromBasket(currentItem)                                   // otherwise we're in the middle of the basket
  }

// This is a conditional return statement, it will wait for jpegsArray to be
// refreshed before it tries to render anything. Otherwise, if you arrive here
// from a link, jpegsArray will be empty and the refresh method will be
// triggered after the component is rendered causing a crash!
	return( currentJpegItem.jpegItem ?
		<div className="single-wrapper">
				<Link
					to={ '/images/' + currentJpegItem.jpegItem.file }
					target='_blank'
				>
					{ Slider(currentJpegItem.index, jpegsArray, props) }
        </Link>
        <div className="top-buttons-container">
          { exitButton() }
          { addRemoveButtonDispenser(currentJpegItem) }
        </div>
        <div className="next-prev-container">
          { prevButton() }
          { nextButton() }
        </div>

		</div> : <div><h2>Loading Images...</h2></div>
	)
}

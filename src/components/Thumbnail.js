import React from "react";
import { Link } from "react-router-dom";

export const Thumbnail = (props, jpegItem, i) => {

  let fade = 'fade-in';
  if ( jpegItem.toBeRemoved ) fade = 'fade-out';


// addButton() – props.selectedPage is added to the classNames so that CSS can
// target the buttons in basket view separately from buttons in gallery view.
// onClick the button calls the 'ADD_BASKET' action.
	const addButton = (jpegItem) => {
		return(
			<button
				className={"add-basket-thumb thumb-button " + props.selectedPage}
				onClick={ () => props.addBasket(jpegItem) }
			/>
		)
	}

// removeButton() - props.selectedPage is added to the classNames so that CSS
// can target the buttons in basket view separately from buttons in gallery
// view. onClick the button calls the 'REMOVE_BASKET' action.
	const removeButton = (jpegItem) => {
		return(
			<button
				className={"remove-basket-thumb thumb-button " + props.selectedPage}
				onClick={ () => {
					  props.removeBasket( props.getBasket.indexOf(jpegItem) )
        }}
			/>
		)
	}

	const basketButtonDispenser = (jpegItem) => {
		if (props.getBasket.some( item => item.file === jpegItem.file ))      // if the item is in basket
      return removeButton(jpegItem)                                       // return removeButton()
		else return addButton(jpegItem)                                       // otherwise return addButton()
	}

  const styles = () => {
    let size = 'span 2';                                                // assume image is landscape, span 2 grid fractions
    if (jpegItem.res.width < jpegItem.res.height) size = 'span 1';      // unless image is portrait, span 1 grid fraction
    return {
      'gridColumn': size                                                // return css gridColumn statement
    }
  }

// The Thumbnail element
	return (
		<div
      className={'thumbnail ' + fade}
      key={i}
      style={styles()}
    >
      <Link
        className={'thumbnail-inner-container'}
        key={i}
    		to={ './single/' + jpegItem.file }
    	>
        <img
    			alt={"./resources/icons/ajax-loader-white-on-black.gif"}
    			className="images"
    			key={jpegItem.id}
    			src={"./images/resize300/"+ jpegItem.file}
      	/>
      </Link>
      { basketButtonDispenser(jpegItem) }
    </div>
	);
}

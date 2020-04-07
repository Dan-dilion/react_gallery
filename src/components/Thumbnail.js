import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Thumbnail = (props, jpegItem, i) => {

  //const [fade, setFade] = useState('fade-in');
  const fade = 'fade-in';

  // if (
  //   props.selectedPage === 'basket'
  //   && !props.getBasket.some( item => item.file !== jpegItem.file )
  // ) fade = 'fade-out';

// props.selectedPage is added to the classNames so that CSS can target the
// buttons in basket view seperately from buttons in gallery view.
	const addButton = (jpegItem) => {
		return(
			<button
				className={"add-basket-thumb thumb-button " + props.selectedPage}
				onClick={ () => props.addBasket(jpegItem) }
			/>
		)
	}

// props.selectedPage is added to the classNames so that CSS can target the
// buttons in basket view seperately from buttons in gallery view.
	const removeButton = (jpegItem) => {
		return(
			<button
				className={"remove-basket-thumb thumb-button " + props.selectedPage}
				onClick={ () => {
          /*setFade( () => fade = 'fade-out' )*/
          setTimeout( () => {
					  props.removeBasket( props.getBasket.indexOf(jpegItem) )
          }, 500)
        }}
			/>
		)
	}

	const basketButtonPicker = (jpegItem) => {
		if (
      props.getBasket.length > 0                                          // if basket is not empty
      && props.getBasket.some( item => item.file === jpegItem.file )      // and item is in basket
    )
    return removeButton(jpegItem)
		else return addButton(jpegItem)
	}

  const styles = () => {
    let size = 'span 2';                                                // assume image is landscape, span 2 grid fractions
    if (jpegItem.res.width < jpegItem.res.height) size = 'span 1';      // unless image is portrait, span 1 grid fraction
    return {
      'gridColumn': size                                                // return css gridColumn statement
    }
  }

	return (
		<div className={'thumbnail ' + fade} key={i} style={styles()}>
			<div className={'thumbnail-inner-container'} key={i}>
				<Link
					to={ './single/' + jpegItem.file }
				><img
					alt={"./resources/icons/ajax-loader-white-on-black.gif"}
					className="images"
					key={jpegItem.id}
					src={"./images/resize300/"
						+ jpegItem.file
					}
				/></Link>

			</div>
			{ basketButtonPicker(jpegItem) }
		</div>
	);
}

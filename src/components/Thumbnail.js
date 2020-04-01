import React from "react";
import { Link } from "react-router-dom";

export const Thumbnail = (props, jpegItem, i) => {

	const addButton = (jpegItem) => {
		return(
			<button
				className={"add-basket-thumb thumb-button " + props.selectedPage}
				onClick={ () => props.addBasket(jpegItem) }
			/>
		)
	}

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

	const basketButtonPicker = (jpegItem) => {
		if (
      props.getBasket.length > 0                                          // if basket is not empty
      && props.getBasket.some( item => item.file === jpegItem.file )      // and item is in basket
    )
    return removeButton(jpegItem)
		else return addButton(jpegItem)
	}

  const styles = (i) => {

    let size = 'span 2';                                                // assume image is landscape
    if (jpegItem.res.width < jpegItem.res.height) size = 'span 1';      // unless image is portrait

    return {
      'gridColumn': size
    }
  }

	return (
		<div className={'thumbnail fade-in'} key={i} style={styles(i)}>
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

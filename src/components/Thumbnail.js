import React from "react";
import { Link } from "react-router-dom";

export const Thumbnail = (props, jpegItem, i) => {

	const addButton = (jpegItem) => {
		return(
			<button
				className="add-basket-thumb thumb-button"
				onClick={ () => props.addBasket(jpegItem) }
			/>
		)
	}

	const removeButton = (jpegItem) => {
		return(
			<button
				className="remove-basket-thumb thumb-button"
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
    const img = new Image();
    img.src = "./images/resize300/" + jpegItem.file
//    console.log(jpegItem.file + ' - ' + img.width + ' x ' + img.height)

    let size = 'span 2';                            // assume image is landscape
    if (img.width < img.height) size = 'span 1';    // unless image is portrait

    return {
      'gridColumn': size
    }
  }

	return (
		<div className={'thumbnail'} key={i} style={styles(i)}>
			<div className={'thumbnail-inner-container'} key={i}>
				<Link
					to={ './single/' + jpegItem.file }
				><img
					alt={"File not found: " + jpegItem.file}
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

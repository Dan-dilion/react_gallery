import React from "react";

import { Thumbnail } from './Thumbnail.js';
import { resequenceJpegs } from '../utils/sequencer.js'

import '../css/Gallery.css';

export const Gallery = (props) => {

  props.refreshJpegs()                                                    // Fetch the list of jpegs from the server
  let jpegs = resequenceJpegs(props.getJpegs)                             // Sequence the jpegs

// mediaQueryList is a filtered list of all the window media variables. The preceding clause acts as the filter.
  const mediaQueryList = window.matchMedia('(max-width: 800px)')          // This is the condition that will trigger the Media Query Listener
  const mediaQueryAction = (action) => {                                  // This is the action that will be taken
      props.toggleIsFetching(true);                                       // The isFetching flag ensures the page is not rendered until
      jpegs = resequenceJpegs(jpegs);                                     // the array is resequenced
      props.toggleIsFetching(false);
  }
  mediaQueryList.addListener(mediaQueryAction)                            // Attach listener to the mediaQueryList and pass it an action

// imageSuccess() will iterate through each item in the jpegs array and return it in a Thumbnail() component.
	const imageSuccess = (jpegs) => {
		return jpegs.map((item, i) => {
			return( Thumbnail(props, item, i) )
		})
	}

	// The imageFail function will be called in the case that getJpegs() returns
  // anything other than an array. If there was an error on the server when it
  // fetches the image files it will return the error as plain text.
  // imageFail() will display the server error in the page.
	const imageFail = (jpegs) => {
		return(
			<div className="ph_fail_container">
				<div>
					<p>System Message: {jpegs}</p>
				</div>
			</div>
		)
	}

// imageComponent() decides whether to return the imageSuccess() method or the
// imageFail() method depending on the response from the server.
	let imageComponent = (jpegs) => {
		if (Array.isArray(jpegs)) {                 // If jpegs is an array assume the server request was successful
			return imageSuccess(jpegs);               // return imageSuccess()
		}
		else {
			return imageFail(jpegs);                  // otherwise the server request had a problem, return imageFail()
		}
	}

// The main gallery element is a conditional return statement. If the
// isFetching flag is set it will return a "wait" message. Otherwise it will
// return imageComponent()
	return( !props.isFetchingJpegs ?
		<div id="phcontainer">
			{imageComponent(jpegs)}
		</div> :
    <div> <h2>Loading Images...</h2> </div>
	);
}
